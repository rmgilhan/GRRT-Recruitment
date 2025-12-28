// Select.tsx
// src/components/ui/select.tsx
import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children: React.ReactNode;
};

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return <select {...props}>{children}</select>;
};

export default Select;
