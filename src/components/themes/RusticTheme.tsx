"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Clock, Copy, Check, Send, Gift } from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";
import MusicPlayer from "@/components/MusicPlayer";

interface ThemeProps {
  data?: Partial<InvitationData>;
}

export default function RusticTheme({ data = {} }: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const [comments, setComments] = useState<{ name: string; msg: string; status: string; date: string }[]>([
    {
      name: "Budi Santoso",
      msg: "Selamat menempuh hidup baru Romeo & Juliet! Semoga sakinah mawaddah warahmah.",
      status: "Hadir",
      date: "Baru saja"
    },
    {
      name: "Siti Rahma",
      msg: "Barakallah, lancar sampai hari H yaa! Doa terbaik untuk kalian berdua.",
      status: "Hadir",
      date: "1 jam lalu"
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#5A5042] font-serif selection:bg-[#E8DCC4] overflow-x-hidden relative">
      {/* Background Music Player */}
      <MusicPlayer musicUrl={d.musicUrl} musicTitle={d.musicTitle} />

      <main className="relative z-10 max-w-md mx-auto bg-white min-h-screen shadow-2xl shadow-[#E8DCC4]/50 border-x border-[#E8DCC4]/30">
        
        {/* Cover Section */}
        <section className="min-h-[100svh] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full"
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4 text-[#8C7A6B]">The Wedding Of</p>
            <h1 className="text-5xl md:text-6xl mb-6 font-medium text-[#4A4036] leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {d.groomNickname} <br/> <span className="text-3xl text-[#BFA07A] italic">&amp;</span> <br/> {d.brideNickname}
            </h1>
            <p className="text-sm tracking-widest text-[#8C7A6B] mb-10">{d.weddingDate}</p>
            
            <div className="w-52 h-72 mx-auto relative rounded-t-full rounded-b-2xl overflow-hidden border-4 border-[#FDFBF7] shadow-xl">
              <Image 
                src={d.coverImage} 
                alt="Couple Cover"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </section>

        {/* Quotes & Salam */}
        <section className="py-16 px-8 text-center bg-[#FDFBF7] border-y border-[#E8DCC4]/30">
          <Heart className="w-7 h-7 mx-auto text-[#BFA07A] mb-6" />
          <p className="text-sm leading-relaxed mb-6 italic text-[#6B5E4F]">
            "{d.quote}"
          </p>
          <div className="w-12 h-0.5 bg-[#BFA07A] mx-auto mb-8 opacity-60"></div>

          {/* Couple Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-[#4A4036]">{d.groomName}</h3>
              <p className="text-xs text-[#8C7A6B] mt-1">{d.groomParents}</p>
            </div>
            <span className="text-2xl text-[#BFA07A] italic block">&amp;</span>
            <div>
              <h3 className="text-2xl font-bold text-[#4A4036]">{d.brideName}</h3>
              <p className="text-xs text-[#8C7A6B] mt-1">{d.brideParents}</p>
            </div>
          </div>
        </section>

        {/* Info Acara Section */}
        <section className="py-16 px-8 text-center">
          <h2 className="text-xs tracking-[0.3em] uppercase text-[#8C7A6B] mb-8">Rangkaian Acara</h2>
          <div className="space-y-8">
            {/* Akad */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#FDFBF7] p-6 rounded-2xl shadow-sm border border-[#E8DCC4]/40"
            >
              <h3 className="text-2xl mb-3 text-[#4A4036] font-medium">Akad Nikah</h3>
              <div className="flex items-center justify-center gap-2 mb-2 text-sm text-[#8C7A6B]">
                <Calendar className="w-4 h-4 text-[#BFA07A]" /> <span>{d.akadDate}</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4 text-sm text-[#8C7A6B]">
                <Clock className="w-4 h-4 text-[#BFA07A]" /> <span>{d.akadTime}</span>
              </div>
              <p className="font-semibold text-sm text-[#4A4036]">{d.akadLocation}</p>
              <p className="text-xs text-[#8C7A6B] mt-1">{d.akadAddress}</p>
            </motion.div>

            {/* Resepsi */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#FDFBF7] p-6 rounded-2xl shadow-sm border border-[#E8DCC4]/40"
            >
              <h3 className="text-2xl mb-3 text-[#4A4036] font-medium">Resepsi</h3>
              <div className="flex items-center justify-center gap-2 mb-2 text-sm text-[#8C7A6B]">
                <Calendar className="w-4 h-4 text-[#BFA07A]" /> <span>{d.resepsiDate}</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4 text-sm text-[#8C7A6B]">
                <Clock className="w-4 h-4 text-[#BFA07A]" /> <span>{d.resepsiTime}</span>
              </div>
              <p className="font-semibold text-sm text-[#4A4036]">{d.resepsiLocation}</p>
              <p className="text-xs text-[#8C7A6B] mt-1">{d.resepsiAddress}</p>
            </motion.div>
          </div>
          
          <a 
            href={d.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 w-full bg-[#BFA07A] text-white py-3.5 rounded-xl text-sm font-medium tracking-wide hover:bg-[#A98963] transition-colors shadow-md"
          >
            <MapPin className="w-4 h-4" /> Petunjuk Google Maps
          </a>
        </section>

        {/* Galeri Foto Prewedding */}
        {d.galleryImages && d.galleryImages.length > 0 && (
          <section className="py-16 px-8 bg-[#FDFBF7] border-t border-[#E8DCC4]/30">
            <h2 className="text-xs tracking-[0.3em] uppercase text-center text-[#8C7A6B] mb-8">Momen Bahagia</h2>
            <div className="grid grid-cols-2 gap-3">
              {d.galleryImages.map((img, i) => (
                <div key={i} className="aspect-[3/4] relative rounded-xl overflow-hidden shadow-sm border border-white">
                  <Image src={img} alt={`Gallery ${i+1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Amplop Digital (Cashless Gift) */}
        <section className="py-16 px-8 text-center bg-white border-t border-[#E8DCC4]/30">
          <Gift className="w-7 h-7 mx-auto text-[#BFA07A] mb-3" />
          <h2 className="text-xl font-bold text-[#4A4036] mb-2">Amplop Digital</h2>
          <p className="text-xs text-[#8C7A6B] mb-6">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda ingin memberi tanda kasih, dapat melalui:
          </p>
          <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E8DCC4]/40 max-w-xs mx-auto shadow-sm">
            <p className="text-xs font-bold text-[#BFA07A] uppercase tracking-wider mb-1">{d.bankName}</p>
            <p className="text-xl font-mono font-bold text-[#4A4036] tracking-wider mb-1">{d.accountNumber}</p>
            <p className="text-xs text-[#8C7A6B] mb-4">a.n {d.accountHolder}</p>
            <button
              onClick={handleCopyAccount}
              className="inline-flex items-center gap-2 bg-white border border-[#BFA07A] text-[#BFA07A] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#BFA07A] hover:text-white transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Berhasil Disalin!" : "Salin No. Rekening"}
            </button>
          </div>
        </section>

        {/* RSVP & Buku Tamu Interaktif */}
        <section className="py-16 px-8 bg-[#FDFBF7] border-t border-[#E8DCC4]/30">
          <h2 className="text-xl font-bold text-[#4A4036] text-center mb-2">Buku Tamu &amp; Ucapan</h2>
          <p className="text-xs text-center text-[#8C7A6B] mb-6">Tinggalkan doa dan konfirmasi kehadiran Anda</p>

          <form onSubmit={handleAddComment} className="space-y-3 mb-8">
            <input 
              type="text" 
              placeholder="Nama Anda"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-xl border border-[#E8DCC4] bg-white focus:outline-none focus:ring-1 focus:ring-[#BFA07A]"
              required
            />
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-xl border border-[#E8DCC4] bg-white focus:outline-none focus:ring-1 focus:ring-[#BFA07A]"
            >
              <option value="Hadir">Saya akan Hadir</option>
              <option value="Tidak Hadir">Mohon Maaf, Belum Bisa Hadir</option>
              <option value="Ragu-ragu">Masih Ragu-ragu</option>
            </select>
            <textarea 
              rows={3} 
              placeholder="Tuliskan ucapan dan doa restu..."
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-xl border border-[#E8DCC4] bg-white focus:outline-none focus:ring-1 focus:ring-[#BFA07A]"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#BFA07A] text-white py-3 rounded-xl text-xs font-semibold hover:bg-[#A98963] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Kirim Ucapan
            </button>
          </form>

          {/* List Ucapan */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {comments.map((c, i) => (
              <div key={i} className="bg-white p-3.5 rounded-xl border border-[#E8DCC4]/30 shadow-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#4A4036]">{c.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8DCC4]/40 text-[#6B5E4F] font-semibold">{c.status}</span>
                </div>
                <p className="text-xs text-[#5A5042] leading-relaxed">{c.msg}</p>
                <span className="text-[9px] text-[#A59585] block mt-1">{c.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-[#8C7A6B] bg-white border-t border-[#E8DCC4]/30">
          <p>Terima Kasih Atas Doa &amp; Restu Anda</p>
          <p className="text-[10px] opacity-60 mt-1">Created with IkutSeneng</p>
        </footer>

      </main>
    </div>
  );
}
