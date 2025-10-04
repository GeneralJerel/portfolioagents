import React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  children,
  className,
}) => {
  return (
    <div className={cn("bg-white border border-gray-200 rounded-2xl p-8", className)}>
      <h3 className={cn(
        "text-xl font-semibold text-gray-900 mb-6",
        icon && "flex items-center"
      )}>
        {icon && <span className="mr-3">{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
};

export default SectionCard;
