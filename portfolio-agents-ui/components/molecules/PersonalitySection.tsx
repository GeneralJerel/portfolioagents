import React from "react";
import SectionCard from "@/components/atoms/SectionCard";
import OptionCard from "@/components/atoms/OptionCard";

interface PersonalitySectionProps {
  title: string;
  icon?: React.ReactNode;
  options: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  selectedValue: string;
  onSelect: (value: string) => void;
  columns?: number;
}

const PersonalitySection: React.FC<PersonalitySectionProps> = ({
  title,
  icon,
  options,
  selectedValue,
  onSelect,
  columns = 3,
}) => {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <SectionCard title={title} icon={icon}>
      <div className={`grid gap-4 ${gridClasses[columns as keyof typeof gridClasses]}`}>
        {options.map((option) => (
          <OptionCard
            key={option.value}
            title={option.label}
            description={option.description}
            selected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
    </SectionCard>
  );
};

export default PersonalitySection;
