import React from "react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
  className?: string;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
  selected = false,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-4 text-left border-2 rounded-lg transition-all duration-200 hover:shadow-sm w-full",
        selected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300",
        className
      )}
    >
      {icon && (
        <div className="flex items-center mb-2">
          {icon}
          <span className="font-medium text-gray-900 ml-2">{title}</span>
        </div>
      )}
      {!icon && (
        <div className="font-medium text-gray-900 mb-1">{title}</div>
      )}
      <div className="text-xs text-gray-500">{description}</div>
    </button>
  );
};

export default OptionCard;
