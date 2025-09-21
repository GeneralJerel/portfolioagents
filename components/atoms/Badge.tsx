import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = "default", 
  className 
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        variant === "default" && "bg-blue-100 text-blue-800",
        variant === "secondary" && "bg-gray-100 text-gray-800",
        variant === "outline" && "border border-gray-300 text-gray-700",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;



