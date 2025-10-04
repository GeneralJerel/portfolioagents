import React from "react";
import { Palette, Sparkles, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplatePreviewProps {
  templateId: string;
  color: "blue" | "purple" | "gray";
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateId, color }) => {
  const getIconColor = (color: string) => {
    const iconColorMap = {
      blue: "text-blue-600",
      purple: "text-purple-600",
      gray: "text-gray-600",
    };
    return iconColorMap[color] || iconColorMap.blue;
  };

  const renderPreview = () => {
    switch (templateId) {
      case "modern-minimal":
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-center">
              <Palette className={cn("w-16 h-16 mx-auto mb-2", getIconColor(color))} />
              <div className="space-y-1">
                <div className="h-2 w-24 bg-blue-200 rounded mx-auto"></div>
                <div className="h-1 w-16 bg-blue-150 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        );
      
      case "creative-bold":
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="text-center">
              <Sparkles className={cn("w-16 h-16 mx-auto mb-2", getIconColor(color))} />
              <div className="space-y-1">
                <div className="h-2 w-20 bg-purple-300 rounded mx-auto transform rotate-1"></div>
                <div className="h-1 w-16 bg-purple-200 rounded mx-auto transform -rotate-1"></div>
              </div>
            </div>
          </div>
        );
      
      case "executive-classic":
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
              <Layout className={cn("w-16 h-16 mx-auto mb-2", getIconColor(color))} />
              <div className="space-y-1">
                <div className="h-2 w-28 bg-gray-300 rounded mx-auto"></div>
                <div className="h-1 w-20 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-500">Preview Coming Soon</p>
            </div>
          </div>
        );
    }
  };

  return renderPreview();
};

export default TemplatePreview;
