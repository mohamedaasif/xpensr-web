"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

import { cn } from "@/lib/utils";
import { MinusIcon } from "lucide-react";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName,
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  const isFilled = Boolean(char);

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      data-filled={isFilled}
      className={cn(
        "relative flex w-12 h-[52px] items-center justify-center",
        "border-[0.5px] border-[var(--color-bdr-2)] rounded-[10px]",
        "text-center font-[var(--font-mono)] text-[20px] font-medium text-[var(--color-ink)]",
        "outline-none transition-[border-color,box-shadow,background-color,color] duration-150",

        // Active/focused
        "data-[active=true]:border-[var(--color-ind)]",
        "data-[active=true]:shadow-[0_0_0_3px_var(--color-ind-bg)]",

        // Filled
        "data-[filled=true]:border-[var(--color-ind)]",
        "data-[filled=true]:bg-[var(--color-ind-bg)]",
        "data-[filled=true]:text-[var(--color-ind-text)]",

        className,
      )}
      {...props}
    >
      {char}

      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-px animate-caret-blink bg-[var(--color-ind)] duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="flex items-center [&_svg:not([class*='size-'])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
