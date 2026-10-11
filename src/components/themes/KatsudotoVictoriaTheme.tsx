"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Music, Volume2, VolumeX, Camera, CalendarPlus, MailOpen, Sparkles 
} from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";

interface ThemeProps {
  data?: Partial<InvitationData>;
  guestName?: string;
}

export default function KatsudotoVictoriaTheme({ 
  data = {}, 
  guestName = "Tamu Undangan" 
}: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  
  // State for Envelope / Cover Open
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

  // State for Countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 120,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  // State for Copy Account
  const [copied, setCopied] = useState(false);

  // State for Guestbook
  const [wishes, setWishes] = useState([
    {
      name: "Andi & Rina",
      status: "Hadir",
      message: "Selamat berbahagia Theodore & Victoria! Semoga menjadi keluarga yang harmonis dan penuh cinta.",
      time: "2 jam yang lalu"
    },
    {
      name: "Bunga Citra",
      status: "Hadir",
      message: "Can't wait to celebrate your special day! Happy wedding!",
      time: "5 jam yang lalu"
    }
  ]);
  const [inputName, setInputName] = useState("");
  const [inputStatus, setInputStatus] = useState("Hadir");
  const [inputMessage, setInputMessage] = useState("");

  // Countdown effect
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

  // Handle Open Invitation & Play Music
  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio autoplay prevented", err);
      });
    }
  };

  // Toggle Music Play/Pause
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
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
      {
        name: inputName,
        status: inputStatus,
        message: inputMessage,
        time: "Baru saja"
      },
      ...wishes
    ]);
    setInputMessage("");
  };

  return (
    <div className="min-h-screen bg-[#EDE7E3] text-[#3D3A37] font-sans selection:bg-[#E8DCC4] overflow-x-hidden relative">
      {/* Background Audio */}
      <audio ref={audioRef} loop src={d.musicUrl} preload="auto" />

      {/* Floating Music Button (appears after open) */}
      {isOpen && (
        <button
          onClick={toggleMusic}
          className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 ${
            isPlaying
              ? "bg-[#2A241E] text-white border-white/20 animate-spin-slow"
              : "bg-white text-[#2A241E] border-slate-200"
          }`}
          title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5 text-rose-400" /> : <VolumeX className="w-5 h-5" />}
        </button>
      )}

      {/* ========================================================= */}
      {/* 1. ENVELOPE COVER SCREEN (BUKA UNDANGAN - KATSUDOTO STYLE) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -1000 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#FAF9F5] flex flex-col items-center justify-between p-6 sm:p-10 text-center overflow-y-auto"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#D5CDC5_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            <div className="relative z-10 pt-8">
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#8C7E72] font-semibold block mb-3">
                The Wedding Of
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2A241E] tracking-tight">
                {d.groomNickname} &amp; {d.brideNickname}
              </h1>
              <p className="text-xs text-[#8C7E72] tracking-widest mt-2">{d.weddingDate}</p>
            </div>

            {/* Arch Cover Photo (Katsudoto Signature Arch) */}
            <div className="relative z-10 my-6">
              <div className="w-56 sm:w-64 h-72 sm:h-80 relative rounded-t-full rounded-b-2xl overflow-hidden border-4 border-white shadow-2xl ring-1 ring-black/5">
                <Image
                  src={d.coverImage}
                  alt="Couple Cover"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Recipient & Open Button */}
            <div className="relative z-10 w-full max-w-xs pb-4">
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#E5DFD5] shadow-sm mb-4">
                <p className="text-[11px] text-[#8C7E72] mb-1">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
                <p className="text-base font-serif font-bold text-[#2A241E] truncate">{currentGuest}</p>
                <p className="text-[10px] text-[#A3968A] mt-1 italic">*Mohon maaf bila ada kesalahan penulisan nama/gelar</p>
              </div>

              <button
                onClick={handleOpenInvitation}
                className="w-full py-3.5 px-6 rounded-full bg-[#2A241E] text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-black transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 group hover:scale-102 active:scale-98"
              >
                <MailOpen className="w-4 h-4 text-rose-300 group-hover:rotate-12 transition-transform" />
                <span>Buka Undangan</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 2. MAIN INVITATION BODY (INSIDE PHONE CONTAINER)           */}
      {/* ========================================================= */}
      <main className="max-w-md mx-auto bg-[#FAF9F5] min-h-screen shadow-2xl border-x border-[#E2DDD3] relative">

        {/* SECTION 1: HERO COVER */}
        <section className="py-20 px-8 text-center relative overflow-hidden bg-gradient-to-b from-[#F3EFE9] to-[#FAF9F5]">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#8C7E72] font-semibold block mb-4">
            The Wedding Celebration of
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2A241E] leading-tight mb-4">
            {d.groomNickname} <br />
            <span className="italic font-normal text-2xl text-[#8C7E72]">&amp;</span> <br />
            {d.brideNickname}
          </h1>
          <p className="text-xs text-[#8C7E72] tracking-[0.25em] font-medium">{d.weddingDate}</p>

          <div className="w-52 h-72 mx-auto relative rounded-t-full rounded-b-xl overflow-hidden my-8 border-4 border-white shadow-xl">
            <Image src={d.coverImage} alt="Couple" fill className="object-cover" />
          </div>

          <p className="text-[11px] text-[#8C7E72] tracking-widest font-mono uppercase">#ForeverWithYou</p>
        </section>

        {/* SECTION 2: QUOTE SECTION */}
        <section className="py-16 px-8 text-center bg-white border-y border-[#EDE8DF]">
          <Heart className="w-6 h-6 mx-auto text-rose-400 mb-6" />
          <blockquote className="text-sm font-serif italic text-[#594E42] leading-relaxed max-w-xs mx-auto mb-4">
            "{d.quote}"
          </blockquote>
          <div className="w-12 h-0.5 bg-[#8C7E72]/30 mx-auto" />
        </section>

        {/* SECTION 3: SAVE THE DATE & COUNTDOWN (KATSUDOTO TICKET STYLE) */}
        <section className="py-16 px-6 sm:px-8 text-center bg-[#FAF9F5]">
          {/* Ticket Frame */}
          <div className="bg-[#F4EFEB] rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] shadow-sm relative overflow-hidden">
            {/* Notches on sides to mimic ticket */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF9F5] border border-[#E5DFD5]" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF9F5] border border-[#E5DFD5]" />

            <h2 className="text-2xl font-serif font-bold text-[#2A241E] mb-1">Save The Date</h2>
            <p className="text-xs text-[#8C7E72] mb-6">{d.weddingDate}</p>

            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {[
                { label: "Hari", val: timeLeft.days },
                { label: "Jam", val: timeLeft.hours },
                { label: "Menit", val: timeLeft.minutes },
                { label: "Detik", val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-2xl shadow-xs border border-[#E8E2D8]">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#2A241E] block">
                    {item.val}
                  </span>
                  <span className="text-[10px] text-[#8C7E72] font-semibold uppercase">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Add to Google Calendar */}
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${encodeURIComponent(d.groomNickname)}+%26+${encodeURIComponent(d.brideNickname)}&dates=20261212T080000Z/20261212T140000Z&details=Undangan+Pernikahan+Digital+IkutSeneng`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#2A241E] text-white text-xs font-semibold hover:bg-black transition-colors shadow-sm"
            >
              <CalendarPlus className="w-4 h-4 text-rose-300" />
              <span>Simpan ke Google Calendar</span>
            </a>
          </div>
        </section>

        {/* SECTION 4: THE COUPLE (TWO SOULS, ONE JOURNEY) */}
        <section className="py-16 px-8 bg-white border-t border-[#EDE8DF] text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7E72] font-semibold block mb-2">
            Two Souls, One Journey
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#2A241E] mb-3">Mempelai Bahagia</h2>
          <p className="text-xs text-[#6B5F52] leading-relaxed max-w-xs mx-auto mb-12">
            Dengan penuh rasa syukur dan memohon rahmat Allah SWT, kami menyatukan cinta kami dalam ikatan pernikahan yang suci.
          </p>

          <div className="space-y-12">
            {/* The Groom */}
            <div className="bg-[#FAF9F5] p-6 rounded-3xl border border-[#EDE8DF]">
              <div className="w-36 h-48 mx-auto relative rounded-t-full rounded-b-xl overflow-hidden border-2 border-white shadow-md mb-4">
                <Image src={d.coverImage} alt="Groom" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2A241E] mb-1">{d.groomName}</h3>
              <p className="text-xs text-[#8C7E72] mb-3">{d.groomParents}</p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-[#2A241E] font-medium hover:text-rose-500 transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-rose-500" /> @{d.groomNickname.toLowerCase()}_ig
              </a>
            </div>

            <span className="text-3xl font-serif italic text-[#8C7E72] block">&amp;</span>

            {/* The Bride */}
            <div className="bg-[#FAF9F5] p-6 rounded-3xl border border-[#EDE8DF]">
              <div className="w-36 h-48 mx-auto relative rounded-t-full rounded-b-xl overflow-hidden border-2 border-white shadow-md mb-4">
                <Image src={d.coverImage} alt="Bride" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2A241E] mb-1">{d.brideName}</h3>
              <p className="text-xs text-[#8C7E72] mb-3">{d.brideParents}</p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-[#2A241E] font-medium hover:text-rose-500 transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-rose-500" /> @{d.brideNickname.toLowerCase()}_ig
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 5: CELEBRATION EVENTS (AGENDA) */}
        <section className="py-16 px-8 bg-[#F3EFE9] border-t border-[#E6E0D4] text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7E72] font-semibold block mb-2">
            Wedding Agenda
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#2A241E] mb-8">Rangkaian Acara</h2>

          <div className="space-y-6">
            {/* Akad */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2DDD3] shadow-xs text-center">
              <span className="px-3 py-1 rounded-full bg-[#F3EFE9] text-[#7A6B58] text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                Akad Nikah
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2A241E] mb-2">{d.akadDate}</h3>
              <div className="flex items-center justify-center gap-2 text-xs text-[#8C7E72] mb-4">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>{d.akadTime}</span>
              </div>
              <p className="font-semibold text-xs text-[#2A241E] mb-1">{d.akadLocation}</p>
              <p className="text-[11px] text-[#8C7E72] leading-relaxed mb-6">{d.akadAddress}</p>
              <a
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#2A241E] text-[#2A241E] text-xs font-semibold hover:bg-[#2A241E] hover:text-white transition-all"
              >
                <MapPin className="w-3.5 h-3.5" /> Buka Google Maps
              </a>
            </div>

            {/* Resepsi */}
            <div className="bg-white p-6 rounded-3xl border border-[#E2DDD3] shadow-xs text-center">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                Resepsi Pernikahan
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2A241E] mb-2">{d.resepsiDate}</h3>
              <div className="flex items-center justify-center gap-2 text-xs text-[#8C7E72] mb-4">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>{d.resepsiTime}</span>
              </div>
              <p className="font-semibold text-xs text-[#2A241E] mb-1">{d.resepsiLocation}</p>
              <p className="text-[11px] text-[#8C7E72] leading-relaxed mb-6">{d.resepsiAddress}</p>
              <a
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#2A241E] text-[#2A241E] text-xs font-semibold hover:bg-[#2A241E] hover:text-white transition-all"
              >
                <MapPin className="w-3.5 h-3.5" /> Buka Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 6: DRESSCODE PALETTE (KATSUDOTO SIGNATURE) */}
        <section className="py-14 px-8 bg-white border-t border-[#EDE8DF] text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8C7E72] font-semibold block mb-1">
            Attire Guide
          </span>
          <h2 className="text-xl font-serif font-bold text-[#2A241E] mb-2">Panduan Dresscode</h2>
          <p className="text-xs text-[#8C7E72] mb-6">Semi Formal / Colorful Chic</p>

          <div className="flex justify-center items-center gap-3">
            {[
              { color: "#B3C6D5", name: "Soft Blue" },
              { color: "#47472F", name: "Olive" },
              { color: "#A19C7F", name: "Sage" },
              { color: "#A75F62", name: "Rose" },
              { color: "#CEAA9E", name: "Nude" },
            ].map((swatch, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className="w-9 h-9 rounded-full shadow-inner border border-black/10"
                  style={{ backgroundColor: swatch.color }}
                  title={swatch.name}
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: PHOTO GALLERY */}
        {d.galleryImages && d.galleryImages.length > 0 && (
          <section className="py-16 px-6 bg-[#FAF9F5] border-t border-[#EDE8DF]">
            <h2 className="text-xl font-serif font-bold text-[#2A241E] text-center mb-6">Momen Kami</h2>
            <div className="grid grid-cols-2 gap-3">
              {d.galleryImages.map((img, i) => (
                <div key={i} className="aspect-[3/4] relative rounded-2xl overflow-hidden shadow-xs border border-white">
                  <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 8: CASHLESS WEDDING GIFT (AMPLOP DIGITAL) */}
        <section className="py-16 px-8 bg-white border-t border-[#EDE8DF] text-center">
          <Gift className="w-7 h-7 mx-auto text-[#2A241E] mb-3" />
          <h2 className="text-xl font-serif font-bold text-[#2A241E] mb-2">Tanda Kasih (Amplop Digital)</h2>
          <p className="text-xs text-[#8C7E72] leading-relaxed max-w-xs mx-auto mb-8">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, dapat melalui:
          </p>

          <div className="bg-[#FAF9F5] p-6 rounded-3xl border border-[#E5DFD5] max-w-xs mx-auto shadow-sm">
            <span className="text-xs font-bold text-[#2A241E] uppercase tracking-wider block mb-1">
              Bank {d.bankName}
            </span>
            <span className="text-xl font-mono font-bold text-[#2A241E] tracking-wider block mb-1">
              {d.accountNumber}
            </span>
            <span className="text-xs text-[#8C7E72] block mb-4">a.n {d.accountHolder}</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2A241E] text-white text-xs font-semibold hover:bg-black transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Berhasil Disalin!" : "Salin No. Rekening"}</span>
            </button>
          </div>
        </section>

        {/* SECTION 9: RSVP & BUKU TAMU */}
        <section className="py-16 px-8 bg-[#F8F5F0] border-t border-[#EDE8DF]">
          <h2 className="text-xl font-serif font-bold text-[#2A241E] text-center mb-1">Konfirmasi &amp; Ucapan</h2>
          <p className="text-xs text-[#8C7E72] text-center mb-6">Berikan doa restu dan konfirmasi kehadiran Anda</p>

          <form onSubmit={handleAddWish} className="space-y-3 mb-8 bg-white p-5 rounded-3xl border border-[#E2DDD3] shadow-xs">
            <div>
              <label className="text-[11px] font-semibold text-[#6E6458] block mb-1">Nama Tamu</label>
              <input
                type="text"
                placeholder="Tuliskan nama Anda"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E2DDD3] bg-[#FAF9F5] focus:outline-none focus:border-[#2A241E]"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#6E6458] block mb-1">Konfirmasi Kehadiran</label>
              <select
                value={inputStatus}
                onChange={(e) => setInputStatus(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E2DDD3] bg-[#FAF9F5] focus:outline-none focus:border-[#2A241E]"
              >
                <option value="Hadir">Ya, Saya akan Hadir</option>
                <option value="Tidak Hadir">Mohon Maaf, Berhalangan Hadir</option>
                <option value="Ragu-ragu">Masih Ragu-ragu</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#6E6458] block mb-1">Ucapan &amp; Doa</label>
              <textarea
                rows={3}
                placeholder="Tuliskan pesan doa restu..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E2DDD3] bg-[#FAF9F5] focus:outline-none focus:border-[#2A241E]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#2A241E] text-white text-xs font-semibold hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Kirim Ucapan
            </button>
          </form>

          {/* List of wishes */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1 no-scrollbar">
            {wishes.map((w, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-[#E6E0D4] shadow-2xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#2A241E]">{w.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3EFE9] text-[#7A6B58] font-semibold">
                    {w.status}
                  </span>
                </div>
                <p className="text-xs text-[#594E42] leading-relaxed">{w.message}</p>
                <span className="text-[9px] text-[#A3968A] block mt-1.5">{w.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10: CLOSING & FOOTER */}
        <footer className="py-12 px-8 text-center bg-[#2A241E] text-white">
          <p className="text-xs text-[#C5BCB1] mb-2">Merupakan suatu kehormatan &amp; kebahagiaan bagi kami apabila Anda berkenan hadir.</p>
          <h3 className="text-2xl font-serif font-bold text-white mb-6">
            {d.groomNickname} &amp; {d.brideNickname}
          </h3>
          <p className="text-[10px] text-[#8C7E72] tracking-widest uppercase">Created with IkutSeneng Digital Invitation</p>
        </footer>

      </main>
    </div>
  );
}
