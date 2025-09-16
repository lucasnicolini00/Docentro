"use client";

import Link from "next/link";

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
  if (isComingSoon) {
    return (
      <button
        onClick={() => {
          alert("Esta funcionalidad estará disponible pronto 🚀");
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
