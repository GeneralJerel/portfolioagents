import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("font-bold text-xl", className)}>
      <span className="text-gray-900">portfolio</span>
      <span className="text-blue-600">agent</span>
      <span className="text-gray-500">.io</span>
    </div>
  );
};

export default Logo;