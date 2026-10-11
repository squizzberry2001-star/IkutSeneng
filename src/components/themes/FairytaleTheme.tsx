"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Volume2, VolumeX, BookOpen, Sparkles, Star, ChevronRight, ChevronLeft, Crown
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
  const [isFlippingBook, setIsFlippingBook] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
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
    },
    {
      name: "Duchess Genevieve",
      status: "Hadir",
      message: "To a lifetime of enchanted balls and wondrous love. Congratulations!",
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
    setIsFlippingBook(true);
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
    <div className="relative min-h-screen bg-[#0e0c1f] text-[#f1effc] font-serif antialiased selection:bg-[#c084fc] selection:text-[#0e0c1f] overflow-x-hidden pb-16">
      {/* Background Fairytale Audio */}
      <audio ref={audioRef} src={d.musicUrl} loop preload="auto" />

      {/* Floating Fairy Music Toggle */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={toggleMusic}
            className="flex items-center gap-2 bg-[#231b47]/90 text-[#f3e8ff] border border-[#a855f7]/50 px-4 py-2.5 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] text-xs tracking-wider backdrop-blur-md hover:bg-[#312563] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e9d5ff] animate-spin" />
            <span className="text-[11px] font-sans">{isPlaying ? "FAIRYTALE OST" : "MUTED"}</span>
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </motion.div>
      )}

      {/* 3D STORYBOOK COVER OPENING ANIMATION */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="storybook-cover"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#070512] p-4 sm:p-6 overflow-hidden"
          >
            {/* The 3D Book */}
            <motion.div
              animate={isFlippingBook ? { rotateY: -110, opacity: 0 } : { rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.95, ease: "easeInOut" }}
              style={{ transformOrigin: "left center" }}
              className="relative w-full max-w-sm bg-gradient-to-br from-[#2a174d] via-[#1a0f33] to-[#120726] border-4 border-[#d8b4fe]/60 rounded-r-3xl rounded-l-md p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center flex flex-col justify-between"
            >
              {/* Book Spine Shadow Left */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/40 rounded-l-md" />

              <div className="pt-2">
                <Crown className="w-7 h-7 text-[#e9d5ff] mx-auto mb-2" />
                <p className="text-[10px] font-sans tracking-[0.35em] text-[#d8b4fe] uppercase">
                  A ROYAL FAIRYTALE
                </p>
                <h1 className="text-3xl sm:text-4xl font-serif italic text-white mt-1">
                  {d.groomNickname} &amp; {d.brideNickname}
                </h1>
                <p className="text-xs font-sans tracking-widest text-[#c084fc] mt-1">{d.weddingDate}</p>
              </div>

              {/* Cover Photo */}
              <div className="my-6 relative aspect-[3/4] w-48 mx-auto rounded-2xl overflow-hidden border-2 border-[#d8b4fe]/50 shadow-2xl">
                <Image src={d.coverImage} alt="Storybook Cover" fill priority className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              {/* Guest Decree Box */}
              <div className="border border-[#c084fc]/40 bg-[#160d2b]/80 p-3.5 rounded-xl mb-4 font-sans">
                <p className="text-[9px] text-[#d8b4fe] tracking-widest uppercase">ROYAL INVITATION DISPATCHED TO:</p>
                <p className="text-base font-serif font-bold text-white mt-0.5">{currentGuest}</p>
              </div>

              {/* Open Book Button */}
              <button
                onClick={handleOpenInvitation}
                className="w-full py-3.5 bg-gradient-to-r from-[#9333ea] to-[#c084fc] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_5px_25px_rgba(147,51,234,0.5)] hover:brightness-110 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>OPEN ENCHANTED BOOK</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STORYBOOK CHAPTER LAYOUT */}
      {isOpen && (
        <div className="max-w-xl mx-auto px-4 sm:px-6 pt-10 space-y-12">

          {/* CHAPTER NAVIGATION PILLS */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {[
              { num: 1, label: "Prologue" },
              { num: 2, label: "The Royals" },
              { num: 3, label: "The Ball" },
              { num: 4, label: "Kingdom Gifts" }
            ].map((ch) => (
              <button
                key={ch.num}
                onClick={() => setCurrentChapter(ch.num)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer ${
                  currentChapter === ch.num 
                    ? "bg-gradient-to-r from-[#9333ea] to-[#c084fc] text-white font-bold shadow-md shadow-purple-500/30" 
                    : "bg-[#1f173b] text-[#c084fc] hover:bg-[#2b1f52]"
                }`}
              >
                Ch. {ch.num}: {ch.label}
              </button>
            ))}
          </div>

          {/* CHAPTER 1: PROLOGUE & ONCE UPON A TIME */}
          {currentChapter === 1 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center bg-[#181133] border border-[#a855f7]/40 rounded-3xl p-8 shadow-2xl relative">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#d8b4fe]">CHAPTER I</span>
              <h2 className="text-3xl sm:text-4xl font-serif italic text-white mt-1">Once Upon a Time</h2>

              <p className="text-xs text-[#d8b4fe] leading-relaxed italic max-w-sm mx-auto border-y border-[#a855f7]/30 py-4">
                &ldquo;{d.quote}&rdquo;
              </p>

              <div className="relative aspect-[4/5] w-full max-w-xs mx-auto rounded-2xl overflow-hidden border-2 border-[#d8b4fe]/50 shadow-xl">
                <Image src={d.coverImage} alt="Storybook Chapter 1" fill className="object-cover" />
              </div>

              {/* Countdown */}
              <div className="pt-4">
                <p className="text-[10px] font-sans tracking-widest text-[#d8b4fe] uppercase mb-3">
                  UNTIL THE ROYAL CLOCK STRIKES MIDNIGHT:
                </p>
                <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto font-sans">
                  {[
                    { label: "DAYS", val: timeLeft.days },
                    { label: "HOURS", val: timeLeft.hours },
                    { label: "MINS", val: timeLeft.minutes },
                    { label: "SECS", val: timeLeft.seconds }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#241a4a] border border-[#a855f7]/40 p-2.5 rounded-xl">
                      <span className="block text-xl font-bold text-white">{String(item.val).padStart(2, "0")}</span>
                      <span className="text-[8px] text-[#c084fc] uppercase">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setCurrentChapter(2)}
                  className="px-6 py-2.5 bg-[#2a1b52] hover:bg-[#3b2773] text-[#e9d5ff] text-xs font-sans rounded-full border border-[#a855f7]/50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Chapter II: The Royals</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* CHAPTER 2: THE ROYALS (PRINCE & PRINCESS) */}
          {currentChapter === 2 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center mb-6">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#d8b4fe]">CHAPTER II</span>
                <h2 className="text-3xl font-serif italic text-white mt-1">The Prince &amp; Princess</h2>
              </div>

              {/* Prince */}
              <div className="bg-[#181133] border border-[#a855f7]/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
                <div className="relative w-36 h-48 rounded-2xl border-2 border-[#d8b4fe]/50 overflow-hidden flex-shrink-0">
                  <Image src={d.galleryImages[0] || d.coverImage} alt={d.groomName} fill className="object-cover" />
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <span className="text-[10px] font-sans tracking-widest text-[#c084fc] uppercase">HIS ROYAL HIGHNESS</span>
                  <h3 className="text-2xl font-serif text-white">{d.groomName}</h3>
                  <p className="text-xs text-[#d8b4fe] leading-relaxed italic">{d.groomParents}</p>
                  <p className="text-[11px] font-sans text-purple-400 pt-1">@{d.groomNickname.toLowerCase()}</p>
                </div>
              </div>

              {/* Princess */}
              <div className="bg-[#181133] border border-[#a855f7]/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row-reverse items-center gap-6 shadow-xl">
                <div className="relative w-36 h-48 rounded-2xl border-2 border-[#d8b4fe]/50 overflow-hidden flex-shrink-0">
                  <Image src={d.galleryImages[1] || d.coverImage} alt={d.brideName} fill className="object-cover" />
                </div>
                <div className="text-center sm:text-right space-y-2">
                  <span className="text-[10px] font-sans tracking-widest text-[#c084fc] uppercase">HER ROYAL HIGHNESS</span>
                  <h3 className="text-2xl font-serif text-white">{d.brideName}</h3>
                  <p className="text-xs text-[#d8b4fe] leading-relaxed italic">{d.brideParents}</p>
                  <p className="text-[11px] font-sans text-purple-400 pt-1">@{d.brideNickname.toLowerCase()}</p>
                </div>
              </div>

              <div className="pt-4 text-center">
                <button
                  onClick={() => setCurrentChapter(3)}
                  className="px-6 py-2.5 bg-[#2a1b52] hover:bg-[#3b2773] text-[#e9d5ff] text-xs font-sans rounded-full border border-[#a855f7]/50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Chapter III: The Royal Ball</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* CHAPTER 3: THE ROYAL BALL & SACRED VOWS */}
          {currentChapter === 3 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center mb-6">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#d8b4fe]">CHAPTER III</span>
                <h2 className="text-3xl font-serif italic text-white mt-1">The Royal Coronation Ball</h2>
              </div>

              {/* Ceremony */}
              <div className="bg-[#181133] border border-[#a855f7]/40 rounded-3xl p-6 shadow-xl space-y-3">
                <div className="flex justify-between items-center border-b border-[#a855f7]/30 pb-2">
                  <span className="text-xs font-sans font-bold text-[#d8b4fe]">SOLEMN SACRED VOWS</span>
                  <span className="text-xs font-sans bg-[#311f59] text-white px-2.5 py-0.5 rounded-full">{d.akadTime}</span>
                </div>
                <p className="text-xs text-[#d8b4fe] flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-[#c084fc]" /> {d.akadDate}</p>
                <p className="text-sm font-bold text-white flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#c084fc]" /> {d.akadLocation}</p>
                <p className="text-xs text-purple-300 pl-5">{d.akadAddress}</p>
                <div className="pt-2 text-right">
                  <a href={d.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-sans text-[#c084fc] hover:underline">
                    VIEW PALACE MAP →
                  </a>
                </div>
              </div>

              {/* Ball */}
              <div className="bg-[#181133] border border-[#a855f7]/40 rounded-3xl p-6 shadow-xl space-y-3">
                <div className="flex justify-between items-center border-b border-[#a855f7]/30 pb-2">
                  <span className="text-xs font-sans font-bold text-[#d8b4fe]">GRAND ROYAL BALL</span>
                  <span className="text-xs font-sans bg-[#311f59] text-white px-2.5 py-0.5 rounded-full">{d.resepsiTime}</span>
                </div>
                <p className="text-xs text-[#d8b4fe] flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-[#c084fc]" /> {d.resepsiDate}</p>
                <p className="text-sm font-bold text-white flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#c084fc]" /> {d.resepsiLocation}</p>
                <p className="text-xs text-purple-300 pl-5">{d.resepsiAddress}</p>
                <div className="pt-2 text-right">
                  <a href={d.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-sans text-[#c084fc] hover:underline">
                    VIEW PALACE MAP →
                  </a>
                </div>
              </div>

              <div className="pt-4 text-center">
                <button
                  onClick={() => setCurrentChapter(4)}
                  className="px-6 py-2.5 bg-[#2a1b52] hover:bg-[#3b2773] text-[#e9d5ff] text-xs font-sans rounded-full border border-[#a855f7]/50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read Chapter IV: Kingdom Gifts &amp; RSVP</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* CHAPTER 4: KINGDOM GIFTS & RSVP */}
          {currentChapter === 4 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="text-center">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#d8b4fe]">CHAPTER IV</span>
                <h2 className="text-3xl font-serif italic text-white mt-1">Kingdom Gifts &amp; Fealty</h2>
              </div>

              {/* Gift */}
              <div className="bg-[#181133] border border-[#a855f7]/40 rounded-3xl p-8 text-center space-y-4 shadow-xl">
                <h3 className="text-2xl font-serif text-white">Royal Registry</h3>
                <p className="text-xs text-[#d8b4fe] max-w-sm mx-auto leading-relaxed">
                  Your royal presence and prayers are our greatest crown. For citizens desiring to grant a gift:
                </p>

                <div className="bg-[#241a4a] border border-[#a855f7]/50 rounded-2xl p-6 max-w-sm mx-auto text-center font-mono">
                  <p className="text-xs font-bold text-[#d8b4fe] uppercase">{d.bankName}</p>
                  <p className="text-2xl font-bold text-white my-2">{d.accountNumber}</p>
                  <p className="text-xs text-purple-300 font-sans">A.N. {d.accountHolder}</p>

                  <button
                    onClick={copyAccount}
                    className="mt-4 w-full py-2.5 bg-gradient-to-r from-[#9333ea] to-[#c084fc] text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "COPIED TO SCROLL" : "COPY ACCOUNT NUMBER"}</span>
                  </button>
                </div>
              </div>

              {/* RSVP */}
              <div className="bg-[#181133] border border-[#a855f7]/40 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl font-sans">
                <h3 className="text-2xl font-serif text-white text-center">RSVP of the Realm</h3>

                <form onSubmit={submitWish} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase text-[#d8b4fe] mb-1">GUEST NAME</label>
                    <input
                      type="text"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      placeholder="Insert your full name"
                      className="w-full bg-[#100a24] border border-[#a855f7]/40 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#c084fc]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-[#d8b4fe] mb-1">ATTENDANCE</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Hadir", "Tidak Hadir"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setInputStatus(status)}
                          className={`py-2 text-xs rounded-xl border ${
                            inputStatus === status ? "bg-[#9333ea] text-white font-bold border-[#9333ea]" : "border-[#a855f7]/40 text-[#d8b4fe] hover:bg-[#251847]"
                          }`}
                        >
                          {status === "Hadir" ? "Will Attend Ball" : "Unable to Attend"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase text-[#d8b4fe] mb-1">BLESSING FOR THE THRONE</label>
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      rows={3}
                      placeholder="Pen your fairy blessing..."
                      className="w-full bg-[#100a24] border border-[#a855f7]/40 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#c084fc] font-serif"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#9333ea] to-[#c084fc] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all"
                  >
                    DISPATCH ROYAL BLESSING
                  </button>
                </form>

                {/* Wishes Feed */}
                <div className="space-y-3 pt-3">
                  {wishes.map((w, idx) => (
                    <div key={idx} className="bg-[#241a4a] border border-[#a855f7]/30 rounded-2xl p-4 space-y-1">
                      <div className="flex justify-between items-center text-xs font-sans">
                        <span className="font-bold text-white">{w.name}</span>
                        <span className="text-[10px] text-[#c084fc]">{w.time}</span>
                      </div>
                      <p className="text-xs text-[#d8b4fe] italic font-serif leading-relaxed">&ldquo;{w.message}&rdquo;</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* FOOTER */}
          <footer className="text-center pt-8 border-t border-[#a855f7]/30 space-y-1">
            <h4 className="text-2xl font-serif italic text-white">{d.groomNickname} &amp; {d.brideNickname}</h4>
            <p className="text-[10px] font-sans tracking-[0.25em] text-[#c084fc] uppercase">
              AND THEY LIVED HAPPILY EVER AFTER
            </p>
            <p className="text-[9px] font-sans text-purple-400/60 pt-4">ROYAL FAIRYTALE SERIES // MMXXVI</p>
          </footer>

        </div>
      )}
    </div>
  );
}
