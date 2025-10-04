import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = "primary", 
  size = "md", 
  className, 
  children, 
  disabled,
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: cn(
      "shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
      disabled 
        ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
        : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
    ),
    secondary: cn(
      "border-2",
      disabled
        ? "border-gray-300 text-gray-400 cursor-not-allowed"
        : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-500"
    ),
    ghost: cn(
      disabled
        ? "text-gray-400 cursor-not-allowed"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500"
    ),
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
