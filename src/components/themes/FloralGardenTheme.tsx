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

export default function FloralGardenTheme({ 
  data = {}, 
  guestName = "Tamu Undangan" 
}: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(guestName);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 98,
    hours: 11,
    minutes: 42,
    seconds: 18
  });

  const [copied, setCopied] = useState(false);
  const [wishes, setWishes] = useState([
    {
      name: "Clarissa & Kevin",
      status: "Hadir",
      message: "Happy Wedding dearest! Semoga selalu mekar dalam kebahagiaan seperti bunga-bunga yang indah ini.",
      time: "1 jam lalu"
    },
    {
      name: "Tante Maya",
      status: "Hadir",
      message: "Selamat ya sayang, langgeng sampai maut memisahkan dan selalu diberkahi rumah tangganya.",
      time: "4 jam lalu"
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
    <div className="min-h-screen bg-[#FFF8F8] text-[#5C4547] font-serif overflow-x-hidden relative selection:bg-rose-200">
      <audio ref={audioRef} loop src={d.musicUrl} preload="auto" />

      {isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-2xl bg-rose-500 text-white border-2 border-white hover:scale-110 transition-all"
          title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </button>
      )}

      {/* 1. ENVELOPE SCREEN (FLORAL WATERCOLOR WREATH) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-[#FFF5F5] flex flex-col items-center justify-between p-6 sm:p-10 text-center relative overflow-hidden"
          >
            {/* Soft watercolor floral background blur */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="pt-8 relative z-10">
              <span className="text-[10px] tracking-[0.4em] uppercase text-rose-500 font-sans font-bold block mb-2">
                Blooming Love Celebration
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#453032] tracking-wide">
                {d.groomNickname} &amp; {d.brideNickname}
              </h1>
              <p className="text-xs text-rose-400 font-sans tracking-widest mt-2">{d.weddingDate}</p>
            </div>

            {/* Circular Floral Wreath Photo */}
            <div className="my-6 relative z-10">
              <div className="w-60 h-60 sm:w-64 sm:h-64 relative rounded-full overflow-hidden border-8 border-white shadow-2xl shadow-rose-200/50 ring-4 ring-rose-200">
                <Image src={d.coverImage} alt="Couple" fill className="object-cover" priority />
              </div>
            </div>

            <div className="w-full max-w-xs pb-4 relative z-10">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-rose-100 mb-4 shadow-sm font-sans">
                <p className="text-[10px] text-rose-400 uppercase tracking-wider mb-1">Kepada Yth:</p>
                <p className="text-base font-serif font-bold text-[#453032]">{currentGuest}</p>
              </div>

              <button
                onClick={handleOpenInvitation}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all"
              >
                <MailOpen className="w-4 h-4" /> Buka Undangan Bunga
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN FLORAL INVITATION */}
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-2xl border-x border-rose-100 relative">
        
        {/* Header Cover */}
        <section className="py-20 px-8 text-center bg-gradient-to-b from-[#FFF0F2] via-[#FFF8F8] to-white relative overflow-hidden">
          <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-rose-400 block mb-3">Our Love Story</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#453032] leading-tight mb-2">
            {d.groomNickname} <br />
            <span className="italic font-normal text-2xl text-rose-400">&amp;</span> <br />
            {d.brideNickname}
          </h1>
          <p className="text-xs font-sans text-rose-400 tracking-widest">{d.weddingDate}</p>

          <div className="w-56 h-80 mx-auto relative rounded-3xl overflow-hidden my-8 border-4 border-white shadow-xl shadow-rose-200/40">
            <Image src={d.coverImage} alt="Cover" fill className="object-cover" />
          </div>

          <p className="text-xs italic text-rose-600 font-sans tracking-wide">"Like flowers in bloom, our love grows forever"</p>
        </section>

        {/* Quotes */}
        <section className="py-16 px-8 text-center bg-[#FFFBFB] border-y border-rose-100">
          <Heart className="w-6 h-6 mx-auto text-rose-400 fill-rose-300 mb-4" />
          <p className="text-xs italic text-[#6B4E50] leading-relaxed max-w-xs mx-auto mb-4">
            "{d.quote}"
          </p>
          <div className="w-8 h-0.5 bg-rose-200 mx-auto" />
        </section>

        {/* Save The Date Countdown */}
        <section className="py-16 px-6 text-center bg-white">
          <div className="bg-[#FFF4F5] rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
            <h2 className="text-2xl font-bold text-[#453032] mb-1">Save Our Date</h2>
            <p className="text-xs text-rose-500 font-sans mb-6">{d.weddingDate}</p>

            <div className="grid grid-cols-4 gap-2 mb-6 font-sans">
              {[
                { label: "Hari", val: timeLeft.days },
                { label: "Jam", val: timeLeft.hours },
                { label: "Menit", val: timeLeft.minutes },
                { label: "Detik", val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-2xl border border-rose-100 shadow-xs">
                  <span className="text-xl font-bold text-rose-500 block">{item.val}</span>
                  <span className="text-[9px] text-[#8C6B6E] uppercase font-semibold">{item.label}</span>
                </div>
              ))}
            </div>

            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${encodeURIComponent(d.groomNickname)}+%26+${encodeURIComponent(d.brideNickname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-rose-500 text-white font-sans text-xs font-bold hover:bg-rose-600 transition-all shadow-md shadow-rose-500/20"
            >
              <CalendarPlus className="w-4 h-4" /> Simpan di Google Calendar
            </a>
          </div>
        </section>

        {/* Mempelai */}
        <section className="py-16 px-8 text-center bg-[#FFFBFB] border-t border-rose-100">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-rose-400 block mb-2">The Happy Couple</span>
          <h2 className="text-2xl font-bold text-[#453032] mb-8">Kedua Mempelai</h2>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs">
              <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden border-4 border-rose-100 shadow-md mb-4">
                <Image src={d.coverImage} alt="Groom" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-[#453032] mb-1">{d.groomName}</h3>
              <p className="text-xs text-[#8C6B6E] font-sans">{d.groomParents}</p>
            </div>

            <span className="text-2xl text-rose-400 italic block">&amp;</span>

            <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs">
              <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden border-4 border-rose-100 shadow-md mb-4">
                <Image src={d.coverImage} alt="Bride" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-[#453032] mb-1">{d.brideName}</h3>
              <p className="text-xs text-[#8C6B6E] font-sans">{d.brideParents}</p>
            </div>
          </div>
        </section>

        {/* Agenda Acara */}
        <section className="py-16 px-8 text-center bg-white border-t border-rose-100">
          <h2 className="text-2xl font-bold text-[#453032] mb-6">Rangkaian Acara</h2>
          <div className="space-y-6">
            <div className="bg-[#FFF8F8] p-6 rounded-3xl border border-rose-100">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 font-sans text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                Akad Nikah
              </span>
              <h3 className="text-lg font-bold text-[#453032] mb-1">{d.akadDate}</h3>
              <p className="text-xs text-rose-500 font-sans mb-3">{d.akadTime}</p>
              <p className="text-xs font-sans text-[#453032] font-semibold mb-1">{d.akadLocation}</p>
              <p className="text-[11px] font-sans text-[#8C6B6E] mb-5">{d.akadAddress}</p>
              <a
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full border border-rose-500 text-rose-500 font-sans text-xs font-semibold hover:bg-rose-500 hover:text-white transition-all"
              >
                <MapPin className="w-3.5 h-3.5" /> Google Maps
              </a>
            </div>

            <div className="bg-[#FFF8F8] p-6 rounded-3xl border border-rose-100">
              <span className="px-3 py-1 rounded-full bg-rose-500 text-white font-sans text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                Resepsi
              </span>
              <h3 className="text-lg font-bold text-[#453032] mb-1">{d.resepsiDate}</h3>
              <p className="text-xs text-rose-500 font-sans mb-3">{d.resepsiTime}</p>
              <p className="text-xs font-sans text-[#453032] font-semibold mb-1">{d.resepsiLocation}</p>
              <p className="text-[11px] font-sans text-[#8C6B6E] mb-5">{d.resepsiAddress}</p>
              <a
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full border border-rose-500 text-rose-500 font-sans text-xs font-semibold hover:bg-rose-500 hover:text-white transition-all"
              >
                <MapPin className="w-3.5 h-3.5" /> Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Dresscode Floral */}
        <section className="py-14 px-8 bg-[#FFFBFB] border-t border-rose-100 text-center font-sans">
          <span className="text-[10px] tracking-[0.3em] uppercase text-rose-400 font-bold block mb-1">
            Dresscode
          </span>
          <h2 className="text-xl font-serif font-bold text-[#453032] mb-2">Pastel Garden Attire</h2>
          <div className="flex justify-center items-center gap-3 mt-4">
            {["#F8BBD0", "#F48FB1", "#C8E6C9", "#D7CCC8", "#FFF9C4"].map((color, idx) => (
              <div key={idx} className="w-9 h-9 rounded-full shadow-xs border-2 border-white" style={{ backgroundColor: color }} />
            ))}
          </div>
        </section>

        {/* Amplop Digital */}
        <section className="py-16 px-8 bg-white border-t border-rose-100 text-center">
          <Gift className="w-7 h-7 mx-auto text-rose-500 mb-2" />
          <h2 className="text-xl font-bold text-[#453032] mb-2">Tanda Kasih (Amplop Digital)</h2>
          <p className="text-xs font-sans text-[#8C6B6E] mb-6">Doa restu Anda karunia terindah bagi kami:</p>
          <div className="bg-[#FFF8F8] p-6 rounded-3xl border border-rose-200 max-w-xs mx-auto font-sans">
            <p className="text-xs font-bold text-rose-500 uppercase mb-1">{d.bankName}</p>
            <p className="text-xl font-mono font-bold text-[#453032] tracking-wider mb-1">{d.accountNumber}</p>
            <p className="text-xs text-[#8C6B6E] mb-4">a.n {d.accountHolder}</p>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Berhasil Disalin!" : "Salin Rekening"}</span>
            </button>
          </div>
        </section>

        {/* Buku Tamu */}
        <section className="py-16 px-8 bg-[#FFFBFB] border-t border-rose-100 font-sans">
          <h2 className="text-xl font-serif font-bold text-[#453032] text-center mb-1">Buku Tamu &amp; Doa</h2>
          <p className="text-xs text-[#8C6B6E] text-center mb-6">Kirimkan doa terbaik Anda untuk kami</p>

          <form onSubmit={handleAddWish} className="space-y-3 mb-8 bg-white p-5 rounded-3xl border border-rose-100 shadow-xs">
            <input
              type="text"
              placeholder="Nama Anda"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FFFBFB] border border-rose-200 text-[#453032] focus:outline-none focus:border-rose-500"
              required
            />
            <select
              value={inputStatus}
              onChange={(e) => setInputStatus(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FFFBFB] border border-rose-200 text-[#453032] focus:outline-none focus:border-rose-500"
            >
              <option value="Hadir">Pasti Hadir</option>
              <option value="Tidak Hadir">Berhalangan Hadir</option>
            </select>
            <textarea
              rows={3}
              placeholder="Tuliskan ucapan dan doa..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-[#FFFBFB] border border-rose-200 text-[#453032] focus:outline-none focus:border-rose-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all shadow-md shadow-rose-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Kirim Ucapan
            </button>
          </form>

          <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
            {wishes.map((w, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-rose-100 shadow-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#453032]">{w.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-500 font-semibold">{w.status}</span>
                </div>
                <p className="text-xs text-[#6B4E50] leading-relaxed">{w.message}</p>
                <span className="text-[9px] text-rose-300 block mt-1">{w.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 text-center bg-[#453032] text-white">
          <p className="text-xs text-rose-200 mb-1">Terima Kasih Atas Doa &amp; Restu Anda</p>
          <p className="text-sm font-serif font-bold text-white">{d.groomNickname} &amp; {d.brideNickname}</p>
          <p className="text-[9px] text-rose-300 mt-4 uppercase tracking-widest">IkutSeneng Floral Garden</p>
        </footer>

      </main>
    </div>
  );
}
