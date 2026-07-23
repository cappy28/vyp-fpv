import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const styles: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-signal text-void hover:shadow-signal border border-signal font-semibold",
  secondary:
    "bg-transparent border border-hairline text-ink hover:border-signal/50 hover:text-signal",
  ghost: "bg-transparent text-ink-muted hover:text-signal",
  danger:
    "bg-transparent border border-red-500/40 text-red-400 hover:bg-red-500/10",
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        "inline-flex items-center justify-center gap-2 px-5 py-3 text-mono-label transition disabled:cursor-not-allowed disabled:opacity-40",
        styles[variant],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

export default Button;
