"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, Search, Check, Paintbrush, ExternalLink, Send, X, Eye, 
  MessageCircle, ArrowRight, Heart 
} from "lucide-react";
import { ALL_DESIGNS, DesignTemplate } from "@/data/designsData";

interface KatsudotoCatalogProps {
  initialCategory?: string;
  showHero?: boolean;
}

const CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "favorite", label: "Populer" },
  { id: "adat", label: "Adat" },
  { id: "floral", label: "Floral" },
  { id: "fairytale", label: "Fairytale" },
  { id: "minimalist", label: "Minimalis" },
  { id: "nature", label: "Nature" },
  { id: "vintage", label: "Vintage" },
];

export default function KatsudotoCatalog({ initialCategory = "all", showHero = true }: KatsudotoCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<DesignTemplate | null>(null);

  // Filter and sort designs
  const filteredDesigns = useMemo(() => {
    let list = [...ALL_DESIGNS];

    // Filter by Category
    if (selectedCategory === "favorite") {
      list = list.filter((d) => d.usedCount > 0).sort((a, b) => b.usedCount - a.usedCount);
    } else if (selectedCategory !== "all") {
      list = list.filter((d) => d.tags.includes(selectedCategory.toLowerCase()));
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) => 
          d.name.toLowerCase().includes(q) || 
          d.tags.some((t) => t.includes(q)) || 
          d.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-[#FAF9F5] text-[#2C2925] font-sans antialiased">
      {/* 1. HERO SECTION (KATSUDOTO STYLE) */}
      {showHero && (
        <section className="relative pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
          {/* Subtle decorative background gradient */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EFECE6] text-[#7A6B58] text-xs font-semibold tracking-wider uppercase mb-6 border border-[#E2DDD3]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Katalog Desain Premium
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2A241E] tracking-tight leading-tight mb-6">
              Wujudkan Desain Undangan Impianmu
            </h1>
            <p className="text-base sm:text-lg text-[#6B5F52] leading-relaxed mb-8 max-w-2xl mx-auto font-light">
              Tentukan tema, warna, ornamen, dan impian lain yang kamu inginkan bersama tim desain yang sudah ahli di bidangnya.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#katalog-desain"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#2A241E] text-white text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Pilih Undanganmu <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/builder"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-[#2A241E] border border-[#DDD6C9] text-sm font-semibold hover:bg-[#F3EFE7] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Paintbrush className="w-4 h-4 text-rose-500" /> Buka Studio Builder
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 2. EXPRESS YOURSELF SECTION */}
      <section className="py-16 bg-[#F3EFE7] border-y border-[#E6E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#9B8973] block mb-2">
            Express Yourself
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2A241E] mb-4">
            Elegan, Fairytale, atau Minimalis? Kamu yang Tentuin!
          </h2>
          <p className="text-sm sm:text-base text-[#6B5F52] max-w-xl mx-auto leading-relaxed">
            Mau ganti warna atau font biar match sama konsep acara? <br className="hidden sm:block" />
            Bisa banget! Semuanya tinggal atur sesuai selera kamu.
          </p>
        </div>
      </section>

      {/* 3. MAIN CATALOG & FILTER PRESETS */}
      <section id="katalog-desain" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2A241E] mb-3">
            Semua Desain Bisa Kamu Gunakan Tanpa Tambahan Biaya!
          </h2>
          <p className="text-xs sm:text-sm text-[#7D7061]">
            Jelajahi puluhan tema eksklusif dengan berbagai pilihan gaya pernikahan.
          </p>
        </div>

        {/* Filter Categories Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-8">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#2A241E] text-white shadow-md"
                    : "bg-white text-[#5E5244] border border-[#DDD6C9] hover:bg-[#F3EFE7] hover:border-[#C7BDAD]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Result Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-3 sm:p-4 rounded-2xl border border-[#E6E0D4] shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari tema (cth: Ningrum, Adat, Bianca)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 rounded-xl bg-[#FAF9F5] border border-[#E2DDD3] text-[#2A241E] focus:outline-none focus:border-[#2A241E]"
            />
          </div>
          <div className="text-xs text-[#7A6D5E] font-medium self-end sm:self-center">
            Menampilkan <span className="font-bold text-[#2A241E]">{filteredDesigns.length}</span> Desain
          </div>
        </div>

        {/* DESIGN CARDS GRID */}
        {filteredDesigns.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E6E0D4]">
            <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#5A5044]">Tidak ada desain yang cocok</p>
            <p className="text-xs text-[#8A7D6F] mt-1">Coba kata kunci pencarian lain atau pilih kategori Semua.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDesigns.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E6E0D4] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with floating Katsudoto badges */}
                <div className="aspect-[3/4] relative bg-[#EDE9E1] overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Top Floating Badge (Ubah warna dan font) */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-[#2A241E] shadow-sm border border-black/5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Ubah warna &amp; font
                    </span>
                  </div>

                  {/* Bottom Overlay Action: Coba Template Ini */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href="/builder"
                      className="w-full py-2.5 rounded-xl bg-white/95 backdrop-blur-md text-[#2A241E] text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-white transition-colors"
                    >
                      <Paintbrush className="w-3.5 h-3.5 text-rose-500" />
                      Coba template ini
                    </Link>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-serif font-bold text-lg text-[#2A241E] tracking-tight capitalize">
                        {template.name}
                      </h3>
                      {template.isNew && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-wider">
                          Baru
                        </span>
                      )}
                    </div>
                    {/* Tags Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {template.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] text-[#8C7E6D] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#ECE6DC] capitalize">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-[#F1ECE3]">
                    <Link
                      href={`/preview/${template.id}`}
                      className="flex-1 py-2.5 rounded-xl bg-[#2A241E] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" /> Lihat Preview
                    </Link>
                    <a
                      href={`https://wa.me/6289607090592?text=Halo%20Admin%20IkutSeneng,%20saya%20tertarik%20dengan%20desain%20tema%20*${encodeURIComponent(template.name)}*.%20Bisa%20dibantu%20prosesnya?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Pesan via WhatsApp"
                      className="p-2.5 rounded-xl border border-[#DDD6C9] text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. KONSULTASI SECTION (KATSUDOTO STYLE) */}
      <section className="py-16 sm:py-20 bg-[#EFECE5] border-t border-[#E2DDD2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2A241E] mb-3">
            Bingung dan ingin ngobrol lebih lanjut?
          </h2>
          <p className="text-sm sm:text-base text-[#6B5F52] mb-8 max-w-xl mx-auto">
            Konsultasi bersama tim kami untuk bantu kamu memilih produk dan desain yang tepat sesuai kebutuhan acaramu.
          </p>
          <a
            href="https://wa.me/6289607090592?text=Halo%20Admin%20IkutSeneng,%20saya%20mau%20konsultasi%20desain%20undangan%20pernikahan%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-bold shadow-lg shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all"
          >
            <MessageCircle className="w-5 h-5" /> Konsultasi Segera (WhatsApp)
          </a>
        </div>
      </section>

      {/* 5. INTERACTIVE LIVE PREVIEW MODAL */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 bg-[#FAF9F5] border-b border-[#EAE5DC] flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2A241E] capitalize">
                  {previewTemplate.name}
                </h3>
                <p className="text-[11px] text-[#8C7E6D]">
                  Kategori {previewTemplate.category} • {previewTemplate.tags.join(", ")}
                </p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Preview Scrollable */}
            <div className="flex-1 overflow-y-auto bg-slate-900 p-2 text-center">
              <img
                src={previewTemplate.fullPreview || previewTemplate.preview}
                alt={previewTemplate.name}
                className="w-full h-auto rounded-xl shadow-lg mx-auto"
              />
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-white border-t border-[#EAE5DC] space-y-2.5">
              <Link
                href="/builder"
                onClick={() => setPreviewTemplate(null)}
                className="w-full py-3 rounded-xl bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-rose-600 transition-colors shadow-sm"
              >
                <Paintbrush className="w-4 h-4" /> Buka &amp; Edit di Studio Builder
              </Link>
              <div className="flex gap-2">
                {previewTemplate.urlPreview && (
                  <a
                    href={previewTemplate.urlPreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl border border-[#DDD6C9] text-[#2A241E] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#F6F3ED] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Buka Live Demo
                  </a>
                )}
                <a
                  href={`https://wa.me/6289607090592?text=Halo%20Admin%20IkutSeneng,%20saya%20tertarik%20pesan%20desain%20*${encodeURIComponent(previewTemplate.name)}*.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-700 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Pesan via WA
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
