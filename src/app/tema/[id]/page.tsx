import { TEMPLATES_DATA } from "@/data/templates";
import { ArrowLeft, CheckCircle2, Smartphone, CalendarClock, MailOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static params for all templates so Vercel can pre-render them
export function generateStaticParams() {
  return TEMPLATES_DATA.map((template) => ({
    id: template.id,
  }));
}

export default function TemaDetail({ params }: { params: { id: string } }) {
  const template = TEMPLATES_DATA.find((t) => t.id === params.id);

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/#templates" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Katalog
          </Link>
          <div className="font-bold text-lg">IkutSeneng</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col md:flex-row gap-12">
        {/* Left Column: Image Preview */}
        <div className="md:w-1/2">
          <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <Image 
              src={template.image} 
              alt={template.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Column: Template Info */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="inline-block px-3 py-1 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold mb-4 w-max">
            Kategori {template.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{template.name}</h1>
          <p className="text-lg text-slate-600 mb-8">
            Tema {template.style.toLowerCase()} yang elegan, dirancang khusus untuk membagikan momen bahagia Anda dengan penuh kesan. 
            Sudah dilengkapi dengan berbagai fitur interaktif modern.
          </p>

          <div className="text-3xl font-bold text-slate-900 mb-8">
            Rp {template.price.toLocaleString("id-ID")}
          </div>

          <div className="space-y-4 mb-10 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Fitur yang Termasuk:</h3>
            {[
              { icon: MailOpen, text: "Buku Tamu & RSVP Digital" },
              { icon: Smartphone, text: "Amplop Digital (Cashless)" },
              { icon: CalendarClock, text: "Pengingat Jadwal di Kalender" },
              { icon: CheckCircle2, text: "Galeri Foto & Video" },
              { icon: CheckCircle2, text: "Background Musik Pilihan" }
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-600">
                <feature.icon className="w-5 h-5 text-rose-500" />
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md">
              Live Preview
            </button>
            <button className="flex-1 bg-rose-500 text-white py-4 rounded-xl font-bold hover:bg-rose-600 transition-all shadow-md">
              Pesan Tema Ini
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
