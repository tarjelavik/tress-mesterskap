"use client";

import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const ActiveLink = ({
  href,
  target,
  children,
  className,
  ...props
}: {
  href: string;
  target?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const currentRoute = usePathname();
  return (
    <Link href={href}
      target={target}
      className={cx(currentRoute === href
        ? ""
        : "text-muted-foreground", className)}>
      {children}
    </Link>
  )
}
