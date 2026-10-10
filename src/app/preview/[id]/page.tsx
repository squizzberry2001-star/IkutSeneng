import { TEMPLATES_DATA } from "@/data/templates";
import { notFound } from "next/navigation";
import RusticTheme from "@/components/themes/RusticTheme";
import DarkEleganceTheme from "@/components/themes/DarkEleganceTheme";
import MinimalistTheme from "@/components/themes/MinimalistTheme";

export function generateStaticParams() {
  return TEMPLATES_DATA.map((template) => ({
    id: template.id,
  }));
}

export default function PreviewPage({ params }: { params: { id: string } }) {
  const template = TEMPLATES_DATA.find((t) => t.id === params.id);

  if (!template) {
    notFound();
  }

  // Render template based on style
  if (template.style === "Floral" || template.style === "Rustic") {
    return <RusticTheme />;
  }
  
  if (template.style === "Dark Elegance") {
    return <DarkEleganceTheme />;
  }

  // Fallback to minimalist for others
  return <MinimalistTheme />;
}
