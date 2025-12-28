// Textarea.tsx
import React from "react";

type TextareaProps = {
  label?: string;
  value: string;
  rows?: number;
  onChange: (value: string) => void;
};

export const Textarea: React.FC<TextareaProps> = ({ label, value, rows = 4, onChange }) => {
  return (
    <div className="mb-4 w-full">
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
      />
    </div>
  );
};