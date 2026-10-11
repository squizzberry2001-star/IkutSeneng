"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, CalendarClock, Copy, Check, Send, Gift } from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";
import MusicPlayer from "@/components/MusicPlayer";

interface ThemeProps {
  data?: Partial<InvitationData>;
}

export default function DarkEleganceTheme({ data = {} }: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const [comments, setComments] = useState<{ name: string; msg: string; status: string; date: string }[]>([
    {
      name: "Pratama Yudha",
      msg: "Happy wedding! Semoga menjadi keluarga yang selalu dipenuhi berkah dan kebahagiaan.",
      status: "Hadir",
      date: "Baru saja"
    }
  ]);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(d.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;
    setComments([
      { name: guestName, msg: guestMessage, status: attendance, date: "Baru saja" },
      ...comments
    ]);
    setGuestMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-sans overflow-x-hidden relative">
      {/* Background Music Player */}
      <MusicPlayer musicUrl={d.musicUrl} musicTitle={d.musicTitle} />

      <main className="max-w-md mx-auto bg-[#111111] min-h-screen relative shadow-2xl border-x border-[#333]">
        
        {/* Cover Section */}
        <section className="min-h-[100svh] flex flex-col items-center justify-center p-8 text-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a2118] via-[#111111] to-[#111111] opacity-60"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 w-full"
          >
            <Sparkles className="w-6 h-6 mx-auto text-[#D4AF37] mb-6 animate-pulse" />
            <p className="text-xs tracking-[0.4em] uppercase mb-6 text-[#A0A0A0]">We Invite You To Celebrate</p>
            
            <h1 className="text-5xl mb-4 font-bold text-[#D4AF37] tracking-tight">
              {d.groomNickname} <span className="italic font-serif font-normal text-white">&amp;</span> {d.brideNickname}
            </h1>
            
            <div className="w-full h-80 mx-auto relative my-8 rounded-sm overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
              <Image 
                src={d.coverImage} 
                alt="Couple"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>
            </div>

            <h2 className="text-xl font-semibold tracking-widest text-white mb-2 uppercase">
              {d.groomNickname} &amp; {d.brideNickname}
            </h2>
            <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase">{d.weddingDate}</p>
          </motion.div>
        </section>

        {/* Quotes Section */}
        <section className="py-14 px-8 bg-[#141414] text-center border-y border-[#262626]">
          <p className="text-xs leading-relaxed italic text-[#B0B0B0] max-w-xs mx-auto">
            "{d.quote}"
          </p>
          <div className="w-10 h-[1px] bg-[#D4AF37] mx-auto my-6 opacity-60"></div>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-bold text-[#D4AF37] font-serif">{d.groomName}</p>
              <p className="text-[11px] text-[#888]">{d.groomParents}</p>
            </div>
            <p className="text-[#D4AF37] text-sm">&amp;</p>
            <div>
              <p className="text-lg font-bold text-[#D4AF37] font-serif">{d.brideName}</p>
              <p className="text-[11px] text-[#888]">{d.brideParents}</p>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16 px-8 bg-[#0F0F0F] relative">
          <div className="text-center">
            <h3 className="text-[#D4AF37] text-xs tracking-widest uppercase mb-10">Rangkaian Acara</h3>
            
            <div className="space-y-8">
              {/* Akad / Pemberkatan */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="border border-[#262626] bg-[#141414] p-6 rounded-xl relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors"
              >
                <h4 className="text-lg text-white mb-2 font-serif italic">Akad Nikah</h4>
                <p className="text-[#D4AF37] text-xs font-semibold mb-1">{d.akadDate}</p>
                <p className="text-[#D4AF37] text-xs mb-3">{d.akadTime}</p>
                <p className="text-xs font-medium text-white mb-1">{d.akadLocation}</p>
                <p className="text-[11px] text-[#888] leading-relaxed">{d.akadAddress}</p>
              </motion.div>

              {/* Resepsi */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="border border-[#262626] bg-[#141414] p-6 rounded-xl relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors"
              >
                <h4 className="text-lg text-white mb-2 font-serif italic">Resepsi Pernikahan</h4>
                <p className="text-[#D4AF37] text-xs font-semibold mb-1">{d.resepsiDate}</p>
                <p className="text-[#D4AF37] text-xs mb-3">{d.resepsiTime}</p>
                <p className="text-xs font-medium text-white mb-1">{d.resepsiLocation}</p>
                <p className="text-[11px] text-[#888] leading-relaxed">{d.resepsiAddress}</p>
              </motion.div>
            </div>

            <div className="mt-8">
              <a 
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-transparent border border-[#D4AF37] text-[#D4AF37] py-3.5 rounded-lg font-medium tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-2 uppercase"
              >
                <MapPin className="w-4 h-4" /> Buka Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Galeri Prewedding */}
        {d.galleryImages && d.galleryImages.length > 0 && (
          <section className="py-16 px-8 bg-[#111111] border-t border-[#262626]">
            <h3 className="text-[#D4AF37] text-xs tracking-widest uppercase text-center mb-8">Galeri Foto</h3>
            <div className="grid grid-cols-2 gap-3">
              {d.galleryImages.map((img, i) => (
                <div key={i} className="aspect-[3/4] relative rounded-lg overflow-hidden border border-[#333]">
                  <Image src={img} alt={`Gallery ${i+1}`} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Amplop Digital */}
        <section className="py-16 px-8 bg-[#141414] border-t border-[#262626] text-center">
          <Gift className="w-6 h-6 mx-auto text-[#D4AF37] mb-3" />
          <h3 className="text-lg font-serif italic text-white mb-2">Tanda Kasih (Amplop Digital)</h3>
          <p className="text-[11px] text-[#888] mb-6">
            Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital:
          </p>
          <div className="p-5 rounded-xl border border-[#D4AF37]/40 bg-[#0A0A0A] max-w-xs mx-auto">
            <p className="text-xs font-bold text-[#D4AF37] tracking-wider mb-1">{d.bankName}</p>
            <p className="text-xl font-mono text-white tracking-widest mb-1">{d.accountNumber}</p>
            <p className="text-xs text-[#888] mb-4">a.n {d.accountHolder}</p>
            <button
              onClick={handleCopyAccount}
              className="inline-flex items-center gap-2 bg-transparent border border-[#D4AF37] text-[#D4AF37] px-4 py-2 rounded text-xs font-semibold hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Berhasil Disalin!" : "Salin Rekening"}
            </button>
          </div>
        </section>

        {/* RSVP & Buku Tamu */}
        <section className="py-16 px-8 bg-[#0F0F0F] border-t border-[#262626]">
          <h3 className="text-[#D4AF37] text-xs tracking-widest uppercase text-center mb-2">Buku Tamu &amp; RSVP</h3>
          <p className="text-[11px] text-center text-[#888] mb-6">Konfirmasi kehadiran &amp; ucapan selamat</p>

          <form onSubmit={handleAddComment} className="space-y-3 mb-8">
            <input 
              type="text" 
              placeholder="Nama Anda"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-lg border border-[#333] bg-[#141414] text-white focus:outline-none focus:border-[#D4AF37]"
              required
            />
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-lg border border-[#333] bg-[#141414] text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Hadir">Saya akan Hadir</option>
              <option value="Tidak Hadir">Belum Bisa Hadir</option>
              <option value="Ragu-ragu">Ragu-ragu</option>
            </select>
            <textarea 
              rows={3} 
              placeholder="Tulis ucapan dan doa..."
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-lg border border-[#333] bg-[#141414] text-white focus:outline-none focus:border-[#D4AF37]"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-black py-3 rounded-lg text-xs font-bold tracking-wider hover:bg-[#C39F2B] transition-all flex items-center justify-center gap-2 uppercase"
            >
              <Send className="w-3.5 h-3.5" /> Kirim Ucapan
            </button>
          </form>

          {/* List Ucapan */}
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {comments.map((c, i) => (
              <div key={i} className="bg-[#141414] p-3 rounded-lg border border-[#222]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#D4AF37]">{c.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-black text-[#A0A0A0] border border-[#333]">{c.status}</span>
                </div>
                <p className="text-xs text-[#C0C0C0] leading-relaxed">{c.msg}</p>
                <span className="text-[9px] text-[#666] block mt-1">{c.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-[10px] text-[#666] bg-[#0A0A0A] border-t border-[#222]">
          <p className="tracking-widest uppercase">Thank You</p>
          <p className="opacity-50 mt-1">IkutSeneng Digital Wedding</p>
        </footer>

      </main>
    </div>
  );
}
