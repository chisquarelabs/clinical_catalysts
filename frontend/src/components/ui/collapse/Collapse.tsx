import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import { ChevronDown } from 'lucide-react';

interface CollapseProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Collapse({ title, children, defaultOpen = false }: CollapseProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{title}</span>
        <ChevronDown 
          className={cn(
            "h-5 w-5 text-gray-500 transition-transform",
            isOpen ? "transform rotate-180" : ""
          )} 
        />
      </button>
      <div
        className={cn(
          "transition-all duration-200 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 border-t">{children}</div>
      </div>
    </div>
  );
} 