import { TEMPLATES_DATA } from "@/data/templates";
import { ALL_DESIGNS } from "@/data/designsData";
import { notFound } from "next/navigation";
import KatsudotoVictoriaTheme from "@/components/themes/KatsudotoVictoriaTheme";
import KatsudotoNingrumTheme from "@/components/themes/KatsudotoNingrumTheme";
import FloralGardenTheme from "@/components/themes/FloralGardenTheme";
import FairytaleTheme from "@/components/themes/FairytaleTheme";
import MinimalistModernTheme from "@/components/themes/MinimalistModernTheme";
import VintageWaxSealTheme from "@/components/themes/VintageWaxSealTheme";
import IslamicLuxuryTheme from "@/components/themes/IslamicLuxuryTheme";

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
    const tags = katsudotoDesign.tags || [];
    const nameLower = katsudotoDesign.name.toLowerCase();

    // Adat / Tradisional
    if (tags.includes("adat") || nameLower.includes("ningrum") || nameLower.includes("chinese") || nameLower.includes("jawa")) {
      return (
        <KatsudotoNingrumTheme 
          data={{
            coverImage: katsudotoDesign.preview,
            groomNickname: "Nicholas",
            brideNickname: katsudotoDesign.name,
            groomName: "Nicholas Saputra Rahardjo",
            brideName: `${katsudotoDesign.name} Kusuma Wardhani`,
            weddingDate: "Sabtu, 24 Oktober 2026",
            akadDate: "Sabtu, 24 Oktober 2026",
            resepsiDate: "Sabtu, 24 Oktober 2026",
          }} 
        />
      );
    }

    // Vintage / Wax Seal / Postal
    if (tags.includes("vintage") || nameLower.includes("roman") || nameLower.includes("classic") || nameLower.includes("nostalgia")) {
      return (
        <VintageWaxSealTheme 
          data={{
            coverImage: katsudotoDesign.preview,
            groomNickname: "Arthur",
            brideNickname: katsudotoDesign.name,
            groomName: "Arthur William Vance",
            brideName: `${katsudotoDesign.name} Eleanor Vance`,
            weddingDate: "Saturday, 14 November 2026",
            akadDate: "Saturday, 14 November 2026",
            resepsiDate: "Saturday, 14 November 2026",
          }}
        />
      );
    }

    // Islamic / Syar'i / Arabesque
    if (nameLower.includes("aulia") || nameLower.includes("alsa") || nameLower.includes("islamic") || nameLower.includes("syar")) {
      return (
        <IslamicLuxuryTheme 
          data={{
            coverImage: katsudotoDesign.preview,
            groomNickname: "Rayhan",
            brideNickname: katsudotoDesign.name,
            groomName: "Muhammad Rayhan Al-Fatih, S.T.",
            brideName: `${katsudotoDesign.name} Azzahra, S.Farm.`,
            weddingDate: "Ahad, 18 Oktober 2026",
            akadDate: "Ahad, 18 Oktober 2026",
            resepsiDate: "Ahad, 18 Oktober 2026",
          }}
        />
      );
    }

    // Fairytale / Royal Stardust
    if (tags.includes("fairytale") || nameLower.includes("charera") || nameLower.includes("cassie") || nameLower.includes("cinderella")) {
      return (
        <FairytaleTheme 
          data={{
            coverImage: katsudotoDesign.preview,
            groomNickname: "Cedric",
            brideNickname: katsudotoDesign.name,
            groomName: "Prince Cedric Alexander",
            brideName: `Princess ${katsudotoDesign.name} Aurelia`,
            weddingDate: "Sunday, 22 November 2026",
            akadDate: "Sunday, 22 November 2026",
            resepsiDate: "Sunday, 22 November 2026",
          }}
        />
      );
    }

    // Minimalist / Modern Editorial
    if (tags.includes("minimalist") || nameLower.includes("bianca") || nameLower.includes("nadia") || nameLower.includes("tia")) {
      return (
        <MinimalistModernTheme 
          data={{
            coverImage: katsudotoDesign.preview,
            groomNickname: "Julian",
            brideNickname: katsudotoDesign.name,
            groomName: "Julian Vance Hartono",
            brideName: `${katsudotoDesign.name} Stone`,
            weddingDate: "Saturday, 5 December 2026",
            akadDate: "Saturday, 5 December 2026",
            resepsiDate: "Saturday, 5 December 2026",
          }}
        />
      );
    }

    // Floral / Pastel Garden
    if (tags.includes("floral") || nameLower.includes("eloise") || nameLower.includes("ivana") || nameLower.includes("silika")) {
      return (
        <FloralGardenTheme 
          data={{
            coverImage: katsudotoDesign.preview,
            groomNickname: "Oliver",
            brideNickname: katsudotoDesign.name,
            groomName: "Oliver James Sterling",
            brideName: `${katsudotoDesign.name} Fleur Fontaine`,
            weddingDate: "Sunday, 8 November 2026",
            akadDate: "Sunday, 8 November 2026",
            resepsiDate: "Sunday, 8 November 2026",
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
  if (template.style === "Fairytale") {
    return <FairytaleTheme data={{ coverImage: template.image }} />;
  }
  if (template.style === "Floral") {
    return <FloralGardenTheme data={{ coverImage: template.image }} />;
  }
  if (template.style === "Minimalist") {
    return <MinimalistModernTheme data={{ coverImage: template.image }} />;
  }
  if (template.style === "Vintage") {
    return <VintageWaxSealTheme data={{ coverImage: template.image }} />;
  }
  if (template.style === "Islamic") {
    return <IslamicLuxuryTheme data={{ coverImage: template.image }} />;
  }

  return <KatsudotoVictoriaTheme data={{ coverImage: template.image }} />;
}
