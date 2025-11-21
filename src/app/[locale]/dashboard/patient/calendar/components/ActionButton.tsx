"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

interface ActionButtonProps {
  href: string;
  onClick?: () => void;
  className: string;
  children: React.ReactNode;
  isComingSoon?: boolean;
}

export default function ActionButton({
  href,
  onClick,
  className,
  children,
  isComingSoon = false,
}: ActionButtonProps) {
  const t = useTranslations("dashboard_patient");
  if (isComingSoon) {
    return (
      <button
        onClick={() => {
          alert(
            t("comingSoon", {
              fallback: "This feature will be available soon 🚀",
            })
          );
        }}
        className={className}
      >
        {children}
      </button>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
