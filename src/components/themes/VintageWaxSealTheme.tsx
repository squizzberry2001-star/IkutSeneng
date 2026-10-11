"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Volume2, VolumeX, Mail, Stamp, Feather, Sparkles
} from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";

interface ThemeProps {
  data?: Partial<InvitationData>;
  guestName?: string;
}

export default function VintageWaxSealTheme({ 
  data = {}, 
  guestName = "Tamu Undangan" 
}: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBreakingSeal, setIsBreakingSeal] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(guestName);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 112,
    hours: 8,
    minutes: 19,
    seconds: 35
  });

  const [copied, setCopied] = useState(false);
  const [wishes, setWishes] = useState([
    {
      name: "Arthur & Elizabeth",
      status: "Hadir",
      message: "Sending our fondest love across the miles. May your marriage be as timeless and heartwarming as this classic letter.",
      time: "3 jam lalu"
    },
    {
      name: "Keluarga Handoko",
      status: "Hadir",
      message: "Selamat menempuh hidup baru. Semoga rukun, bahagia dan senantiasa dalam lindungan Tuhan Yang Maha Kuasa.",
      time: "6 jam lalu"
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
    setIsBreakingSeal(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }, 900);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const copyAccount = () => {
    navigator.clipboard.writeText(d.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitWish = (e: React.FormEvent) => {
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
    setInputName("");
    setInputMessage("");
  };

  return (
    <div className="relative min-h-screen bg-[#f3ede2] text-[#3d332a] font-serif antialiased selection:bg-[#c49a6c] selection:text-white">
      {/* Hidden Audio */}
      <audio ref={audioRef} src={d.musicUrl} loop preload="auto" />

      {/* Floating Vintage Gramophone / Audio Button */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={toggleMusic}
            className="flex items-center gap-2 bg-[#4a3b32] text-[#f7f2ea] border-2 border-[#b89772] px-4 py-2.5 rounded-full shadow-2xl text-xs tracking-wider uppercase hover:bg-[#342821] transition-all group"
          >
            <span className="text-[11px] font-mono">{isPlaying ? "♪ PLAYING" : "PAUSED"}</span>
            {isPlaying ? <Volume2 className="w-4 h-4 text-[#e0b784] animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </motion.div>
      )}

      {/* COVER SCREEN - VINTAGE AIRMAIL ENVELOPE WITH REAL WAX SEAL */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="vintage-envelope-cover"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#29221b] p-4 sm:p-6 overflow-hidden"
          >
            {/* Background Texture with warm mood */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#d6b28d_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Vintage Airmail Envelope Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-full max-w-lg bg-[#fbf7f0] rounded-2xl shadow-2xl border-4 border-[#e0ceb5] overflow-hidden p-6 sm:p-10 flex flex-col items-center text-center"
              style={{
                backgroundImage: "linear-gradient(to bottom, #fcf9f2, #f5ebd9)"
              }}
            >
              {/* Vintage Postal Airmail Border Top Strip */}
              <div className="w-full h-3 mb-6 bg-[repeating-linear-gradient(45deg,#b94a48,#b94a48_12px,#fbf7f0_12px,#fbf7f0_24px,#3b5998_24px,#3b5998_36px,#fbf7f0_36px,#fbf7f0_48px)] rounded-t" />

              {/* Postal Stamp & Postmark */}
              <div className="w-full flex justify-between items-start mb-6">
                {/* Vintage Postmark Circle */}
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#8c6d53]/60 flex flex-col items-center justify-center text-[9px] font-mono text-[#8c6d53] rotate-[-12deg]">
                  <span>AIR MAIL</span>
                  <span className="font-bold">POSTAGE</span>
                  <span>2026</span>
                </div>

                {/* Postage Stamp */}
                <div className="w-16 h-20 border-2 border-dashed border-[#8c6d53] p-1 bg-[#ede0cb] shadow-sm rotate-[6deg] flex flex-col items-center justify-center text-center">
                  <Heart className="w-5 h-5 text-[#9e3a3a] fill-[#9e3a3a] mb-1" />
                  <span className="text-[8px] font-mono font-bold text-[#5c4434]">SPECIAL</span>
                  <span className="text-[7px] font-mono text-[#785b46]">EDITION</span>
                </div>
              </div>

              {/* Title & Couple Monogram */}
              <div className="space-y-2 mb-6">
                <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#8c6d53]">
                  WEDDING ANNOUNCEMENT &amp; DISPATCH
                </p>
                <h1 className="text-3xl sm:text-4xl text-[#3b2b20] font-serif italic tracking-wide">
                  {d.groomNickname} &amp; {d.brideNickname}
                </h1>
                <p className="text-xs font-mono tracking-widest text-[#7a604c]">
                  — {d.weddingDate} —
                </p>
              </div>

              {/* Recipient Letter Address */}
              <div className="w-full max-w-xs border-y border-[#d4be9f] py-4 my-2 text-center bg-[#fdfaf3]/60">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8c6d53] mb-1">
                  SPECIALLY DELIVERED TO:
                </p>
                <h2 className="text-xl font-serif font-bold text-[#3d2b1f]">
                  {currentGuest}
                </h2>
                <p className="text-[10px] font-mono text-[#8a705b] mt-1">
                  At Your Respected Residence
                </p>
              </div>

              {/* WAX SEAL TRIGGER BUTTON */}
              <div className="my-8 flex flex-col items-center">
                <motion.button
                  onClick={handleOpenInvitation}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isBreakingSeal ? { scale: [1, 1.2, 0], opacity: [1, 0.8, 0] } : {}}
                  transition={{ duration: 0.7 }}
                  className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#b52a2a] via-[#8c1818] to-[#590e0e] shadow-[0_10px_25px_rgba(140,24,24,0.5)] border-4 border-[#e86b6b]/40 flex flex-col items-center justify-center text-white cursor-pointer group"
                >
                  {/* Embossed Wax Seal Detail */}
                  <div className="w-16 h-16 rounded-full border border-dashed border-[#ffaaaa]/40 flex flex-col items-center justify-center">
                    <Feather className="w-5 h-5 text-[#ffdada] mb-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span className="text-[9px] font-mono font-bold tracking-widest text-[#ffebeb]">OPEN</span>
                  </div>
                </motion.button>

                <p className="text-xs font-mono tracking-wider text-[#8c6d53] mt-3">
                  {isBreakingSeal ? "Breaking Wax Seal..." : "Click Wax Seal to Open Letter"}
                </p>
              </div>

              {/* Bottom Airmail Border */}
              <div className="w-full h-3 mt-2 bg-[repeating-linear-gradient(45deg,#b94a48,#b94a48_12px,#fbf7f0_12px,#fbf7f0_24px,#3b5998_24px,#3b5998_36px,#fbf7f0_36px,#fbf7f0_48px)] rounded-b" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN INVITATION CONTENT: VINTAGE PARCHMENT LETTER */}
      {isOpen && (
        <div className="max-w-xl mx-auto px-6 py-12 space-y-24">

          {/* LETTER HEADER */}
          <section className="text-center pt-6 space-y-6 bg-[#fbf7ee] border-2 border-[#d6be9f] rounded-2xl p-8 sm:p-12 shadow-xl relative">
            {/* Vintage Corner Ornaments */}
            <div className="text-[#a68261] text-lg font-serif">❦ ❧ ❦</div>

            <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#8c6b4e]">
              A TENDER CORRESPONDENCE
            </p>

            <h1 className="text-4xl sm:text-5xl font-serif italic text-[#38281b]">
              {d.groomNickname} &amp; {d.brideNickname}
            </h1>

            <p className="text-sm italic text-[#574435] max-w-md mx-auto leading-relaxed border-y border-[#dfccb3] py-4">
              &quot;{d.quote}&quot;
            </p>

            {/* Vintage Framed Photo with Sepia Mood */}
            <div className="relative aspect-[4/5] w-full max-w-sm mx-auto p-3 bg-white shadow-lg border border-[#cfbaa0] rotate-[-1deg]">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={d.coverImage}
                  alt="Couple Vintage"
                  fill
                  className="object-cover filter sepia-[0.35] contrast-95"
                />
              </div>
              <p className="text-center text-[10px] font-mono text-[#8a6e54] mt-2 italic">
                A portrait of forever — {d.weddingDate}
              </p>
            </div>

            {/* Antique Countdown Clock */}
            <div className="pt-6">
              <p className="text-[11px] font-mono tracking-widest text-[#8a6c50] uppercase mb-3">
                Counting down to our joyful vows:
              </p>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs mx-auto">
                {[
                  { label: "DAYS", val: timeLeft.days },
                  { label: "HOURS", val: timeLeft.hours },
                  { label: "MINS", val: timeLeft.minutes },
                  { label: "SECS", val: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#f0e3ce] border border-[#cfb89a] p-2.5 rounded-lg text-center shadow-inner">
                    <span className="block text-2xl font-mono font-bold text-[#423122]">{String(item.val).padStart(2, "0")}</span>
                    <span className="text-[8px] font-mono text-[#785b44] uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: THE BRIDE & GROOM BIOGRAPHY */}
          <section className="space-y-12">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#8c6b4e]">
                THE PROTAGONISTS
              </span>
              <h2 className="text-3xl font-serif italic text-[#38281b] mt-1">United in Devotion</h2>
            </div>

            {/* Groom Card */}
            <div className="bg-[#fbf7ee] border border-[#d6be9f] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-md">
              <div className="relative w-36 h-44 border-4 border-white shadow-md bg-stone-200 overflow-hidden flex-shrink-0 rotate-[-2deg]">
                <Image
                  src={d.galleryImages[0] || d.coverImage}
                  alt={d.groomName}
                  fill
                  className="object-cover filter sepia-[0.2]"
                />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#947458] uppercase">THE GROOM</span>
                <h3 className="text-2xl font-serif text-[#36261a]">{d.groomName}</h3>
                <p className="text-xs font-serif italic text-[#635041] leading-relaxed">{d.groomParents}</p>
                <p className="text-[11px] font-mono text-[#8a6e55] pt-1">Gentleman of noble heart and virtue</p>
              </div>
            </div>

            {/* Bride Card */}
            <div className="bg-[#fbf7ee] border border-[#d6be9f] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row-reverse items-center gap-6 shadow-md">
              <div className="relative w-36 h-44 border-4 border-white shadow-md bg-stone-200 overflow-hidden flex-shrink-0 rotate-[2deg]">
                <Image
                  src={d.galleryImages[1] || d.coverImage}
                  alt={d.brideName}
                  fill
                  className="object-cover filter sepia-[0.2]"
                />
              </div>
              <div className="text-center sm:text-right space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#947458] uppercase">THE BRIDE</span>
                <h3 className="text-2xl font-serif text-[#36261a]">{d.brideName}</h3>
                <p className="text-xs font-serif italic text-[#635041] leading-relaxed">{d.brideParents}</p>
                <p className="text-[11px] font-mono text-[#8a6e55] pt-1">Lady of graceful spirit and gentle warmth</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: VINTAGE TELEGRAPH ITINERARY */}
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#8c6b4e]">
                OFFICIAL DISPATCH
              </span>
              <h2 className="text-3xl font-serif italic text-[#38281b] mt-1">Wedding Itinerary</h2>
            </div>

            {/* Telegram 1: Akad Nikah */}
            <div className="bg-[#fbf7ee] border-2 border-dashed border-[#bda080] rounded-xl p-6 relative shadow-md">
              <div className="flex justify-between items-center border-b border-[#d8c3aa] pb-3 mb-4">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#785b44]">TELEGRAM: MATRIMONY</span>
                <span className="text-xs font-mono text-[#4a3b2f] bg-[#eadecb] px-2 py-0.5 rounded">{d.akadTime}</span>
              </div>

              <div className="space-y-3">
                <h4 className="text-2xl font-serif text-[#38281b]">Sacred Ceremony / Akad</h4>
                <p className="text-xs font-mono text-[#695342] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8a6c50]" /> {d.akadDate}
                </p>
                <p className="text-sm font-serif font-bold text-[#3d2f23] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8a6c50]" /> {d.akadLocation}
                </p>
                <p className="text-xs font-serif text-[#6b5847] pl-6 italic">{d.akadAddress}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dfccb6] flex justify-end">
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#523e30] text-[#f7f2ea] text-xs font-mono tracking-wider rounded uppercase hover:bg-[#3d2e24] transition-colors"
                >
                  VIEW MAP LOCATION →
                </a>
              </div>
            </div>

            {/* Telegram 2: Reception */}
            <div className="bg-[#fbf7ee] border-2 border-dashed border-[#bda080] rounded-xl p-6 relative shadow-md">
              <div className="flex justify-between items-center border-b border-[#d8c3aa] pb-3 mb-4">
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#785b44]">TELEGRAM: CELEBRATION</span>
                <span className="text-xs font-mono text-[#4a3b2f] bg-[#eadecb] px-2 py-0.5 rounded">{d.resepsiTime}</span>
              </div>

              <div className="space-y-3">
                <h4 className="text-2xl font-serif text-[#38281b]">Evening Wedding Reception</h4>
                <p className="text-xs font-mono text-[#695342] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#8a6c50]" /> {d.resepsiDate}
                </p>
                <p className="text-sm font-serif font-bold text-[#3d2f23] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#8a6c50]" /> {d.resepsiLocation}
                </p>
                <p className="text-xs font-serif text-[#6b5847] pl-6 italic">{d.resepsiAddress}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#dfccb6] flex justify-end">
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#523e30] text-[#f7f2ea] text-xs font-mono tracking-wider rounded uppercase hover:bg-[#3d2e24] transition-colors"
                >
                  VIEW MAP LOCATION →
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 4: VINTAGE PALETTE DRESSCODE */}
          <section className="bg-[#fbf7ee] border border-[#d6be9f] rounded-2xl p-8 text-center space-y-6 shadow-md">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#8c6b4e]">
              DRESS CODE GUIDELINES
            </span>
            <h3 className="text-2xl font-serif italic text-[#38281b]">Vintage Earthy &amp; Muted Tones</h3>
            <p className="text-xs font-serif text-[#695342] max-w-sm mx-auto leading-relaxed italic">
              Guests are kindly invited to adorn themselves in vintage classics or warm earthy shades:
            </p>

            <div className="flex justify-center items-center gap-3 pt-2">
              {[
                { name: "TERRACOTTA", bg: "bg-[#b85b43]" },
                { name: "ANTIQUE OCHRE", bg: "bg-[#cf9e46]" },
                { name: "SAGE MOSS", bg: "bg-[#798e70]" },
                { name: "WARM SEPIA", bg: "bg-[#735843]" },
                { name: "LINEN CREAM", bg: "bg-[#eae0d0] border border-[#cfbaa0]" }
              ].map((swatch, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full shadow-inner ${swatch.bg}`} />
                  <span className="text-[8px] font-mono text-[#785c45]">{swatch.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: GALLERY ARCHIVE */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#8c6b4e]">
                MEMORABILIA
              </span>
              <h2 className="text-3xl font-serif italic text-[#38281b] mt-1">Keepsake Moments</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(d.galleryImages.length > 0 ? d.galleryImages : [d.coverImage, d.coverImage, d.coverImage, d.coverImage]).map((img, i) => (
                <div key={i} className="bg-white p-2.5 pb-6 rounded-lg shadow-md border border-[#d6be9f] rotate-[-1deg] hover:rotate-0 transition-transform">
                  <div className="relative aspect-[4/5] rounded overflow-hidden">
                    <Image
                      src={img}
                      alt={`Memory ${i}`}
                      fill
                      className="object-cover filter sepia-[0.3]"
                    />
                  </div>
                  <p className="text-[10px] font-mono text-[#8a6e55] text-center mt-2 italic">
                    Figure {i + 1}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: WEDDING GIFT PASSBOOK */}
          <section className="bg-[#fbf7ee] border-2 border-[#d6be9f] rounded-2xl p-8 text-center space-y-6 shadow-md">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#8c6b4e]">
              TOKEN OF LOVE
            </span>
            <h3 className="text-2xl font-serif italic text-[#38281b]">Digital Registry</h3>
            <p className="text-xs font-serif text-[#695342] max-w-sm mx-auto leading-relaxed italic">
              Your kind prayers and companionship are the finest gifts we could receive. For friends desiring to give a blessing, our registry is available below:
            </p>

            <div className="bg-[#f2e7d5] border border-[#cfb898] rounded-xl p-6 max-w-sm mx-auto text-center shadow-inner">
              <p className="text-xs font-mono font-bold text-[#5c4431] uppercase tracking-wider">{d.bankName}</p>
              <p className="text-xl font-mono font-bold text-[#38281b] tracking-widest my-2">{d.accountNumber}</p>
              <p className="text-xs font-serif text-[#785f4b] italic">Account Holder: {d.accountHolder}</p>

              <button
                onClick={copyAccount}
                className="mt-5 w-full py-2.5 bg-[#4f3c2f] text-[#f7f2ea] text-xs font-mono tracking-wider uppercase rounded hover:bg-[#382a20] transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "ACCOUNT NUMBER COPIED" : "COPY ACCOUNT NUMBER"}</span>
              </button>
            </div>
          </section>

          {/* SECTION 7: GUEST DISPATCH & TELEGRAM MESSAGES */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#8c6b4e]">
                CORRESPONDENCE
              </span>
              <h2 className="text-3xl font-serif italic text-[#38281b] mt-1">Send Warm Wishes</h2>
            </div>

            <form onSubmit={submitWish} className="bg-[#fbf7ee] border border-[#d6be9f] rounded-2xl p-6 space-y-4 shadow-md">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#735741] mb-1">
                  SENDER NAME
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-[#fbf7ee] border border-[#cfbaa0] rounded-lg px-3.5 py-2.5 text-xs text-[#38281b] font-serif focus:outline-none focus:border-[#735741]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#735741] mb-1">
                  ATTENDANCE CONFIRMATION
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Hadir", "Tidak Hadir"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setInputStatus(status)}
                      className={`py-2 text-xs font-mono rounded-lg transition-colors border ${
                        inputStatus === status 
                          ? "bg-[#523e30] text-[#f7f2ea] border-[#523e30]" 
                          : "border-[#cfbaa0] text-[#735741] hover:bg-[#f0e3ce]"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#735741] mb-1">
                  YOUR WISHES &amp; BLESSINGS
                </label>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  rows={3}
                  placeholder="Pen a heartfelt message..."
                  className="w-full bg-[#fbf7ee] border border-[#cfbaa0] rounded-lg p-3 text-xs text-[#38281b] font-serif focus:outline-none focus:border-[#735741]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#523e30] text-[#f7f2ea] text-xs font-mono uppercase tracking-widest rounded-lg hover:bg-[#3d2e24] transition-colors"
              >
                DISPATCH TELEGRAM
              </button>
            </form>

            {/* Wishes Feed */}
            <div className="space-y-3 pt-3">
              {wishes.map((w, idx) => (
                <div key={idx} className="bg-[#fbf7ee] border border-[#dfccb5] rounded-xl p-4 shadow-sm space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-[#423122]">{w.name}</span>
                    <span className="text-[10px] text-[#8c6b4e]">{w.time}</span>
                  </div>
                  <p className="text-xs font-serif italic text-[#614e3e] leading-relaxed">&ldquo;{w.message}&rdquo;</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-center pt-12 border-t border-[#dfccb6] space-y-2">
            <h4 className="text-2xl font-serif italic text-[#38281b]">{d.groomNickname} &amp; {d.brideNickname}</h4>
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#8c6b4e] uppercase">
              WITH ETERNAL GRATITUDE FOR YOUR LOVE &amp; PRAYERS
            </p>
            <p className="text-[9px] font-mono text-[#a88d74] pt-4">IKUTSENENG VINTAGE DISPATCH // MMXXVI</p>
          </footer>

        </div>
      )}
    </div>
  );
}
