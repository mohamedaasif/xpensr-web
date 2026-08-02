import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `
    inline-flex items-center justify-center gap-1
    rounded-[8px]
    border
    px-[6px] py-[3px]
    text-[11px]
    cursor-pointer
    transition-all
    border-[var(--color-bdr)]
    bg-[var(--color-card)]
    text-[var(--color-ink-2)]
  `,
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        destructive: "",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        selected: true,
        className:
          "border-[var(--color-ind)] bg-[var(--color-ind-bg)] text-[var(--color-ind-text)] font-medium",
      },
      {
        variant: "secondary",
        selected: true,
        className:
          "border-[var(--color-pos)] bg-[var(--color-pos-bg)] text-[var(--color-pos-text)] font-medium",
      },
      {
        variant: "destructive",
        selected: true,
        className:
          "border-[var(--color-neg)] bg-[var(--color-neg-bg)] text-[var(--color-neg-text)] font-medium",
      },
    ],
    defaultVariants: {
      variant: "default",
      selected: false,
    },
  },
);

type BadgeProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, selected, ...props }: BadgeProps) {
  return (
    <button
      type="button"
      className={cn(badgeVariants({ variant, selected }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
