"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        `
        peer relative inline-flex
        h-[17px] w-[32px]
        cursor-pointer
        items-center
        rounded-full
        border-0
        bg-[var(--color-bdr-2)]
        transition-colors

        data-[state=checked]:bg-[var(--color-ind)]

        disabled:cursor-not-allowed
        disabled:opacity-50

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-ind)]
        `,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className="
          block
          h-[11px] w-[11px]
          rounded-full
          bg-white
          shadow-sm
          transition-transform
          duration-200

          translate-x-[3px]
          data-[state=checked]:translate-x-[18px]
        "
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
