import React from 'react';
import { cn } from "../../../../lib/utils";

interface RequiredBadgeProps {
  className?: string;
}

export function RequiredBadge({ className }: RequiredBadgeProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center justify-center w-1.5 h-1.5",
        "rounded-full bg-red-500",
        className
      )} 
      aria-label="Required field"
    />
  );
} 