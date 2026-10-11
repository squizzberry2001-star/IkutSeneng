"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Volume2, VolumeX, MailOpen, CalendarPlus, Sparkles 
} from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";

interface ThemeProps {
  data?: Partial<InvitationData>;
  guestName?: string;
}

export default function KatsudotoNingrumTheme({ 
  data = {}, 
  guestName = "Tamu Undangan" 
}: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(guestName);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const to = sp.get("to");
      if (to) setCurrentGuest(to);
    }
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 64,
    hours: 8,
    minutes: 19,
    seconds: 30
  });

  const [copied, setCopied] = useState(false);
  const [wishes, setWishes] = useState([
    {
      name: "Keluarga Besar Bpk. Rahardjo",
      status: "Hadir",
      message: "Ndherek bingah lan memuji marang Gusti, mugi-mugi tansah pinaringan berkah lan langgeng sakinah mawaddah warahmah.",
      time: "1 jam lalu"
    },
    {
      name: "Dewi Lestari",
      status: "Hadir",
      message: "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khoir. Selamat yaa!",
      time: "3 jam lalu"
    }
  ]);
  const [inputName, setInputName] = useState("");
  const [inputStatus, setInputStatus] = useState("Hadir");
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(d.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !inputMessage.trim()) return;
    setWishes([
      { name: inputName, status: inputStatus, message: inputMessage, time: "Baru saja" },
      ...wishes
    ]);
    setInputMessage("");
  };

  return (
    <div className="min-h-screen bg-[#1F1914] text-[#E8DCC4] font-serif overflow-x-hidden relative selection:bg-[#D4AF37]/30">
      <audio ref={audioRef} loop src={d.musicUrl} preload="auto" />

      {isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-2xl bg-[#D4AF37] text-black border border-white/20"
          title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5 text-black" /> : <VolumeX className="w-5 h-5" />}
        </button>
      )}

      {/* 1. ENVELOPE OPENING COVER */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-[#16120E] flex flex-col items-center justify-between p-6 sm:p-10 text-center"
          >
            <div className="pt-8">
              <Sparkles className="w-6 h-6 mx-auto text-[#D4AF37] mb-2" />
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-sans font-bold">
                Pawiwahan Agung
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#F5EADB] tracking-wide mt-2">
                {d.groomNickname} &amp; {d.brideNickname}
              </h1>
              <p className="text-xs text-[#BFA07A] font-sans tracking-widest mt-2">{d.weddingDate}</p>
            </div>

            <div className="my-6">
              <div className="w-56 h-72 relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-2xl shadow-black/80">
                <Image src={d.coverImage} alt="Couple" fill className="object-cover sepia-[0.2]" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>

            <div className="w-full max-w-xs pb-4">
              <div className="bg-[#241D17]/90 p-4 rounded-2xl border border-[#D4AF37]/30 mb-4 shadow-md font-sans">
                <p className="text-[10px] text-[#A69382] uppercase tracking-wider mb-1">Katur Dhumateng:</p>
                <p className="text-base font-serif font-bold text-[#F5EADB]">{currentGuest}</p>
              </div>

              <button
                onClick={handleOpenInvitation}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38C26] text-black font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                <MailOpen className="w-4 h-4" /> Buka Undangan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN BODY */}
      <main className="max-w-md mx-auto bg-[#1A140F] min-h-screen shadow-2xl border-x border-[#33261C] relative">
        
        {/* Cover */}
        <section className="py-20 px-8 text-center bg-gradient-to-b from-[#130F0C] to-[#1A140F] relative">
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mb-6 opacity-60" />
          <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#D4AF37] mb-3">The Wedding of</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F5EADB] leading-tight mb-2">
            {d.groomNickname} <br />
            <span className="italic font-light text-2xl text-[#D4AF37]">&amp;</span> <br />
            {d.brideNickname}
          </h1>
          <p className="text-xs font-sans text-[#A69382] tracking-widest">{d.weddingDate}</p>

          <div className="w-52 h-72 mx-auto relative rounded-2xl overflow-hidden my-8 border-2 border-[#D4AF37]/40 shadow-2xl">
            <Image src={d.coverImage} alt="Cover" fill className="object-cover" />
          </div>
        </section>

        {/* Ayat Suci */}
        <section className="py-16 px-8 text-center bg-[#15100C] border-y border-[#291F17]">
          <p className="text-xs italic text-[#D4C8B8] leading-relaxed max-w-xs mx-auto mb-4">
            "{d.quote}"
          </p>
          <span className="text-[10px] font-sans tracking-widest uppercase text-[#D4AF37]">QS. Ar-Rum: 21</span>
        </section>

        {/* Countdown */}
        <section className="py-16 px-6 text-center bg-[#1A140F]">
          <div className="bg-[#241D17] rounded-3xl p-6 border border-[#D4AF37]/30 shadow-lg">
            <h2 className="text-2xl font-bold text-[#F5EADB] mb-1">Save The Date</h2>
            <p className="text-xs text-[#D4AF37] font-sans mb-6">{d.weddingDate}</p>

            <div className="grid grid-cols-4 gap-2 mb-6 font-sans">
              {[
                { label: "Hari", val: timeLeft.days },
                { label: "Jam", val: timeLeft.hours },
                { label: "Menit", val: timeLeft.minutes },
                { label: "Detik", val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#18130F] p-3 rounded-2xl border border-[#3A2D23]">
                  <span className="text-xl font-bold text-[#D4AF37] block">{item.val}</span>
                  <span className="text-[9px] text-[#A69382] uppercase">{item.label}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${encodeURIComponent(d.groomNickname)}+%26+${encodeURIComponent(d.brideNickname)}&dates=20261212T080000Z/20261212T140000Z`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#D4AF37] text-black font-sans text-xs font-bold hover:brightness-110 transition-all"
            >
              <CalendarPlus className="w-4 h-4" /> Simpan di Kalender Google
            </a>
          </div>
        </section>

        {/* Mempelai */}
        <section className="py-16 px-8 text-center bg-[#15100C] border-t border-[#291F17]">
          <h2 className="text-2xl font-bold text-[#F5EADB] mb-8">Mempelai Pengantin</h2>
          <div className="space-y-8">
            <div className="bg-[#1F1914] p-6 rounded-3xl border border-[#33261C]">
              <h3 className="text-xl font-bold text-[#D4AF37] mb-1">{d.groomName}</h3>
              <p className="text-xs text-[#A69382] font-sans">{d.groomParents}</p>
            </div>
            <span className="text-2xl text-[#D4AF37] italic block">&amp;</span>
            <div className="bg-[#1F1914] p-6 rounded-3xl border border-[#33261C]">
              <h3 className="text-xl font-bold text-[#D4AF37] mb-1">{d.brideName}</h3>
              <p className="text-xs text-[#A69382] font-sans">{d.brideParents}</p>
            </div>
          </div>
        </section>

        {/* Rangkaian Acara */}
        <section className="py-16 px-8 text-center bg-[#1A140F]">
          <h2 className="text-2xl font-bold text-[#F5EADB] mb-6">Wanci &amp; Papan Acara</h2>
          <div className="space-y-6">
            <div className="bg-[#241D17] p-6 rounded-3xl border border-[#3A2D23]">
              <span className="px-3 py-1 rounded-full bg-[#16120E] text-[#D4AF37] font-sans text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                Akad Nikah
              </span>
              <h3 className="text-lg font-bold text-[#F5EADB] mb-1">{d.akadDate}</h3>
              <p className="text-xs text-[#D4AF37] font-sans mb-3">{d.akadTime}</p>
              <p className="text-xs font-sans text-[#E8DCC4] mb-1">{d.akadLocation}</p>
              <p className="text-[11px] font-sans text-[#8C7B6B] mb-5">{d.akadAddress}</p>
              <a
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-[#D4AF37] text-[#D4AF37] font-sans text-xs font-semibold hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                <MapPin className="w-3.5 h-3.5" /> Buka Google Maps
              </a>
            </div>

            <div className="bg-[#241D17] p-6 rounded-3xl border border-[#3A2D23]">
              <span className="px-3 py-1 rounded-full bg-[#16120E] text-[#D4AF37] font-sans text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                Resepsi Pernikahan
              </span>
              <h3 className="text-lg font-bold text-[#F5EADB] mb-1">{d.resepsiDate}</h3>
              <p className="text-xs text-[#D4AF37] font-sans mb-3">{d.resepsiTime}</p>
              <p className="text-xs font-sans text-[#E8DCC4] mb-1">{d.resepsiLocation}</p>
              <p className="text-[11px] font-sans text-[#8C7B6B] mb-5">{d.resepsiAddress}</p>
              <a
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-[#D4AF37] text-[#D4AF37] font-sans text-xs font-semibold hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                <MapPin className="w-3.5 h-3.5" /> Buka Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Amplop Digital */}
        <section className="py-16 px-8 bg-[#15100C] border-t border-[#291F17] text-center">
          <Gift className="w-7 h-7 mx-auto text-[#D4AF37] mb-2" />
          <h2 className="text-xl font-bold text-[#F5EADB] mb-2">Kado Digital (Cashless)</h2>
          <p className="text-xs font-sans text-[#A69382] mb-6">Tanda kasih kagem pinanganten kekalih:</p>
          <div className="bg-[#241D17] p-6 rounded-3xl border border-[#D4AF37]/30 max-w-xs mx-auto font-sans">
            <p className="text-xs font-bold text-[#D4AF37] uppercase mb-1">{d.bankName}</p>
            <p className="text-xl font-mono font-bold text-[#F5EADB] tracking-wider mb-1">{d.accountNumber}</p>
            <p className="text-xs text-[#8C7B6B] mb-4">a.n {d.accountHolder}</p>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-black text-xs font-bold hover:brightness-110 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Kasil Disalin!" : "Salin Rekening"}</span>
            </button>
          </div>
        </section>

        {/* Buku Tamu */}
        <section className="py-16 px-8 bg-[#1A140F] border-t border-[#291F17] font-sans">
          <h2 className="text-xl font-serif font-bold text-[#F5EADB] text-center mb-1">Donga Pamuji (Buku Tamu)</h2>
          <p className="text-xs text-[#A69382] text-center mb-6">Tilaraken donga lan konfirmasi rawuh</p>

          <form onSubmit={handleAddWish} className="space-y-3 mb-8 bg-[#241D17] p-5 rounded-3xl border border-[#3A2D23]">
            <input
              type="text"
              placeholder="Asma Panjenengan"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#18130F] border border-[#3A2D23] text-white focus:outline-none focus:border-[#D4AF37]"
              required
            />
            <select
              value={inputStatus}
              onChange={(e) => setInputStatus(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#18130F] border border-[#3A2D23] text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="Hadir">Insya Allah Rawuh (Hadir)</option>
              <option value="Tidak Hadir">Mboten Saged Rawuh (Tidak Hadir)</option>
            </select>
            <textarea
              rows={3}
              placeholder="Donga lan pangestu..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#18130F] border border-[#3A2D23] text-white focus:outline-none focus:border-[#D4AF37]"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-black text-xs font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Kirim Pangestu
            </button>
          </form>

          <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
            {wishes.map((w, idx) => (
              <div key={idx} className="bg-[#241D17] p-4 rounded-2xl border border-[#33261C]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#D4AF37]">{w.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18130F] text-[#A69382]">
                    {w.status}
                  </span>
                </div>
                <p className="text-xs text-[#D4C8B8] leading-relaxed">{w.message}</p>
                <span className="text-[9px] text-[#6E5E50] block mt-1">{w.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 text-center bg-[#100D0A] text-[#8C7B6B] border-t border-[#291F17]">
          <p className="text-xs mb-1">Matur Nuwun Awit Rawuh &amp; Donga Pangestunipun</p>
          <p className="text-sm font-serif font-bold text-[#F5EADB]">{d.groomNickname} &amp; {d.brideNickname}</p>
          <p className="text-[9px] text-[#55473B] mt-4 uppercase tracking-widest">IkutSeneng Digital Invitation</p>
        </footer>

      </main>
    </div>
  );
}
