import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex flex-1 items-center justify-center gap-[5px] whitespace-nowrap rounded-[8px] font-[var(--font-ui)] font-medium transition-colors outline-none cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-[var(--color-ink-3)] disabled:border disabled:border-[var(--color-bdr)]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-ind)] text-[var(--color-sb-text)] hover:bg-[var(--color-ind-hover)]",

        outline:
          "bg-[var(--color-card)] border border-[var(--color-bdr-2)] text-[var(--color-ink-2)] hover:bg-[var(--color-card-2)]",

        destructive:
          "bg-[var(--color-neg)] text-[var(--color-sb-text)] hover:opacity-90",

        ghost: "bg-transparent hover:bg-[var(--color-card-2)]",

        link: "text-[var(--color-ind)] underline-offset-4 hover:underline",
      },

      size: {
        default: "h-8 px-[13px] py-[6px] text-[13px]",
        sm: "h-7 px-[10px] text-[12px]",
        lg: "h-9 px-4 text-[14px]",
        xs: "h-6 px-2 text-[11px]",
        icon: "size-8",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
        "icon-xs": "size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
