"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  delay?: number; // optional show delay in ms
}

export function Tooltip({
  children,
  content,
  position = "top",
  className = "",
  delay = 0,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false); // user intent (hover/focus)
  const [isMounted, setIsMounted] = useState(false); // keeps tooltip in DOM for animation
  const [isPositioned, setIsPositioned] = useState(false); // has correct coords been applied
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const showTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  // show/hide handlers with optional delay
  const show = () => {
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (delay > 0) {
      if (showTimeoutRef.current) window.clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = window.setTimeout(() => {
        setIsMounted(true);
        setIsVisible(true);
      }, delay);
    } else {
      setIsMounted(true);
      setIsVisible(true);
    }
  };

  const hide = () => {
    if (showTimeoutRef.current) {
      window.clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    setIsVisible(false);
    // wait for fade-out transition before unmounting
    if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = window.setTimeout(() => {
      setIsMounted(false);
      setIsPositioned(false);
    }, 180);
  };

  // Measure & position using double requestAnimationFrame to ensure the tooltip has been painted
  const measureAndPosition = React.useCallback(() => {
    const triggerEl = triggerRef.current;
    const tooltipEl = tooltipRef.current;
    if (!triggerEl || !tooltipEl) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        const triggerRect = triggerEl.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();

        let top: number, left: number;

        switch (position) {
          case "top":
            top = triggerRect.top - tooltipRect.height - 8;
            left =
              triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
            break;
          case "bottom":
            top = triggerRect.bottom + 8;
            left =
              triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
            break;
          case "left":
            top =
              triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
            left = triggerRect.left - tooltipRect.width - 8;
            break;
          case "right":
            top =
              triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
            left = triggerRect.right + 8;
            break;
          default:
            top = triggerRect.top - tooltipRect.height - 8;
            left =
              triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        }

        const viewport = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
        const margin = 8;

        if (left < margin) left = margin;
        else if (left + tooltipRect.width > viewport.width - margin)
          left = viewport.width - tooltipRect.width - margin;

        if (top < margin) top = margin;
        else if (top + tooltipRect.height > viewport.height - margin)
          top = viewport.height - tooltipRect.height - margin;

        setTooltipStyle({
          position: "fixed",
          top: `${Math.round(top)}px`,
          left: `${Math.round(left)}px`,
          zIndex: "9999",
        });

        setIsPositioned(true);
      });
    });
  }, [position]);

  // When mounted + visible, measure/position immediately
  useLayoutEffect(() => {
    if (isMounted && isVisible) {
      measureAndPosition();
    }
  }, [isMounted, isVisible, position, measureAndPosition]);

  // Reposition on scroll/resize while visible
  useEffect(() => {
    if (!isMounted || !isVisible) return;
    const handle = () => measureAndPosition();
    window.addEventListener("resize", handle);
    window.addEventListener("scroll", handle, true);
    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("scroll", handle, true);
    };
  }, [isMounted, isVisible, position, measureAndPosition]);

  // Cleanup rafs/timeouts on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (showTimeoutRef.current) window.clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onTouchStart={show}
        onTouchEnd={hide}
        className={"inline-block " + className}
        aria-describedby={isMounted ? "tooltip" : undefined}
      >
        {children}
      </div>

      {isMounted &&
        createPortal(
          <div
            ref={tooltipRef}
            id="tooltip"
            role="tooltip"
            aria-hidden={!isVisible}
            // Start with visibility:hidden to avoid flashing at (0,0). After measure sets isPositioned we reveal it.
            style={{
              ...(tooltipStyle || {}),
              // ensure we have default fixed positioning while measuring
              position: tooltipStyle.position ?? "fixed",
              top: tooltipStyle.top ?? "0px",
              left: tooltipStyle.left ?? "0px",
              zIndex: tooltipStyle.zIndex ?? "9999",
              visibility: isPositioned ? "visible" : "hidden",
              opacity: isVisible && isPositioned ? "0.9" : "0",
              transition: "opacity 160ms ease-in-out, visibility 0ms linear",
            }}
            className={`
              relative bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg
              whitespace-nowrap pointer-events-none
              ${getArrowClasses(position)}
            `}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

function getArrowClasses(position: string): string {
  switch (position) {
    case "top":
      return "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-900";
    case "bottom":
      return "after:content-[''] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-b-gray-900";
    case "left":
      return "after:content-[''] after:absolute after:top-1/2 after:left-full after:-translate-y-1/2 after:border-4 after:border-transparent after:border-l-gray-900";
    case "right":
      return "after:content-[''] after:absolute after:top-1/2 after:right-full after:-translate-y-1/2 after:border-4 after:border-transparent after:border-r-gray-900";
    default:
      return "";
  }
}
