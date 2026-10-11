"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Palette, Heart, Calendar, Image as ImageIcon, Music, Gift, 
  Send, Eye, RefreshCw, Smartphone, Check, Sparkles, ExternalLink 
} from "lucide-react";
import { TEMPLATES_DATA } from "@/data/templates";
import { ALL_DESIGNS } from "@/data/designsData";
import { InvitationData, DEFAULT_INVITATION_DATA, MUSIC_PRESETS } from "@/types/invitation";
import KatsudotoVictoriaTheme from "@/components/themes/KatsudotoVictoriaTheme";
import KatsudotoNingrumTheme from "@/components/themes/KatsudotoNingrumTheme";
import RusticTheme from "@/components/themes/RusticTheme";
import DarkEleganceTheme from "@/components/themes/DarkEleganceTheme";
import MinimalistTheme from "@/components/themes/MinimalistTheme";

const PRESET_COVERS = [
  { name: "Rustic Floral", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" },
  { name: "Dark Modern", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800" },
  { name: "Classic Rings", url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800" },
  { name: "Traditional Jawi", url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800" },
  { name: "Outdoor Boho", url: "https://images.unsplash.com/photo-1507646870590-b302c38096c4?auto=format&fit=crop&q=80&w=800" },
];

export default function BuilderPage() {
  const [data, setData] = useState<InvitationData>(DEFAULT_INVITATION_DATA);
  const [activeTab, setActiveTab] = useState<"tema" | "mempelai" | "acara" | "media" | "musik" | "fitur">("tema");
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [isSaved, setIsSaved] = useState(false);

  // Load saved draft from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ikutseneng_draft");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved draft", e);
      }
    }
  }, []);

  const handleChange = (field: keyof InvitationData, value: any) => {
    const updated = { ...data, [field]: value };
    setData(updated);
    localStorage.setItem("ikutseneng_draft", JSON.stringify(updated));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset kembali ke data awal? Semua perubahan draf saat ini akan dibatalkan.")) {
      setData(DEFAULT_INVITATION_DATA);
      localStorage.removeItem("ikutseneng_draft");
    }
  };

  // Render template preview based on selected templateId
  const renderPreviewTheme = () => {
    const katsudotoTheme = ALL_DESIGNS.find((t) => t.id === data.templateId);
    if (katsudotoTheme) {
      const isAdat = katsudotoTheme.tags.includes("adat") || katsudotoTheme.name.toLowerCase().includes("ningrum");
      if (isAdat) {
        return <KatsudotoNingrumTheme data={data} />;
      }
      return <KatsudotoVictoriaTheme data={data} />;
    }

    const selected = TEMPLATES_DATA.find((t) => t.id === data.templateId) || TEMPLATES_DATA[0];
    if (selected.style === "Dark Elegance" || selected.style === "Traditional") {
      return <KatsudotoNingrumTheme data={data} />;
    }
    return <KatsudotoVictoriaTheme data={data} />;
  };

  // Generate WA Order text
  const currentTemplate = 
    ALL_DESIGNS.find((t) => t.id === data.templateId) || 
    TEMPLATES_DATA.find((t) => t.id === data.templateId) || 
    { name: "Victoria", category: "Exclusive" };

  const waText = encodeURIComponent(
    `*FORM ORDER UNDANGAN DIGITAL IKUTSENENG*\n\n` +
    `📌 *Pilihan Tema:* ${currentTemplate.name} (${currentTemplate.category})\n` +
    `💑 *Mempelai Pria:* ${data.groomName} (${data.groomNickname})\n` +
    `👰 *Mempelai Wanita:* ${data.brideName} (${data.brideNickname})\n` +
    `🗓 *Tanggal Acara:* ${data.weddingDate}\n` +
    `🕌 *Akad:* ${data.akadDate} (${data.akadTime}) @ ${data.akadLocation}\n` +
    `🎉 *Resepsi:* ${data.resepsiDate} (${data.resepsiTime}) @ ${data.resepsiLocation}\n` +
    `🎵 *Musik Latar:* ${data.musicTitle}\n` +
    `💳 *Amplop Digital:* ${data.bankName} - ${data.accountNumber} (a.n ${data.accountHolder})\n\n` +
    `Mohon diproses untuk pembuatannya ya admin. Terima kasih!`
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Studio Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-base font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" /> Studio Builder Undangan
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">Kustomisasi desain &amp; data pernikahan Anda secara langsung</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isSaved && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
              <Check className="w-3.5 h-3.5" /> Tersimpan Otomatis
            </span>
          )}

          {/* Toggle View on Mobile */}
          <div className="flex lg:hidden bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setMobileView("editor")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                mobileView === "editor" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Form
            </button>
            <button
              onClick={() => setMobileView("preview")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                mobileView === "preview" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3 h-3" /> Preview
            </button>
          </div>

          <button
            onClick={handleReset}
            title="Reset ke Default"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Checkout WA Button */}
          <a
            href={`https://wa.me/6289607090592?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Kirim &amp; Pesan (WA)</span>
          </a>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT COLUMN: EDITOR FORM */}
        <div className={`w-full lg:w-[500px] xl:w-[560px] bg-slate-950 border-r border-slate-800 flex flex-col h-[calc(100vh-64px)] ${
          mobileView === "preview" ? "hidden lg:flex" : "flex"
        }`}>
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 overflow-x-auto p-2 gap-1 bg-slate-900/60 no-scrollbar">
            {[
              { id: "tema", label: "Tema", icon: Palette },
              { id: "mempelai", label: "Mempelai", icon: Heart },
              { id: "acara", label: "Acara", icon: Calendar },
              { id: "media", label: "Foto", icon: ImageIcon },
              { id: "musik", label: "Musik", icon: Music },
              { id: "fitur", label: "Amplop", icon: Gift },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive 
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/40" 
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* TAB 1: PILIH TEMA */}
            {activeTab === "tema" && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-base font-bold text-white">Pilih Template Undangan (61+ Tema)</h2>
                  <p className="text-xs text-slate-400">Pilih salah satu dari puluhan template desain eksklusif bergaya Katsudoto.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
                  {ALL_DESIGNS.map((tmpl) => {
                    const isSelected = data.templateId === tmpl.id;
                    return (
                      <div
                        key={tmpl.id}
                        onClick={() => {
                          handleChange("templateId", tmpl.id);
                          if (tmpl.preview) {
                            handleChange("coverImage", tmpl.preview);
                          }
                        }}
                        className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all group relative ${
                          isSelected ? "border-rose-500 shadow-lg shadow-rose-500/20 ring-2 ring-rose-500/20" : "border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <div className="aspect-[3/4] relative bg-slate-900">
                          <img src={tmpl.preview} alt={tmpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                          {isSelected && (
                            <span className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-full shadow">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          )}
                          <div className="absolute bottom-2 left-2 right-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold capitalize">
                              {tmpl.tags[0] || tmpl.category}
                            </span>
                            <p className="text-xs font-bold text-white mt-1 truncate capitalize">{tmpl.name}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: DATA MEMPELAI */}
            {activeTab === "mempelai" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-base font-bold text-white">Informasi Pasangan Mempelai</h2>
                  <p className="text-xs text-slate-400">Isi nama lengkap, panggilan, dan orang tua kedua mempelai.</p>
                </div>

                {/* Pria */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" /> Mempelai Pria
                  </h3>
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={data.groomName}
                      onChange={(e) => handleChange("groomName", e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-300 block mb-1">Nama Panggilan</label>
                      <input
                        type="text"
                        value={data.groomNickname}
                        onChange={(e) => handleChange("groomNickname", e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-300 block mb-1">Nama Orang Tua</label>
                      <input
                        type="text"
                        value={data.groomParents}
                        onChange={(e) => handleChange("groomParents", e.target.value)}
                        placeholder="Putra dari Bpk... & Ibu..."
                        className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Wanita */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" /> Mempelai Wanita
                  </h3>
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={data.brideName}
                      onChange={(e) => handleChange("brideName", e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-300 block mb-1">Nama Panggilan</label>
                      <input
                        type="text"
                        value={data.brideNickname}
                        onChange={(e) => handleChange("brideNickname", e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-300 block mb-1">Nama Orang Tua</label>
                      <input
                        type="text"
                        value={data.brideParents}
                        onChange={(e) => handleChange("brideParents", e.target.value)}
                        placeholder="Putri dari Bpk... & Ibu..."
                        className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DATA ACARA */}
            {activeTab === "acara" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-base font-bold text-white">Jadwal &amp; Lokasi Acara</h2>
                  <p className="text-xs text-slate-400">Atur tanggal dan rincian acara akad serta resepsi.</p>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-1">Tanggal Acara Utama (Header Cover)</label>
                  <input
                    type="text"
                    value={data.weddingDate}
                    onChange={(e) => handleChange("weddingDate", e.target.value)}
                    placeholder="Contoh: 12 Desember 2026"
                    className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Akad */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">Acara Akad Nikah / Pemberkatan</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-300 block mb-1">Hari &amp; Tanggal</label>
                      <input
                        type="text"
                        value={data.akadDate}
                        onChange={(e) => handleChange("akadDate", e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-300 block mb-1">Waktu</label>
                      <input
                        type="text"
                        value={data.akadTime}
                        onChange={(e) => handleChange("akadTime", e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">Nama Tempat</label>
                    <input
                      type="text"
                      value={data.akadLocation}
                      onChange={(e) => handleChange("akadLocation", e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">Alamat Lengkap</label>
                    <input
                      type="text"
                      value={data.akadAddress}
                      onChange={(e) => handleChange("akadAddress", e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* Resepsi */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">Acara Resepsi</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-medium text-slate-300 block mb-1">Hari &amp; Tanggal</label>
                      <input
                        type="text"
                        value={data.resepsiDate}
                        onChange={(e) => handleChange("resepsiDate", e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-300 block mb-1">Waktu</label>
                      <input
                        type="text"
                        value={data.resepsiTime}
                        onChange={(e) => handleChange("resepsiTime", e.target.value)}
                        className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">Nama Tempat / Gedung</label>
                    <input
                      type="text"
                      value={data.resepsiLocation}
                      onChange={(e) => handleChange("resepsiLocation", e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">Alamat Lengkap</label>
                    <input
                      type="text"
                      value={data.resepsiAddress}
                      onChange={(e) => handleChange("resepsiAddress", e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-1">Tautan Google Maps</label>
                  <input
                    type="url"
                    value={data.mapsUrl}
                    onChange={(e) => handleChange("mapsUrl", e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: MEDIA & FOTO */}
            {activeTab === "media" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-base font-bold text-white">Foto &amp; Galeri</h2>
                  <p className="text-xs text-slate-400">Pilih foto cover dan galeri kenangan Anda.</p>
                </div>

                {/* Cover Preset Quick Selector */}
                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-2">Preset Foto Cover Cepat</label>
                  <div className="grid grid-cols-5 gap-2">
                    {PRESET_COVERS.map((preset, i) => (
                      <div
                        key={i}
                        onClick={() => handleChange("coverImage", preset.url)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                          data.coverImage === preset.url ? "border-rose-500 ring-2 ring-rose-500/30" : "border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-1">URL Foto Cover Kustom</label>
                  <input
                    type="url"
                    value={data.coverImage}
                    onChange={(e) => handleChange("coverImage", e.target.value)}
                    placeholder="https://..."
                    className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Gunakan link langsung ke foto (Unsplash, Google Drive publik, dll).</p>
                </div>

                {/* Galeri Images */}
                <div className="space-y-3 pt-2">
                  <label className="text-[11px] font-medium text-slate-300 block">URL Foto Galeri (Prewedding)</label>
                  {data.galleryImages.map((img, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="url"
                        value={img}
                        onChange={(e) => {
                          const updated = [...data.galleryImages];
                          updated[index] = e.target.value;
                          handleChange("galleryImages", updated);
                        }}
                        className="flex-1 text-xs px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: MUSIK LATAR */}
            {activeTab === "musik" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-base font-bold text-white">Musik Latar (Background Music)</h2>
                  <p className="text-xs text-slate-400">Pilih alunan lagu romantis yang otomatis berputar saat undangan dibuka.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-medium text-slate-300 block">Pilihan Koleksi Musik Wedding</label>
                  {MUSIC_PRESETS.map((m, idx) => {
                    const isSelected = data.musicUrl === m.url;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          handleChange("musicUrl", m.url);
                          handleChange("musicTitle", m.title);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected 
                            ? "bg-rose-500/10 border-rose-500 text-white shadow-sm" 
                            : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? "bg-rose-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                            <Music className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{m.title}</p>
                            <p className="text-[10px] text-slate-500">Audio Instrument</p>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-rose-500" />}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <label className="text-[11px] font-medium text-slate-300 block mb-1">Judul Musik Tampil</label>
                  <input
                    type="text"
                    value={data.musicTitle}
                    onChange={(e) => handleChange("musicTitle", e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-1">URL Audio Kustom (.mp3)</label>
                  <input
                    type="url"
                    value={data.musicUrl}
                    onChange={(e) => handleChange("musicUrl", e.target.value)}
                    placeholder="https://domain.com/lagu.mp3"
                    className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 6: FITUR TAMBAHAN (AMPLOP & QUOTES) */}
            {activeTab === "fitur" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-base font-bold text-white">Amplop Digital &amp; Kutipan</h2>
                  <p className="text-xs text-slate-400">Atur nomor rekening untuk kado cashless dan kutipan doa.</p>
                </div>

                {/* Amplop Digital */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5" /> Rekening Hadiah (Cashless)
                  </h3>
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">Nama Bank / E-Wallet</label>
                    <input
                      type="text"
                      value={data.bankName}
                      onChange={(e) => handleChange("bankName", e.target.value)}
                      placeholder="BCA, Mandiri, BRI, GoPay, Dana"
                      className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">Nomor Rekening / No. HP</label>
                    <input
                      type="text"
                      value={data.accountNumber}
                      onChange={(e) => handleChange("accountNumber", e.target.value)}
                      placeholder="1234567890"
                      className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-300 block mb-1">Atas Nama Pemilik</label>
                    <input
                      type="text"
                      value={data.accountHolder}
                      onChange={(e) => handleChange("accountHolder", e.target.value)}
                      placeholder="Nama Lengkap Pemilik"
                      className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* Quotes */}
                <div>
                  <label className="text-[11px] font-medium text-slate-300 block mb-1">Kutipan / Ayat Suci</label>
                  <textarea
                    rows={4}
                    value={data.quote}
                    onChange={(e) => handleChange("quote", e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT COLUMN: LIVE REAL-TIME PREVIEW */}
        <div className={`flex-1 bg-slate-900/50 flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden ${
          mobileView === "editor" ? "hidden lg:flex" : "flex"
        }`}>
          {/* Header indicator */}
          <div className="mb-3 flex items-center justify-between w-full max-w-[420px] px-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-slate-300">
              <Smartphone className="w-3.5 h-3.5 text-rose-500" /> Live Mobile View
            </span>
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded-md font-mono text-slate-300">
              {currentTemplate.name}
            </span>
          </div>

          {/* Smartphone Frame Mockup */}
          <div className="w-full max-w-[420px] h-[calc(100vh-140px)] bg-black rounded-[40px] p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-slate-800 relative flex flex-col overflow-hidden">
            {/* Speaker / Dynamic Island notch */}
            <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-950/80 mr-2"></div>
              <div className="w-8 h-1 rounded-full bg-slate-900"></div>
            </div>

            {/* Live Render Content Scrollable */}
            <div className="flex-1 rounded-[28px] overflow-y-auto overflow-x-hidden bg-white text-slate-900 shadow-inner no-scrollbar">
              {renderPreviewTheme()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
