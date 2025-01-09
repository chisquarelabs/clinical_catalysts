import React, { useRef, useEffect } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(newValue)) {
      return;
    }

    if (newValue.length > 1) return;

    const newOTP = value.split('');
    newOTP[index] = newValue;
    onChange(newOTP.join(''));

    // Move to next input if value is entered
    if (newValue && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    
    // Only allow numbers in pasted content
    if (!/^\d*$/.test(pastedData)) {
      return;
    }
    
    const validData = pastedData.slice(0, length);
    onChange(validData);
  };

  return (
    <div className="flex gap-2 justify-center" role="group" aria-labelledby="otp-input-label">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={el => inputRefs.current[i] = el}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleKeyDown(e, i)}
          onPaste={handlePaste}
          aria-label={`Digit ${i + 1}`}
          title={`Digit ${i + 1}`}
          className="w-12 h-12 text-center border-2 rounded-lg text-lg font-semibold focus:border-blue-500 focus:ring-blue-500"
        />
      ))}
    </div>
  );
} 