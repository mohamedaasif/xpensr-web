"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
}

export function CustomSelect({
  value,
  onValueChange,
  options,
  placeholder,
  disabled = false,
}: CustomSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent position="popper">
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
