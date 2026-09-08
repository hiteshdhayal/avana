import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-m font-sans font-medium " +
  "transition-colors duration-[var(--dur-fast)] ease-out " +
  "disabled:cursor-not-allowed disabled:opacity-55 " +
  "min-h-11"; // 44px minimum target (spec 12.1)

const variants: Record<Variant, string> = {
  // The only amber fill on the page besides available plots (spec 4.2).
  primary: "bg-amber text-amber-ink hover:bg-[#d08f28]",
  secondary:
    "bg-terrace text-mist hover:bg-[#2b4534] data-[scheme=dark]:bg-mist data-[scheme=dark]:text-ink",
  ghost:
    "border border-[var(--rule)] text-[var(--fg-strong)] hover:border-[var(--fg-strong)]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-caption",
  lg: "px-6 py-3.5 text-body",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  ...rest
}: ButtonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
