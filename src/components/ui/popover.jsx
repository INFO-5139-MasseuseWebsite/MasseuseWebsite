import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export function Popover({ children, open, onOpenChange }) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </PopoverPrimitive.Root>
  );
}

export function PopoverTrigger({ children, asChild }) {
  return (
    <PopoverPrimitive.Trigger asChild={asChild}>
      {children}
    </PopoverPrimitive.Trigger>
  );
}

export function PopoverContent({ children, align = "center", className }) {
  return (
    <PopoverPrimitive.Content 
      align={align}
      sideOffset={5}
      className={`z-50 bg-white border border-gray-200 shadow-md rounded-lg p-4 ${className}`}
    >
      {children}
      <PopoverPrimitive.Arrow className="fill-gray-200" />
    </PopoverPrimitive.Content>
  );
}
