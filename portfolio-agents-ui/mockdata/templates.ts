export interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
  color: "blue" | "purple" | "gray";
}

export const templates: Template[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean, professional design focused on content and readability",
    features: ["Clean typography", "Minimal layout", "Professional appearance", "Mobile-first design"],
    color: "blue"
  },
  {
    id: "creative-bold",
    name: "Creative Bold",
    description: "Eye-catching design with vibrant colors and dynamic layouts",
    features: ["Bold visuals", "Creative layouts", "Interactive elements", "Engaging animations"],
    color: "purple"
  },
  {
    id: "executive-classic",
    name: "Executive Classic",
    description: "Traditional, sophisticated design perfect for senior professionals",
    features: ["Classic elegance", "Professional tone", "Structured layout", "Executive appeal"],
    color: "gray"
  }
];
