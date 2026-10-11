"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Volume2, VolumeX, ArrowDown, CalendarPlus, Sparkles, QrCode
} from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";

interface ThemeProps {
  data?: Partial<InvitationData>;
  guestName?: string;
}

export default function MinimalistModernTheme({ 
  data = {}, 
  guestName = "Tamu Undangan" 
}: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(guestName);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 64,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  const [copied, setCopied] = useState(false);
  const [wishes, setWishes] = useState([
    {
      name: "Adrian & Felicia",
      status: "Hadir",
      message: "Perfection in every detail! So happy for you two, wishing you an extraordinary journey ahead.",
      time: "2 jam lalu"
    },
    {
      name: "Jonathan Surya",
      status: "Hadir",
      message: "Congrats on your big day! Looking forward to celebrating this stylish moment together.",
      time: "5 jam lalu"
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
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
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
    <div className="relative min-h-screen bg-[#0d0e11] text-[#f2f2f4] font-sans antialiased selection:bg-neutral-800 selection:text-white">
      {/* Hidden Audio */}
      <audio ref={audioRef} src={d.musicUrl} loop preload="auto" />

      {/* Floating Modern Audio Pill */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={toggleMusic}
            className="flex items-center gap-2 bg-neutral-900/90 text-neutral-200 border border-neutral-700/80 px-3.5 py-2 rounded-full shadow-2xl backdrop-blur-md text-xs tracking-wider uppercase hover:border-white transition-all group"
          >
            <div className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-400 animate-ping" : "bg-neutral-500"}`} />
            <span className="font-mono text-[10px]">{isPlaying ? "AUDIO ON" : "PAUSED"}</span>
            {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </motion.div>
      )}

      {/* COVER SCREEN - VOGUE / KINFOLK ARCHITECTURAL EDITORIAL */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="cover-screen"
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0a0a0c] p-6 sm:p-12 overflow-hidden text-neutral-100"
          >
            {/* Background Image with Crisp Contrast */}
            <div className="absolute inset-0 z-0">
              <Image
                src={d.coverImage}
                alt="Cover"
                fill
                priority
                className="object-cover opacity-35 filter grayscale contrast-125 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/80 via-[#0a0a0c]/40 to-[#0a0a0c]" />
            </div>

            {/* Top Grid Info */}
            <div className="relative z-10 flex justify-between items-start border-b border-neutral-800 pb-4">
              <div>
                <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-neutral-400">THE WEDDING CEREMONY</p>
                <p className="text-xs font-mono text-neutral-300 mt-1">VOL. MMXXVI</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono tracking-[0.2em] text-neutral-400">EST. {d.weddingDate.slice(-4)}</p>
                <p className="text-xs font-mono text-neutral-300 mt-1">EDITION 01</p>
              </div>
            </div>

            {/* Center Editorial Title */}
            <div className="relative z-10 my-auto text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="inline-block text-[11px] font-mono tracking-[0.4em] uppercase text-neutral-400 mb-6 border border-neutral-700/80 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  PRIVATE INVITATION
                </span>
                
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight font-serif text-white">
                  {d.groomNickname} <span className="font-sans font-thin text-neutral-500">&amp;</span> {d.brideNickname}
                </h1>

                <div className="w-16 h-px bg-neutral-600 mx-auto my-6" />

                <p className="text-xs uppercase tracking-[0.35em] text-neutral-300 font-mono">
                  {d.weddingDate}
                </p>
              </motion.div>
            </div>

            {/* Bottom Invitation Pass & Trigger */}
            <div className="relative z-10 border-t border-neutral-800 pt-6">
              <div className="max-w-md mx-auto flex flex-col items-center text-center">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 mb-1">
                  CORDIALLY INVITED TO
                </p>
                <h3 className="text-lg font-serif tracking-wide text-white mb-6">
                  {currentGuest}
                </h3>

                <button
                  onClick={handleOpenInvitation}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black text-xs font-mono font-medium tracking-[0.25em] uppercase hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 group shadow-2xl"
                >
                  <span>ENTER INVITATION</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN INVITATION CONTENT */}
      {isOpen && (
        <div className="max-w-xl mx-auto px-6 py-16 space-y-28">

          {/* SECTION 1: EDITORIAL HERO */}
          <section className="text-center pt-8">
            <div className="flex justify-between items-center text-[10px] font-mono tracking-[0.3em] text-neutral-500 border-b border-neutral-800 pb-3 mb-12">
              <span>SPECIAL ISSUE</span>
              <span>NO. 001 // ARCHIVE</span>
              <span>2026</span>
            </div>

            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-4">
              TOGETHER WITH THEIR FAMILIES
            </p>

            <h2 className="text-4xl sm:text-6xl font-light font-serif tracking-tight text-white mb-6">
              {d.groomNickname} &amp; {d.brideNickname}
            </h2>

            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed italic font-serif">
              &quot;{d.quote}&quot;
            </p>

            {/* Large Minimalist Frame Photo */}
            <div className="mt-12 relative aspect-[3/4] w-full max-w-md mx-auto border border-neutral-800 overflow-hidden bg-neutral-900">
              <Image
                src={d.coverImage}
                alt="Couple"
                fill
                className="object-cover filter grayscale contrast-110"
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/70 backdrop-blur-md px-3.5 py-2 border border-neutral-800 text-[10px] font-mono text-neutral-300">
                <span>PORTRAIT // ARCHIVE</span>
                <span>{d.weddingDate}</span>
              </div>
            </div>

            {/* Minimalist Countdown Timer */}
            <div className="mt-12 grid grid-cols-4 gap-3 max-w-xs mx-auto">
              {[
                { label: "DAYS", value: timeLeft.days },
                { label: "HOURS", value: timeLeft.hours },
                { label: "MINS", value: timeLeft.minutes },
                { label: "SECS", value: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="border border-neutral-800 bg-neutral-950/70 p-3 text-center">
                  <span className="block text-2xl font-mono font-light text-white">{String(item.value).padStart(2, "0")}</span>
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: THE COUPLE PROFILES */}
          <section className="space-y-16">
            <div className="text-center">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 border border-neutral-800 px-4 py-1">
                THE COUPLE
              </span>
            </div>

            {/* Groom Profile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center border border-neutral-800 p-6 sm:p-8 bg-neutral-950">
              <div className="relative aspect-[4/5] w-full border border-neutral-800 overflow-hidden">
                <Image
                  src={d.galleryImages[0] || d.coverImage}
                  alt={d.groomName}
                  fill
                  className="object-cover filter grayscale"
                />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">THE GROOM</span>
                <h3 className="text-2xl font-serif text-white">{d.groomName}</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">{d.groomParents}</p>
                <div className="pt-2">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 border-b border-neutral-700 pb-1">
                    @{d.groomNickname.toLowerCase()}.arch
                  </span>
                </div>
              </div>
            </div>

            {/* Bride Profile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center border border-neutral-800 p-6 sm:p-8 bg-neutral-950">
              <div className="order-2 sm:order-1 space-y-3">
                <span className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">THE BRIDE</span>
                <h3 className="text-2xl font-serif text-white">{d.brideName}</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">{d.brideParents}</p>
                <div className="pt-2">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 border-b border-neutral-700 pb-1">
                    @{d.brideNickname.toLowerCase()}.studio
                  </span>
                </div>
              </div>
              <div className="order-1 sm:order-2 relative aspect-[4/5] w-full border border-neutral-800 overflow-hidden">
                <Image
                  src={d.galleryImages[1] || d.coverImage}
                  alt={d.brideName}
                  fill
                  className="object-cover filter grayscale"
                />
              </div>
            </div>
          </section>

          {/* SECTION 3: EVENT PASS & SCHEDULE */}
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 border border-neutral-800 px-4 py-1">
                ITINERARY &amp; ACCESS
              </span>
              <h2 className="text-3xl font-serif text-white mt-4">Order of Events</h2>
            </div>

            {/* VIP PASS CARD 1: AKAD / CEREMONY */}
            <div className="border border-neutral-800 bg-neutral-950 p-6 relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-neutral-800/80 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">SECTION 01</span>
                  <h4 className="text-xl font-serif text-white mt-1">Holy Matrimony / Akad</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-300">{d.akadTime}</span>
                </div>
              </div>

              <div className="py-6 space-y-3">
                <p className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" /> {d.akadDate}
                </p>
                <p className="text-xs text-neutral-300 font-medium flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" /> {d.akadLocation}
                </p>
                <p className="text-[11px] text-neutral-500 pl-5 leading-relaxed">{d.akadAddress}</p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                  <QrCode className="w-4 h-4 text-neutral-400" />
                  <span>PASS #AKAD-2026</span>
                </div>
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono tracking-widest uppercase border border-neutral-700 px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
                >
                  GOOGLE MAPS →
                </a>
              </div>
            </div>

            {/* VIP PASS CARD 2: RECEPTION */}
            <div className="border border-neutral-800 bg-neutral-950 p-6 relative overflow-hidden">
              <div className="flex justify-between items-start border-b border-neutral-800/80 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">SECTION 02</span>
                  <h4 className="text-xl font-serif text-white mt-1">Wedding Reception</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-300">{d.resepsiTime}</span>
                </div>
              </div>

              <div className="py-6 space-y-3">
                <p className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" /> {d.resepsiDate}
                </p>
                <p className="text-xs text-neutral-300 font-medium flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" /> {d.resepsiLocation}
                </p>
                <p className="text-[11px] text-neutral-500 pl-5 leading-relaxed">{d.resepsiAddress}</p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                  <QrCode className="w-4 h-4 text-neutral-400" />
                  <span>PASS #RECEPTION-2026</span>
                </div>
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono tracking-widest uppercase border border-neutral-700 px-3 py-1.5 hover:bg-white hover:text-black transition-colors"
                >
                  GOOGLE MAPS →
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 4: MINIMALIST DRESSCODE */}
          <section className="text-center space-y-6 border border-neutral-800 p-8 bg-neutral-950">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">
              ATTIRE SPECIFICATION
            </span>
            <h3 className="text-2xl font-serif text-white">Monochrome &amp; Earth Tones</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
              We respectfully request our distinguished guests to wear black tie, monochrome or natural subtle shades.
            </p>

            <div className="flex justify-center items-center gap-4 pt-2">
              {[
                { name: "NOIR", color: "bg-black border border-neutral-700" },
                { name: "CHARCOAL", color: "bg-neutral-800" },
                { name: "SLATE", color: "bg-neutral-600" },
                { name: "IVORY", color: "bg-[#e5e5e0]" },
                { name: "BONE", color: "bg-[#f5f5f0]" }
              ].map((swatch, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${swatch.color}`} />
                  <span className="text-[9px] font-mono text-neutral-500">{swatch.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: GALLERY */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 border border-neutral-800 px-4 py-1">
                LOOKBOOK
              </span>
              <h2 className="text-3xl font-serif text-white mt-4">Selected Frames</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(d.galleryImages.length > 0 ? d.galleryImages : [d.coverImage, d.coverImage, d.coverImage, d.coverImage]).map((img, i) => (
                <div key={i} className="relative aspect-[4/5] border border-neutral-800 overflow-hidden bg-neutral-900 group">
                  <Image
                    src={img}
                    alt={`Gallery ${i}`}
                    fill
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-neutral-400 bg-black/60 px-1.5 py-0.5">
                    {`0${i + 1}`}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: DIGITAL REGISTRY */}
          <section className="border border-neutral-800 p-8 bg-neutral-950 text-center space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">
              WEDDING GIFT
            </span>
            <h3 className="text-2xl font-serif text-white">Digital Envelope</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Your presence and prayers are our greatest blessing. For those who wish to extend a token of love, digital registry is provided below:
            </p>

            <div className="border border-neutral-800 p-6 max-w-sm mx-auto bg-black text-left">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
                <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">{d.bankName}</span>
                <span className="text-[10px] font-mono text-neutral-500">ELECTRONIC TRANSFER</span>
              </div>
              <p className="text-lg font-mono tracking-wider text-neutral-200">{d.accountNumber}</p>
              <p className="text-xs text-neutral-400 mt-1 uppercase font-mono">A.N. {d.accountHolder}</p>

              <button
                onClick={copyAccount}
                className="mt-6 w-full py-2.5 border border-neutral-700 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY ACCOUNT NUMBER"}</span>
              </button>
            </div>
          </section>

          {/* SECTION 7: RSVP & MESSAGES */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400 border border-neutral-800 px-4 py-1">
                GUEST REGISTRATION
              </span>
              <h2 className="text-3xl font-serif text-white mt-4">Confirm Attendance</h2>
            </div>

            <form onSubmit={submitWish} className="border border-neutral-800 p-6 bg-neutral-950 space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Insert your full name"
                  className="w-full bg-black border border-neutral-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  CONFIRMATION
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Hadir", "Tidak Hadir"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setInputStatus(status)}
                      className={`py-2 text-xs font-mono uppercase tracking-wider border ${
                        inputStatus === status 
                          ? "bg-white text-black border-white" 
                          : "border-neutral-800 text-neutral-400 hover:border-neutral-600"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                  MESSAGE &amp; PRAYERS
                </label>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  rows={3}
                  placeholder="Leave warm thoughts for the couple..."
                  className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:outline-none focus:border-white font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black text-xs font-mono font-medium tracking-[0.2em] uppercase hover:bg-neutral-200 transition-colors"
              >
                SUBMIT CONFIRMATION
              </button>
            </form>

            {/* List of Wishes */}
            <div className="space-y-3 pt-4">
              {wishes.map((w, idx) => (
                <div key={idx} className="border border-neutral-900 bg-neutral-950 p-4 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="font-semibold text-white uppercase">{w.name}</span>
                    <span className="text-neutral-500">{w.time}</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">{w.message}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-center pt-16 border-t border-neutral-900 space-y-2">
            <h4 className="text-xl font-serif text-white">{d.groomNickname} &amp; {d.brideNickname}</h4>
            <p className="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
              THANK YOU FOR BEING PART OF OUR CELEBRATION
            </p>
            <p className="text-[9px] font-mono text-neutral-600 pt-6">IKUTSENENG STUDIO // MMXXVI</p>
          </footer>

        </div>
      )}
    </div>
  );
}
