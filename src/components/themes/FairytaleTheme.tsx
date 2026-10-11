"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Volume2, VolumeX, BookOpen, CalendarPlus, Sparkles, Star 
} from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";

interface ThemeProps {
  data?: Partial<InvitationData>;
  guestName?: string;
}

export default function FairytaleTheme({ 
  data = {}, 
  guestName = "Tamu Undangan" 
}: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(guestName);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 140,
    hours: 18,
    minutes: 25,
    seconds: 40
  });

  const [copied, setCopied] = useState(false);
  const [wishes, setWishes] = useState([
    {
      name: "Prince Edward & Family",
      status: "Hadir",
      message: "May your love story shine brightly forever, just like a magical fairytale with a true happy ending!",
      time: "2 jam lalu"
    }
  ]);
  const [inputName, setInputName] = useState("");
  const [inputStatus, setInputStatus] = useState("Hadir");
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const to = sp.get("to");
      if (to) setCurrentGuest(to);
    }
  }, []);

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
    <div className="min-h-screen bg-[#F4F1FA] text-[#3E3553] font-serif overflow-x-hidden relative selection:bg-purple-200">
      <audio ref={audioRef} loop src={d.musicUrl} preload="auto" />

      {isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-2xl bg-[#6B52AE] text-white border-2 border-white hover:scale-110 transition-all"
          title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </button>
      )}

      {/* 1. STORYBOOK COVER (FAIRYTALE CHAPTER) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.9 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-[#2A2047] to-[#171229] flex flex-col items-center justify-between p-6 sm:p-10 text-center text-white"
          >
            <div className="pt-8">
              <Sparkles className="w-7 h-7 mx-auto text-[#E2D4FF] mb-2 animate-bounce" />
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4B5FD] font-sans font-bold">
                Chapter One: The Royal Vow
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wide mt-2">
                {d.groomNickname} &amp; {d.brideNickname}
              </h1>
              <p className="text-xs text-[#DDD6FE] font-sans tracking-widest mt-2">{d.weddingDate}</p>
            </div>

            <div className="my-6">
              <div className="w-56 h-72 relative rounded-3xl overflow-hidden border-2 border-[#C4B5FD]/50 shadow-2xl shadow-purple-950">
                <Image src={d.coverImage} alt="Couple" fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1638] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            <div className="w-full max-w-xs pb-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 mb-4 shadow-md font-sans">
                <p className="text-[10px] text-[#C4B5FD] uppercase tracking-wider mb-1">Specially Invited:</p>
                <p className="text-base font-serif font-bold text-white">{currentGuest}</p>
              </div>

              <button
                onClick={handleOpenInvitation}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all"
              >
                <BookOpen className="w-4 h-4" /> Buka Kisah Dongeng
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN FAIRYTALE INVITATION */}
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-2xl border-x border-[#E9E4F5] relative">
        
        {/* Cover */}
        <section className="py-20 px-8 text-center bg-gradient-to-b from-[#EDE8F8] to-white relative">
          <Star className="w-5 h-5 mx-auto text-[#8B5CF6] fill-[#8B5CF6]/20 mb-3" />
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#8B5CF6] block mb-2">Once Upon A Time</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#2A2047] leading-tight mb-2">
            {d.groomNickname} <br />
            <span className="italic font-normal text-2xl text-[#8B5CF6]">&amp;</span> <br />
            {d.brideNickname}
          </h1>
          <p className="text-xs font-sans text-[#7C6A9E] tracking-widest">{d.weddingDate}</p>

          <div className="w-56 h-80 mx-auto relative rounded-3xl overflow-hidden my-8 border-4 border-white shadow-xl shadow-purple-100">
            <Image src={d.coverImage} alt="Cover" fill className="object-cover" />
          </div>

          <p className="text-xs italic text-[#7C6A9E]">"And so together, they built a life they loved."</p>
        </section>

        {/* Quotes */}
        <section className="py-16 px-8 text-center bg-[#FAF8FE] border-y border-[#EDE8F8]">
          <p className="text-xs italic text-[#554673] leading-relaxed max-w-xs mx-auto mb-4">
            "{d.quote}"
          </p>
          <div className="w-10 h-0.5 bg-[#8B5CF6]/30 mx-auto" />
        </section>

        {/* Countdown */}
        <section className="py-16 px-6 text-center bg-white">
          <div className="bg-[#F5F1FD] rounded-3xl p-6 border border-[#E4DCF9] shadow-sm">
            <h2 className="text-2xl font-bold text-[#2A2047] mb-1">The Royal Countdown</h2>
            <p className="text-xs text-[#8B5CF6] font-sans mb-6">{d.weddingDate}</p>

            <div className="grid grid-cols-4 gap-2 mb-6 font-sans">
              {[
                { label: "Hari", val: timeLeft.days },
                { label: "Jam", val: timeLeft.hours },
                { label: "Menit", val: timeLeft.minutes },
                { label: "Detik", val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-2xl border border-[#EDE8F8] shadow-xs">
                  <span className="text-xl font-bold text-[#7C3AED] block">{item.val}</span>
                  <span className="text-[9px] text-[#7C6A9E] uppercase font-semibold">{item.label}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Royal+Wedding+${encodeURIComponent(d.groomNickname)}+%26+${encodeURIComponent(d.brideNickname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#7C3AED] text-white font-sans text-xs font-bold hover:bg-[#6D28D9] transition-all shadow-md shadow-purple-500/20"
            >
              <CalendarPlus className="w-4 h-4" /> Simpan di Google Calendar
            </a>
          </div>
        </section>

        {/* Mempelai */}
        <section className="py-16 px-8 text-center bg-[#FAF8FE] border-t border-[#EDE8F8]">
          <h2 className="text-2xl font-bold text-[#2A2047] mb-8">The Prince &amp; Princess</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-[#EDE8F8] shadow-xs">
              <h3 className="text-xl font-bold text-[#2A2047] mb-1">{d.groomName}</h3>
              <p className="text-xs text-[#7C6A9E] font-sans">{d.groomParents}</p>
            </div>
            <span className="text-2xl text-[#8B5CF6] italic block">&amp;</span>
            <div className="bg-white p-6 rounded-3xl border border-[#EDE8F8] shadow-xs">
              <h3 className="text-xl font-bold text-[#2A2047] mb-1">{d.brideName}</h3>
              <p className="text-xs text-[#7C6A9E] font-sans">{d.brideParents}</p>
            </div>
          </div>
        </section>

        {/* Rangkaian Acara */}
        <section className="py-16 px-8 text-center bg-white border-t border-[#EDE8F8]">
          <h2 className="text-2xl font-bold text-[#2A2047] mb-6">Celebration Agenda</h2>
          <div className="space-y-6">
            <div className="bg-[#F8F5FD] p-6 rounded-3xl border border-[#E9E4F5]">
              <span className="px-3 py-1 rounded-full bg-[#EDE8F8] text-[#7C3AED] font-sans text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                Holy Matrimony
              </span>
              <h3 className="text-lg font-bold text-[#2A2047] mb-1">{d.akadDate}</h3>
              <p className="text-xs text-[#8B5CF6] font-sans mb-3">{d.akadTime}</p>
              <p className="text-xs font-sans text-[#2A2047] font-semibold mb-1">{d.akadLocation}</p>
              <p className="text-[11px] font-sans text-[#7C6A9E] mb-5">{d.akadAddress}</p>
              <a
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full border border-[#7C3AED] text-[#7C3AED] font-sans text-xs font-semibold hover:bg-[#7C3AED] hover:text-white transition-all"
              >
                <MapPin className="w-3.5 h-3.5" /> Buka Google Maps
              </a>
            </div>

            <div className="bg-[#F8F5FD] p-6 rounded-3xl border border-[#E9E4F5]">
              <span className="px-3 py-1 rounded-full bg-[#7C3AED] text-white font-sans text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                Royal Ball Reception
              </span>
              <h3 className="text-lg font-bold text-[#2A2047] mb-1">{d.resepsiDate}</h3>
              <p className="text-xs text-[#8B5CF6] font-sans mb-3">{d.resepsiTime}</p>
              <p className="text-xs font-sans text-[#2A2047] font-semibold mb-1">{d.resepsiLocation}</p>
              <p className="text-[11px] font-sans text-[#7C6A9E] mb-5">{d.resepsiAddress}</p>
              <a
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full border border-[#7C3AED] text-[#7C3AED] font-sans text-xs font-semibold hover:bg-[#7C3AED] hover:text-white transition-all"
              >
                <MapPin className="w-3.5 h-3.5" /> Buka Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Dresscode Fairytale */}
        <section className="py-14 px-8 bg-[#FAF8FE] border-t border-[#EDE8F8] text-center font-sans">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B5CF6] font-bold block mb-1">Dresscode</span>
          <h2 className="text-xl font-serif font-bold text-[#2A2047] mb-2">Fairytale Pastel Attire</h2>
          <div className="flex justify-center items-center gap-3 mt-4">
            {["#D8B4FE", "#C4B5FD", "#93C5FD", "#E2E8F0", "#FDE68A"].map((color, idx) => (
              <div key={idx} className="w-9 h-9 rounded-full shadow-xs border-2 border-white" style={{ backgroundColor: color }} />
            ))}
          </div>
        </section>

        {/* Amplop Digital */}
        <section className="py-16 px-8 bg-white border-t border-[#EDE8F8] text-center">
          <Gift className="w-7 h-7 mx-auto text-[#7C3AED] mb-2" />
          <h2 className="text-xl font-bold text-[#2A2047] mb-2">Tanda Kasih (Amplop Digital)</h2>
          <p className="text-xs font-sans text-[#7C6A9E] mb-6">Tanda kasih kado pernikahan digital:</p>
          <div className="bg-[#FAF8FE] p-6 rounded-3xl border border-[#E4DCF9] max-w-xs mx-auto font-sans">
            <p className="text-xs font-bold text-[#7C3AED] uppercase mb-1">{d.bankName}</p>
            <p className="text-xl font-mono font-bold text-[#2A241E] tracking-wider mb-1">{d.accountNumber}</p>
            <p className="text-xs text-[#7C6A9E] mb-4">a.n {d.accountHolder}</p>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] transition-all shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Berhasil Disalin!" : "Salin Rekening"}</span>
            </button>
          </div>
        </section>

        {/* Buku Tamu */}
        <section className="py-16 px-8 bg-[#FAF8FE] border-t border-[#EDE8F8] font-sans">
          <h2 className="text-xl font-serif font-bold text-[#2A2047] text-center mb-1">Buku Tamu &amp; Harapan</h2>
          <p className="text-xs text-[#7C6A9E] text-center mb-6">Tinggalkan doa restu untuk perjalanan kami</p>

          <form onSubmit={handleAddWish} className="space-y-3 mb-8 bg-white p-5 rounded-3xl border border-[#EDE8F8] shadow-xs">
            <input
              type="text"
              placeholder="Nama Anda"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8FE] border border-[#E4DCF9] text-[#2A2047] focus:outline-none focus:border-[#7C3AED]"
              required
            />
            <select
              value={inputStatus}
              onChange={(e) => setInputStatus(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8FE] border border-[#E4DCF9] text-[#2A2047] focus:outline-none focus:border-[#7C3AED]"
            >
              <option value="Hadir">Akan Hadir</option>
              <option value="Tidak Hadir">Belum Bisa Hadir</option>
            </select>
            <textarea
              rows={3}
              placeholder="Tulis ucapan dan doa..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FAF8FE] border border-[#E4DCF9] text-[#2A2047] focus:outline-none focus:border-[#7C3AED]"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Kirim Harapan
            </button>
          </form>

          <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
            {wishes.map((w, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-[#EDE8F8]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#2A2047]">{w.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EDE8F8] text-[#7C3AED] font-semibold">{w.status}</span>
                </div>
                <p className="text-xs text-[#554673] leading-relaxed">{w.message}</p>
                <span className="text-[9px] text-[#A78BFA] block mt-1">{w.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 text-center bg-[#1E1638] text-white">
          <p className="text-xs text-[#C4B5FD] mb-1">Happily Ever After Begins Now</p>
          <p className="text-sm font-serif font-bold text-white">{d.groomNickname} &amp; {d.brideNickname}</p>
          <p className="text-[9px] text-[#A78BFA] mt-4 uppercase tracking-widest">IkutSeneng Fairytale Romance</p>
        </footer>

      </main>
    </div>
  );
}
