import { TEMPLATES_DATA } from "@/data/templates";
import { ALL_DESIGNS } from "@/data/designsData";
import { notFound } from "next/navigation";
import KatsudotoVictoriaTheme from "@/components/themes/KatsudotoVictoriaTheme";
import KatsudotoNingrumTheme from "@/components/themes/KatsudotoNingrumTheme";

export function generateStaticParams() {
  const localParams = TEMPLATES_DATA.map((template) => ({
    id: template.id,
  }));
  const katsudotoParams = ALL_DESIGNS.map((d) => ({
    id: d.id,
  }));
  return [...localParams, ...katsudotoParams];
}

export default async function PreviewPage({ 
  params,
}: { 
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Check in ALL_DESIGNS (Katsudoto dataset)
  const katsudotoDesign = ALL_DESIGNS.find((t) => t.id === id || t.slug === id);
  if (katsudotoDesign) {
    const isAdatOrVintage = katsudotoDesign.tags.includes("adat") || katsudotoDesign.name.toLowerCase().includes("ningrum");
    if (isAdatOrVintage) {
      return (
        <KatsudotoNingrumTheme 
          data={{
            coverImage: katsudotoDesign.preview,
            groomNickname: "Nicholas",
            brideNickname: "Ningrum",
            groomName: "Nicholas Saputra Rahardjo",
            brideName: "Ningrum Kusuma Wardhani",
            weddingDate: "Sabtu, 24 Oktober 2026",
            akadDate: "Sabtu, 24 Oktober 2026",
            resepsiDate: "Sabtu, 24 Oktober 2026",
          }} 
        />
      );
    }

    // Default to Victoria Editorial Katsudoto style
    return (
      <KatsudotoVictoriaTheme 
        data={{
          coverImage: katsudotoDesign.preview,
          groomNickname: "Theodore",
          brideNickname: katsudotoDesign.name,
          groomName: "Theodore James Hartwell",
          brideName: `${katsudotoDesign.name} Rose Sinclair`,
          weddingDate: "Saturday, 10 October 2026",
          akadDate: "Saturday, 10 October 2026",
          resepsiDate: "Saturday, 10 October 2026",
        }} 
      />
    );
  }

  // 2. Check in legacy TEMPLATES_DATA
  const template = TEMPLATES_DATA.find((t) => t.id === id);
  if (!template) {
    notFound();
  }

  if (template.style === "Dark Elegance" || template.style === "Traditional") {
    return <KatsudotoNingrumTheme data={{ coverImage: template.image }} />;
  }

  return <KatsudotoVictoriaTheme data={{ coverImage: template.image }} />;
}
