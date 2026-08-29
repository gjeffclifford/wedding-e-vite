import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-6 py-2.5 text-sm tracking-[0.16em] uppercase transition-opacity disabled:cursor-not-allowed disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-gold text-ivory hover:opacity-90"
      : "border border-gold/40 bg-transparent text-ink hover:bg-mist/60";
  return <button type={type} className={`${base} ${styles} ${className}`} {...props} />;
}
