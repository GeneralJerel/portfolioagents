import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  features: string[];
  color: "blue" | "purple" | "gray";
  selected?: boolean;
  onSelect: (id: string) => void;
  previewContent?: React.ReactNode;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  description,
  features,
  color,
  selected = false,
  onSelect,
  previewContent,
}) => {
  const getColorClasses = (color: string, selected: boolean) => {
    const colorMap = {
      blue: selected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300",
      purple: selected ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-300",
      gray: selected ? "border-gray-500 bg-gray-50" : "border-gray-200 hover:border-gray-300",
    };
    return colorMap[color] || colorMap.blue;
  };

  const getFeatureDotColor = (color: string) => {
    const dotColorMap = {
      blue: "bg-blue-500",
      purple: "bg-purple-500", 
      gray: "bg-gray-500",
    };
    return dotColorMap[color] || dotColorMap.blue;
  };

  return (
    <div
      className={cn(
        "relative border-2 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg",
        getColorClasses(color, selected)
      )}
      onClick={() => onSelect(id)}
    >
      {/* Selection Indicator */}
      {selected && (
        <div className="absolute top-4 right-4 z-10 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Template Preview */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        {previewContent || (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500">Preview Coming Soon</p>
            </div>
          </div>
        )}
      </div>

      {/* Template Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {name}
        </h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        
        {/* Features */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Key Features:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <div className={cn("w-1.5 h-1.5 rounded-full mr-2", getFeatureDotColor(color))}></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
