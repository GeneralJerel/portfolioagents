import React from "react";
import { User, UserCheck } from "lucide-react";
import SectionCard from "@/components/atoms/SectionCard";
import OptionCard from "@/components/atoms/OptionCard";

interface ActAsSectionProps {
  selectedValue: string;
  onSelect: (value: string) => void;
}

const ActAsSection: React.FC<ActAsSectionProps> = ({
  selectedValue,
  onSelect,
}) => {
  const options = [
    {
      value: "me",
      label: "Me",
      description: "The agent speaks as if it's you, using first person and representing your voice directly.",
      icon: <UserCheck className="w-5 h-5 text-blue-600" />,
    },
    {
      value: "assistant",
      label: "My Assistant",
      description: "The agent speaks about you in third person, acting as your knowledgeable assistant.",
      icon: <User className="w-5 h-5 text-blue-600" />,
    },
  ];

  return (
    <SectionCard title="Act as:" icon={<User className="w-6 h-6 text-blue-600" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <OptionCard
            key={option.value}
            title={option.label}
            description={option.description}
            icon={option.icon}
            selected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
            className="p-6"
          />
        ))}
      </div>
    </SectionCard>
  );
};

export default ActAsSection;
