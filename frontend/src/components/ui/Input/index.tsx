import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  errorMessage?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ errorMessage, label, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`
          px-3 py-2 rounded-lg border 
          focus:outline-none focus:ring-2 focus:ring-primary/50
          ${errorMessage ? 'border-red-500' : 'border-gray-300'}
        `}
        {...props}
      />
      {errorMessage && (
        <span className="text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input; 