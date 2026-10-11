"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Volume2, VolumeX, Newspaper, BookOpen, Sun, Sparkles
} from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";

interface ThemeProps {
  data?: Partial<InvitationData>;
  guestName?: string;
}

export default function NewspaperPressTheme({ 
  data = {}, 
  guestName = "Tamu Undangan" 
}: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnfolding, setIsUnfolding] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(guestName);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 82,
    hours: 10,
    minutes: 15,
    seconds: 40
  });

  const [copied, setCopied] = useState(false);
  const [wishes, setWishes] = useState([
    {
      name: "The Chief Editor",
      status: "Hadir",
      message: "Front-page worthy romance! Wishing the happy couple an eternal lifetime of love and joy.",
      time: "2 jam lalu"
    },
    {
      name: "Grace & William",
      status: "Hadir",
      message: "What a splendid love story! Congratulations to the newlyweds on this timeless milestone.",
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
    setIsUnfolding(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }, 950);
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
    <div className="relative min-h-screen bg-[#f3efe6] text-[#211e1b] font-serif antialiased selection:bg-[#211e1b] selection:text-[#f3efe6]">
      {/* Background Vintage Jazz Audio */}
      <audio ref={audioRef} src={d.musicUrl} loop preload="auto" />

      {/* Floating Press Audio Badge */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={toggleMusic}
            className="flex items-center gap-2 bg-[#211e1b] text-[#f3efe6] border border-[#d6cfc2] px-4 py-2 rounded-full shadow-2xl text-xs font-mono tracking-wider uppercase hover:bg-black transition-all"
          >
            <Newspaper className="w-3.5 h-3.5 text-[#e0b784]" />
            <span className="text-[10px]">{isPlaying ? "PRESS RADIO ON" : "MUTED"}</span>
            {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </motion.div>
      )}

      {/* FOLDED NEWSPAPER FRONT-PAGE COVER */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="newspaper-folded-cover"
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#292623] p-4 sm:p-6 overflow-hidden"
          >
            {/* Folded Newspaper Card */}
            <motion.div 
              animate={isUnfolding ? { scaleY: [1, 1.05, 0.2], opacity: [1, 1, 0] } : {}}
              transition={{ duration: 0.9 }}
              className="relative w-full max-w-md bg-[#faf7f0] border-4 border-[#2b2723] p-6 sm:p-8 shadow-2xl rounded-sm flex flex-col justify-between"
              style={{
                backgroundImage: "linear-gradient(to bottom, #fcf9f2, #f5ebd9)"
              }}
            >
              {/* Newspaper Header Bar */}
              <div className="border-b-2 border-black pb-2 text-center">
                <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase text-neutral-600 border-b border-black/40 pb-1 mb-2">
                  <span>FINAL EDITION</span>
                  <span>SPECIAL RELEASE</span>
                  <span>FREE PRESS</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black font-serif uppercase tracking-tight text-black">
                  THE WEDDING CHRONICLE
                </h1>
                <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-700 mt-1">
                  VOL. LXXIV NO. 14 — {d.weddingDate.toUpperCase()}
                </p>
              </div>

              {/* Front Page Headline & Photo */}
              <div className="my-6 space-y-4">
                <div className="text-center">
                  <span className="inline-block bg-black text-white text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 mb-2">
                    EXCLUSIVE HEADLINE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight text-neutral-900">
                    &quot;{d.groomNickname.toUpperCase()} &amp; {d.brideNickname.toUpperCase()} ANNOUNCE THEIR SACRED UNION&quot;
                  </h2>
                </div>

                <div className="relative aspect-[4/3] w-full border-2 border-black overflow-hidden bg-stone-300">
                  <Image
                    src={d.coverImage}
                    alt="Newspaper Headline"
                    fill
                    priority
                    className="object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute bottom-1 right-2 bg-white/90 px-2 py-0.5 text-[8px] font-mono text-black">
                    PRESS PHOTO // 2026
                  </div>
                </div>

                {/* Recipient Dispatch Box */}
                <div className="border border-black p-3 text-center bg-[#fdfbf6]">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-600">DELIVERED COURTESY TO:</p>
                  <p className="text-base font-bold font-serif text-black">{currentGuest}</p>
                </div>
              </div>

              {/* Unfold Button */}
              <button
                onClick={handleOpenInvitation}
                className="w-full py-3.5 bg-black text-white text-xs font-mono font-bold tracking-[0.25em] uppercase hover:bg-neutral-800 transition-colors shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>UNFOLD FULL BROADSHEET</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL BROADSHEET NEWSPAPER LAYOUT */}
      {isOpen && (
        <div className="max-w-2xl mx-auto px-4 sm:px-8 py-10 space-y-16">

          {/* NEWSPAPER MASTHEAD */}
          <header className="border-b-4 border-black pb-4 text-center">
            <div className="flex justify-between items-center text-[10px] font-mono uppercase border-b border-black pb-1 mb-3 text-neutral-700">
              <span>CIRCULATION: PRIVATE</span>
              <span className="font-bold">FORECAST: 100% CHANCE OF LOVE</span>
              <span>EST. 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-black font-serif">
              THE WEDDING CHRONICLE
            </h1>

            <div className="flex justify-between items-center text-[10px] font-mono uppercase border-t border-b border-black py-1.5 mt-3 text-neutral-800">
              <span>SPECIAL COMMEMORATIVE EDITION</span>
              <span>{d.weddingDate.toUpperCase()}</span>
              <span>PRICE: YOUR BLESSING</span>
            </div>
          </header>

          {/* FRONT PAGE LEAD STORY (TWO-COLUMN NEWSPAPER BROADSHEET GRID) */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono font-bold tracking-widest uppercase bg-black text-white px-3 py-1">
                PAGE 1 // THE LEAD STORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif mt-4 text-black leading-tight">
                Two Hearts Vow Forever in a Ceremony of Pure Devotion
              </h2>
              <p className="text-xs font-mono text-neutral-600 mt-2">
                REPORTED BY FAMILY CORRESPONDENT — EDITORIAL ARCHIVE
              </p>
            </div>

            {/* Large Print Hero Photo */}
            <div className="border-2 border-black p-2 bg-white">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={d.coverImage}
                  alt="Couple Front Page"
                  fill
                  className="object-cover filter grayscale contrast-115"
                />
              </div>
              <p className="text-[10px] font-mono text-center text-neutral-600 mt-2 italic">
                Fig. 1 — {d.groomName} and {d.brideName} captured in an intimate portrait ahead of their solemn vow exchange.
              </p>
            </div>

            {/* Broadsheet Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-800 leading-relaxed font-serif text-justify border-y-2 border-black py-6">
              <div>
                <p>
                  <span className="float-left text-4xl font-black font-serif leading-none pr-2 pt-1">I</span>
                  n what friends and family describe as the most eagerly awaited union of the season, {d.groomName} and {d.brideName} will exchange solemn promises before honored witnesses.
                </p>
                <p className="mt-3">
                  &ldquo;{d.quote}&rdquo; the couple remarked in an exclusive statement shared on this momentous publication.
                </p>
              </div>
              <div>
                <p>
                  Celebrations will encompass both the sacred holy matrimony and an evening banquet filled with gratitude, music, and joyful companionship.
                </p>
                <p className="mt-3 italic font-serif">
                  Distinguished guests are cordially summoned to witness this eternal milestone and pen their felicitations in the registry section.
                </p>
              </div>
            </div>

            {/* Countdown Clock - Newspaper Box */}
            <div className="border border-black p-4 bg-white text-center">
              <p className="text-[10px] font-mono uppercase tracking-widest font-bold text-neutral-700 mb-2">
                PRESS TIME TO CEREMONY COUNTDOWN
              </p>
              <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto font-mono">
                {[
                  { label: "DAYS", val: timeLeft.days },
                  { label: "HOURS", val: timeLeft.hours },
                  { label: "MINS", val: timeLeft.minutes },
                  { label: "SECS", val: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="border border-black p-2 bg-[#fcfbf7]">
                    <span className="block text-xl font-bold text-black">{String(item.val).padStart(2, "0")}</span>
                    <span className="text-[8px] text-neutral-600 uppercase">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PAGE 2: THE BRIDE & GROOM PROFILES (INTERVIEW STYLE) */}
          <section className="space-y-8 border-t-4 border-black pt-8">
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
              <span className="text-xs font-mono font-bold tracking-widest uppercase">PAGE 2 // WHO&apos;S WHO</span>
              <span className="text-[10px] font-mono text-neutral-600">THE PROTAGONISTS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Groom */}
              <div className="border border-black p-4 bg-white space-y-3">
                <span className="text-[9px] font-mono uppercase bg-black text-white px-2 py-0.5">THE GROOM</span>
                <div className="relative aspect-[4/5] w-full border border-black overflow-hidden">
                  <Image
                    src={d.galleryImages[0] || d.coverImage}
                    alt={d.groomName}
                    fill
                    className="object-cover filter grayscale contrast-110"
                  />
                </div>
                <h3 className="text-xl font-bold font-serif text-black">{d.groomName}</h3>
                <p className="text-xs text-neutral-700 italic">{d.groomParents}</p>
                <p className="text-[10px] font-mono text-neutral-500 pt-1">CORRESPONDENCE: @{d.groomNickname.toLowerCase()}</p>
              </div>

              {/* Bride */}
              <div className="border border-black p-4 bg-white space-y-3">
                <span className="text-[9px] font-mono uppercase bg-black text-white px-2 py-0.5">THE BRIDE</span>
                <div className="relative aspect-[4/5] w-full border border-black overflow-hidden">
                  <Image
                    src={d.galleryImages[1] || d.coverImage}
                    alt={d.brideName}
                    fill
                    className="object-cover filter grayscale contrast-110"
                  />
                </div>
                <h3 className="text-xl font-bold font-serif text-black">{d.brideName}</h3>
                <p className="text-xs text-neutral-700 italic">{d.brideParents}</p>
                <p className="text-[10px] font-mono text-neutral-500 pt-1">CORRESPONDENCE: @{d.brideNickname.toLowerCase()}</p>
              </div>
            </div>
          </section>

          {/* PAGE 3: OFFICIAL GAZETTE (TIMETABLE & ITINERARY) */}
          <section className="space-y-6 border-t-4 border-black pt-8">
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
              <span className="text-xs font-mono font-bold tracking-widest uppercase">PAGE 3 // OFFICIAL GAZETTE</span>
              <span className="text-[10px] font-mono text-neutral-600">SCHEDULE OF CEREMONIES</span>
            </div>

            <div className="space-y-4">
              {/* Akad Event Gazette */}
              <div className="border-2 border-black p-5 bg-white space-y-3">
                <div className="flex justify-between items-start border-b border-black pb-2">
                  <div>
                    <span className="text-[9px] font-mono uppercase font-bold text-neutral-600">BULLETIN 01</span>
                    <h4 className="text-xl font-bold font-serif text-black">Holy Matrimony / Akad</h4>
                  </div>
                  <span className="text-xs font-mono font-bold border border-black px-2 py-1">{d.akadTime}</span>
                </div>
                <div className="text-xs text-neutral-800 space-y-1">
                  <p className="font-bold flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {d.akadDate}</p>
                  <p className="font-medium flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {d.akadLocation}</p>
                  <p className="text-neutral-600 pl-5">{d.akadAddress}</p>
                </div>
                <div className="pt-2 text-right">
                  <a
                    href={d.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] font-mono font-bold uppercase border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
                  >
                    DISPATCH LOCATION MAP →
                  </a>
                </div>
              </div>

              {/* Reception Event Gazette */}
              <div className="border-2 border-black p-5 bg-white space-y-3">
                <div className="flex justify-between items-start border-b border-black pb-2">
                  <div>
                    <span className="text-[9px] font-mono uppercase font-bold text-neutral-600">BULLETIN 02</span>
                    <h4 className="text-xl font-bold font-serif text-black">Evening Reception Banquet</h4>
                  </div>
                  <span className="text-xs font-mono font-bold border border-black px-2 py-1">{d.resepsiTime}</span>
                </div>
                <div className="text-xs text-neutral-800 space-y-1">
                  <p className="font-bold flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {d.resepsiDate}</p>
                  <p className="font-medium flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {d.resepsiLocation}</p>
                  <p className="text-neutral-600 pl-5">{d.resepsiAddress}</p>
                </div>
                <div className="pt-2 text-right">
                  <a
                    href={d.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[10px] font-mono font-bold uppercase border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
                  >
                    DISPATCH LOCATION MAP →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* PAGE 4: CLASSIFIEDS & DIGITAL REGISTRY */}
          <section className="space-y-6 border-t-4 border-black pt-8">
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
              <span className="text-xs font-mono font-bold tracking-widest uppercase">PAGE 4 // CLASSIFIEDS</span>
              <span className="text-[10px] font-mono text-neutral-600">GIFTS &amp; TRIBUTES</span>
            </div>

            <div className="border border-black p-6 bg-white text-center space-y-4">
              <span className="text-[9px] font-mono uppercase tracking-widest bg-black text-white px-2 py-0.5">
                OFFICIAL REGISTRY NOTICE
              </span>
              <h3 className="text-2xl font-bold font-serif text-black">Wedding Gift Pass</h3>
              <p className="text-xs text-neutral-700 max-w-md mx-auto leading-relaxed">
                Your blessing and warm attendance are the true wealth of our celebration. For kin desiring to extend a digital gift:
              </p>

              <div className="border border-black p-4 max-w-sm mx-auto bg-[#faf8f4] text-center">
                <p className="text-xs font-mono font-bold uppercase">{d.bankName}</p>
                <p className="text-xl font-mono font-bold tracking-wider my-2">{d.accountNumber}</p>
                <p className="text-xs font-serif text-neutral-600">A.N. {d.accountHolder}</p>

                <button
                  onClick={copyAccount}
                  className="mt-4 w-full py-2 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "ACCOUNT RECORD COPIED" : "COPY ACCOUNT NUMBER"}</span>
                </button>
              </div>
            </div>
          </section>

          {/* PAGE 5: LETTERS TO THE EDITOR (RSVP & WISHES) */}
          <section className="space-y-6 border-t-4 border-black pt-8">
            <div className="flex justify-between items-center border-b-2 border-black pb-2">
              <span className="text-xs font-mono font-bold tracking-widest uppercase">PAGE 5 // LETTERS TO THE EDITOR</span>
              <span className="text-[10px] font-mono text-neutral-600">GUEST CORRESPONDENCE</span>
            </div>

            <form onSubmit={submitWish} className="border-2 border-black p-6 bg-white space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase font-bold tracking-wider mb-1">
                  WRITER&apos;S NAME
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Insert your signature name"
                  className="w-full border border-black p-2.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase font-bold tracking-wider mb-1">
                  ATTENDANCE STATUS
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Hadir", "Tidak Hadir"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setInputStatus(status)}
                      className={`py-2 text-xs font-mono uppercase font-bold border border-black ${
                        inputStatus === status ? "bg-black text-white" : "hover:bg-neutral-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase font-bold tracking-wider mb-1">
                  LETTER TO THE NEWLYWEDS
                </label>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  rows={3}
                  placeholder="Pen your message for the press column..."
                  className="w-full border border-black p-2.5 text-xs font-serif focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white text-xs font-mono uppercase font-bold tracking-widest hover:bg-neutral-800 transition-colors"
              >
                PUBLISH LETTER TO COLUMN
              </button>
            </form>

            {/* Published Column Feed */}
            <div className="space-y-3 pt-2">
              {wishes.map((w, idx) => (
                <div key={idx} className="border border-black p-3.5 bg-white space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="font-bold uppercase text-black">{w.name}</span>
                    <span className="text-neutral-500">{w.time}</span>
                  </div>
                  <p className="text-xs font-serif text-neutral-800 italic leading-relaxed">&ldquo;{w.message}&rdquo;</p>
                </div>
              ))}
            </div>
          </section>

          {/* NEWSPAPER FOOTER */}
          <footer className="border-t-4 border-black pt-8 pb-12 text-center space-y-2">
            <h4 className="text-2xl font-black font-serif uppercase tracking-tight">{d.groomNickname} &amp; {d.brideNickname}</h4>
            <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-600">
              PRINTED &amp; DISPATCHED BY IKUTSENENG PRESS // SPECIAL ARCHIVE MMXXVI
            </p>
            <p className="text-[9px] font-mono text-neutral-500 pt-4">ALL RIGHTS RESERVED // LOVE CONQUERS ALL</p>
          </footer>

        </div>
      )}
    </div>
  );
}
