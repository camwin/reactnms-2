import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 min-h-11 px-3",
  {
    variants: {
      tone: {
        solid: "bg-accent text-accent-ink hover:bg-accent/90",
        ghost: "bg-transparent text-fg hover:bg-raised",
        line: "border border-line bg-surface text-fg hover:bg-raised",
      },
    },
    defaultVariants: { tone: "line" },
  },
);

export function Button({
  className,
  tone,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>) {
  return <button type={type} className={cn(button({ tone }), className)} {...props} />;
}
