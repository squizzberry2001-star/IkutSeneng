"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Volume2, VolumeX, Clapperboard, Film, Ticket, Star, Sparkles
} from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";

interface ThemeProps {
  data?: Partial<InvitationData>;
  guestName?: string;
}

export default function CinemaPremiereTheme({ 
  data = {}, 
  guestName = "Tamu Undangan" 
}: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTearingTicket, setIsTearingTicket] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(guestName);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 56,
    hours: 20,
    minutes: 44,
    seconds: 18
  });

  const [copied, setCopied] = useState(false);
  const [wishes, setWishes] = useState([
    {
      name: "Film Critic Association",
      status: "Hadir",
      rating: 5,
      message: "★★★★★ 5/5 Stars! An absolute masterpiece of love. Can't wait to attend the red carpet event!",
      time: "2 jam lalu"
    },
    {
      name: "Marcus & Olivia",
      status: "Hadir",
      rating: 5,
      message: "The greatest love story ever produced! Heartiest congratulations to both stars.",
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
    setIsTearingTicket(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }, 1000);
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
        rating: 5,
        message: inputMessage,
        time: "Baru saja"
      },
      ...wishes
    ]);
    setInputName("");
    setInputMessage("");
  };

  return (
    <div className="relative min-h-screen bg-[#0c0a09] text-[#f5f5f4] font-sans antialiased selection:bg-[#f59e0b] selection:text-black">
      {/* Background Cinematic Soundtrack */}
      <audio ref={audioRef} src={d.musicUrl} loop preload="auto" />

      {/* Floating Cinema Audio Pill */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={toggleMusic}
            className="flex items-center gap-2 bg-[#1c1917]/95 text-[#fbbf24] border border-[#f59e0b]/50 px-4 py-2.5 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.25)] text-xs tracking-wider uppercase backdrop-blur-md hover:bg-black transition-all"
          >
            <Clapperboard className="w-4 h-4 text-[#fbbf24] animate-bounce" />
            <span className="text-[10px] font-mono">{isPlaying ? "OST PLAYING" : "PAUSED"}</span>
            {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </motion.div>
      )}

      {/* CINEMA RED VELVET CURTAIN & PERFORATED GOLDEN TICKET OPENING */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed inset-0 z-50 flex overflow-hidden">
            {/* Red Curtain Left (slides left) */}
            <motion.div
              animate={isTearingTicket ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
              className="w-1/2 h-full bg-[#5a0c10] border-r-2 border-[#f59e0b]/30 z-20 shadow-2xl relative"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, #5a0c10, #5a0c10 20px, #42080b 20px, #42080b 40px)"
              }}
            />

            {/* Red Curtain Right (slides right) */}
            <motion.div
              animate={isTearingTicket ? { x: "100%" } : { x: 0 }}
              transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
              className="w-1/2 h-full bg-[#5a0c10] border-l-2 border-[#f59e0b]/30 z-20 shadow-2xl relative"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, #5a0c10, #5a0c10 20px, #42080b 20px, #42080b 40px)"
              }}
            />

            {/* Center Admission Ticket */}
            <motion.div
              animate={isTearingTicket ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-30 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-sm bg-gradient-to-b from-[#1c1917] to-[#0c0a09] border-2 border-[#f59e0b] rounded-2xl p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(245,158,11,0.3)] relative overflow-hidden">
                {/* Perforated Notches */}
                <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-[#5a0c10] border border-[#f59e0b]/40 -translate-y-1/2" />
                <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-[#5a0c10] border border-[#f59e0b]/40 -translate-y-1/2" />

                <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#fbbf24] border-b border-[#f59e0b]/30 pb-2 mb-4">
                  <span>PREMIERE ADMISSION</span>
                  <span>ADMIT ONE // VIP</span>
                </div>

                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-400">WORLD PREMIERE OF</p>
                <h1 className="text-3xl font-serif font-black tracking-wide text-white mt-1">
                  {d.groomNickname} &amp; {d.brideNickname}
                </h1>
                <p className="text-xs font-mono text-[#fbbf24] mt-1 tracking-widest">
                  — {d.weddingDate} —
                </p>

                {/* Guest Seat Ticket Box */}
                <div className="my-6 border border-dashed border-[#f59e0b]/60 p-3.5 bg-black/50 rounded-xl">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">HONORED GUEST:</p>
                  <p className="text-base font-bold font-serif text-white">{currentGuest}</p>
                  <p className="text-[9px] font-mono text-[#fbbf24] mt-1">RESERVED FRONT ROW SEAT</p>
                </div>

                {/* Tear Ticket Button */}
                <button
                  onClick={handleOpenInvitation}
                  className="w-full py-3.5 bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#d97706] text-black font-mono font-bold text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Ticket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>{isTearingTicket ? "TEARING TICKET..." : "TEAR TICKET & ENTER"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INNER CINEMATIC PREMIERE LAYOUT */}
      {isOpen && (
        <div className="max-w-xl mx-auto px-6 py-12 space-y-24">

          {/* MOVIE POSTER HERO */}
          <section className="text-center pt-6 space-y-6">
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">
              <span>GENRE: ROMANCE / DRAMA</span>
              <span className="text-[#fbbf24] font-bold">RATED: L (PURE LOVE)</span>
              <span>RUNTIME: FOREVER</span>
            </div>

            <p className="text-xs font-mono tracking-[0.35em] text-[#fbbf24] uppercase">
              UNIVERSAL PICTURES OF LOVE PRESENTS
            </p>

            <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight text-white uppercase">
              {d.groomNickname} &amp; {d.brideNickname}
            </h1>

            {/* Poster Frame */}
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto border-2 border-[#f59e0b]/60 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.2)] bg-neutral-900">
              <Image
                src={d.coverImage}
                alt="Movie Poster"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fbbf24]">NOW SHOWING WORLDWIDE</p>
                <p className="text-sm font-bold text-white mt-1">{d.weddingDate}</p>
              </div>
            </div>

            {/* Hollywood Billing Block Credits */}
            <div className="text-[9px] font-mono text-neutral-400 tracking-wider uppercase max-w-md mx-auto leading-relaxed border-t border-b border-neutral-800 py-3">
              STARRING {d.groomName.toUpperCase()} AND {d.brideName.toUpperCase()} • EXECUTIVE PRODUCERS: THE PARENTS • MUSIC BY DESTINY • DIRECTED BY TRUE LOVE • SCREENPLAY BY LIFE
            </div>

            {/* Premiere Countdown Clapperboard */}
            <div className="border border-neutral-800 bg-neutral-950 p-4 rounded-xl max-w-xs mx-auto">
              <p className="text-[10px] font-mono tracking-widest uppercase text-[#fbbf24] mb-2">
                COUNTDOWN TO RED CARPET PREMIERE
              </p>
              <div className="grid grid-cols-4 gap-2 font-mono">
                {[
                  { label: "DAYS", val: timeLeft.days },
                  { label: "HOURS", val: timeLeft.hours },
                  { label: "MINS", val: timeLeft.minutes },
                  { label: "SECS", val: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="bg-neutral-900 border border-neutral-800 p-2 rounded text-center">
                    <span className="block text-xl font-bold text-white">{String(item.val).padStart(2, "0")}</span>
                    <span className="text-[8px] text-neutral-500 uppercase">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* THE LEADING CAST PROFILES */}
          <section className="space-y-12">
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fbbf24] border border-[#f59e0b]/40 px-3 py-1 rounded-full">
                THE PRINCIPAL CAST
              </span>
              <h2 className="text-3xl font-serif font-bold text-white mt-3">Leading Roles</h2>
            </div>

            {/* Groom Cast Card */}
            <div className="border border-neutral-800 bg-neutral-950 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-36 h-48 rounded-xl border border-[#f59e0b]/40 overflow-hidden flex-shrink-0 bg-neutral-900">
                <Image
                  src={d.galleryImages[0] || d.coverImage}
                  alt={d.groomName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#fbbf24]">THE LEADING MAN</span>
                <h3 className="text-2xl font-serif font-bold text-white">{d.groomName}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{d.groomParents}</p>
                <p className="text-[11px] font-mono text-neutral-500 pt-1">@{d.groomNickname.toLowerCase()}</p>
              </div>
            </div>

            {/* Bride Cast Card */}
            <div className="border border-neutral-800 bg-neutral-950 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row-reverse items-center gap-6">
              <div className="relative w-36 h-48 rounded-xl border border-[#f59e0b]/40 overflow-hidden flex-shrink-0 bg-neutral-900">
                <Image
                  src={d.galleryImages[1] || d.coverImage}
                  alt={d.brideName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-right space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#fbbf24]">THE LEADING LADY</span>
                <h3 className="text-2xl font-serif font-bold text-white">{d.brideName}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{d.brideParents}</p>
                <p className="text-[11px] font-mono text-neutral-500 pt-1">@{d.brideNickname.toLowerCase()}</p>
              </div>
            </div>
          </section>

          {/* THEATRE SCREEN SCHEDULE (AKAD & RECEPTION) */}
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fbbf24]">
                SHOWTIME SCHEDULE
              </span>
              <h2 className="text-3xl font-serif font-bold text-white mt-1">Cinema Showtimes</h2>
            </div>

            {/* Screen 1: Matrimony */}
            <div className="border border-neutral-800 bg-neutral-950 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#fbbf24]">SCREEN 1 // HOLY MATRIMONY</span>
                <span className="text-xs font-mono bg-[#f59e0b] text-black px-2.5 py-0.5 rounded font-bold">{d.akadTime}</span>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-neutral-400 flex items-center gap-2 font-mono"><Calendar className="w-3.5 h-3.5 text-[#fbbf24]" /> {d.akadDate}</p>
                <p className="text-white font-bold flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#fbbf24]" /> {d.akadLocation}</p>
                <p className="text-neutral-500 pl-5 leading-relaxed">{d.akadAddress}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[#f59e0b] text-[#fbbf24] text-[10px] font-mono uppercase tracking-widest rounded-lg hover:bg-[#f59e0b] hover:text-black transition-colors"
                >
                  GET THEATRE DIRECTIONS →
                </a>
              </div>
            </div>

            {/* Screen 2: Reception */}
            <div className="border border-neutral-800 bg-neutral-950 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#fbbf24]">SCREEN 2 // GALA RECEPTION</span>
                <span className="text-xs font-mono bg-[#f59e0b] text-black px-2.5 py-0.5 rounded font-bold">{d.resepsiTime}</span>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-neutral-400 flex items-center gap-2 font-mono"><Calendar className="w-3.5 h-3.5 text-[#fbbf24]" /> {d.resepsiDate}</p>
                <p className="text-white font-bold flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#fbbf24]" /> {d.resepsiLocation}</p>
                <p className="text-neutral-500 pl-5 leading-relaxed">{d.resepsiAddress}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[#f59e0b] text-[#fbbf24] text-[10px] font-mono uppercase tracking-widest rounded-lg hover:bg-[#f59e0b] hover:text-black transition-colors"
                >
                  GET THEATRE DIRECTIONS →
                </a>
              </div>
            </div>
          </section>

          {/* FILM REEL GALLERY (35MM STRIP) */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fbbf24]">
                BEHIND THE SCENES
              </span>
              <h2 className="text-3xl font-serif font-bold text-white mt-1">35mm Film Reel</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(d.galleryImages.length > 0 ? d.galleryImages : [d.coverImage, d.coverImage, d.coverImage, d.coverImage]).map((img, i) => (
                <div key={i} className="border-2 border-neutral-800 rounded-xl overflow-hidden bg-black p-2 relative">
                  {/* Sprocket holes */}
                  <div className="flex justify-between px-1 pb-1">
                    <span className="w-2 h-2 rounded-sm bg-neutral-800" />
                    <span className="w-2 h-2 rounded-sm bg-neutral-800" />
                    <span className="w-2 h-2 rounded-sm bg-neutral-800" />
                  </div>
                  <div className="relative aspect-[3/4] rounded overflow-hidden">
                    <Image
                      src={img}
                      alt={`Still ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[8px] font-mono text-neutral-500 text-center mt-1">FRAME 00{i + 1}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DIGITAL BOX OFFICE REGISTRY */}
          <section className="border border-neutral-800 bg-neutral-950 rounded-2xl p-8 text-center space-y-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fbbf24]">
              BOX OFFICE TRIBUTES
            </span>
            <h3 className="text-2xl font-serif font-bold text-white">Digital Box Office</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Your prayers and presence are the true accolades of our premiere. For guests seeking to extend a digital tribute:
            </p>

            <div className="border border-[#f59e0b]/50 bg-black rounded-xl p-6 max-w-sm mx-auto text-center font-mono">
              <p className="text-xs font-bold text-[#fbbf24] uppercase">{d.bankName}</p>
              <p className="text-xl font-bold text-white my-2 tracking-wider">{d.accountNumber}</p>
              <p className="text-xs text-neutral-400 font-sans">A.N. {d.accountHolder}</p>

              <button
                onClick={copyAccount}
                className="mt-5 w-full py-2.5 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "ACCOUNT NUMBER COPIED" : "COPY ACCOUNT NUMBER"}</span>
              </button>
            </div>
          </section>

          {/* AUDIENCE REVIEWS & RSVP */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#fbbf24]">
                AUDIENCE FEEDBACK
              </span>
              <h2 className="text-3xl font-serif font-bold text-white mt-1">Premiere Reviews</h2>
            </div>

            <form onSubmit={submitWish} className="border border-neutral-800 bg-neutral-950 rounded-2xl p-6 space-y-4 font-mono">
              <div>
                <label className="block text-[10px] uppercase text-[#fbbf24] mb-1">
                  CRITIC / GUEST NAME
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-black border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b]"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#fbbf24] mb-1">
                  ATTENDANCE RSVP
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Hadir", "Tidak Hadir"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setInputStatus(status)}
                      className={`py-2 text-xs rounded-lg border ${
                        inputStatus === status 
                          ? "bg-[#f59e0b] text-black font-bold border-[#f59e0b]" 
                          : "border-neutral-800 text-neutral-400 hover:border-neutral-700"
                      }`}
                    >
                      {status === "Hadir" ? "Will Attend Premiere" : "Regretfully Unable"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-[#fbbf24] mb-1">
                  AUDIENCE REVIEW &amp; WISHES
                </label>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  rows={3}
                  placeholder="Write your premiere review and wishes..."
                  className="w-full bg-black border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#f59e0b] font-sans"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 transition-all"
              >
                POST PREMIERE REVIEW ★★★★★
              </button>
            </form>

            {/* Reviews Feed */}
            <div className="space-y-3 pt-2">
              {wishes.map((w, idx) => (
                <div key={idx} className="border border-neutral-900 bg-neutral-950 rounded-xl p-4 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="font-bold text-white uppercase">{w.name}</span>
                    <span className="text-[#fbbf24]">★★★★★</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">{w.message}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CREDITS FOOTER */}
          <footer className="text-center pt-12 border-t border-neutral-900 space-y-2">
            <h4 className="text-2xl font-serif font-black text-white">{d.groomNickname} &amp; {d.brideNickname}</h4>
            <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
              THANK YOU FOR WATCHING OUR LOVE STORY UNFOLD
            </p>
            <p className="text-[9px] font-mono text-neutral-600 pt-4">CINEMATIC PREMIERE SERIES // MMXXVI</p>
          </footer>

        </div>
      )}
    </div>
  );
}
