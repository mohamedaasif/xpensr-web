"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isValid, parse } from "date-fns";

interface DatePickerInputProps {
  id: string;
  label?: string;
  value?: Date;
  onChange: (type: string, date?: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  maxDate?: Date;
  error: string;
}

function formatDate(date?: Date) {
  return date ? format(date, "MM/dd/yyyy") : "";
}

function parseInputDate(value: string): Date | undefined {
  if (!value.trim()) return undefined;

  const normalized = value.trim().replace(/[-.\s]+/g, "/");

  const parsed = parse(normalized, "MM/dd/yyyy", new Date());

  return isValid(parsed) ? parsed : undefined;
}

export function DatePickerInput({
  id,
  label,
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  required = false,
  maxDate = new Date(),
  error,
}: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);
  const [inputValue, setInputValue] = React.useState(formatDate(value));

  React.useEffect(() => {
    setInputValue(formatDate(value));
    setMonth(value);
  }, [value]);

  return (
    <Field>
      {label && (
        <FieldLabel htmlFor={id} className="form-label">
          {label}
        </FieldLabel>
      )}

      <InputGroup className="form-input">
        <InputGroupInput
          id={id}
          disabled={disabled}
          value={inputValue}
          placeholder="MM/DD/YYYY"
          className="px-0 !text-[13px]"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={() => {
            if (!inputValue.trim()) {
              setInputValue("");
              onChange(id, undefined);
              return;
            }

            const parsed = parseInputDate(inputValue);

            if (parsed) {
              onChange(id, parsed);
              setMonth(parsed);
              setInputValue(formatDate(parsed));
            } else {
              // Restore previous valid value
              setInputValue(formatDate(value));
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }

            if (e.key === "Enter") {
              e.preventDefault();

              const parsed = parseInputDate(inputValue);

              if (parsed) {
                onChange(id, parsed);
                setMonth(parsed);
                setInputValue(formatDate(parsed));
              } else {
                setInputValue(formatDate(value));
              }
            }
          }}
        />

        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <CalendarIcon />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              onCloseAutoFocus={(e) => e.preventDefault()}
            >
              <Calendar
                mode="single"
                selected={value}
                month={month}
                onMonthChange={setMonth}
                // !TODO : Fix month and year dropdown
                // captionLayout="dropdown"
                // startMonth={new Date(1900, 0)}
                // endMonth={new Date()}
                onSelect={(date) => {
                  onChange(id, date);
                  setMonth(date);
                  setInputValue(formatDate(date));
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
      {error && (
        <FieldDescription className="form-error">{error}</FieldDescription>
      )}
    </Field>
  );
}
