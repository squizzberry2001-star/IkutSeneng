"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Volume2, VolumeX, MailOpen, CalendarPlus, Sparkles, User, MessageCircle, Home
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
  const [activeTab, setActiveTab] = useState<"home" | "couple" | "event" | "gift" | "wishes">("home");
  const [heartCount, setHeartCount] = useState(128);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
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

  const addHeartReaction = () => {
    setHeartCount(prev => prev + 1);
    const newHeart = { id: Date.now(), x: Math.random() * 60 - 30 };
    setFloatingHearts(prev => [...prev.slice(-15), newHeart]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1800);
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
    <div className="relative min-h-screen bg-[#faf5f0] text-[#4a3e3d] font-sans antialiased selection:bg-[#f3c2c7] selection:text-[#4a3e3d] pb-24">
      {/* Background Soft Acoustic Audio */}
      <audio ref={audioRef} src={d.musicUrl} loop preload="auto" />

      {/* Floating Garden Petals / Rose Hearts */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.6 }}
            animate={{ opacity: 0, y: -260, scale: 1.4 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="fixed bottom-24 right-8 text-rose-500"
          >
            <Heart className="w-6 h-6 fill-rose-500" />
          </motion.div>
        ))}
      </div>

      {/* COVER SCREEN - WATERCOLOR FLORAL BLOOM */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="floral-garden-cover"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9 }}
            className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-gradient-to-b from-[#fdf7f4] via-[#f7ebe6] to-[#f2ded8] p-6 sm:p-10 text-center overflow-hidden"
          >
            {/* Top Floral Badge */}
            <div className="relative z-10 pt-4">
              <span className="inline-block text-[11px] font-mono tracking-[0.3em] uppercase text-rose-800/80 bg-rose-100/80 border border-rose-200 px-4 py-1.5 rounded-full mb-2">
                FLORAL GARDEN CEREMONY
              </span>
              <p className="text-xs text-rose-900/60 tracking-widest font-serif italic">In the blossoming of love</p>
            </div>

            {/* Circular Botanical Wreath with Couple Photo */}
            <div className="relative z-10 my-auto flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-rose-300/80 p-2 shadow-2xl bg-white/70 overflow-hidden">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={d.coverImage}
                    alt="Garden Couple"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Names */}
              <div className="mt-6 space-y-1">
                <h1 className="text-4xl sm:text-5xl font-serif italic text-rose-950 font-medium">
                  {d.groomNickname} <span className="text-rose-400 font-light">&amp;</span> {d.brideNickname}
                </h1>
                <p className="text-xs font-mono tracking-widest text-rose-800/70">
                  {d.weddingDate}
                </p>
              </div>
            </div>

            {/* Guest Invitation & Bloom Button */}
            <div className="relative z-10 w-full max-w-sm border-t border-rose-300/50 pt-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-900/60 mb-1">
                DEARLY INVITED GUEST:
              </p>
              <h3 className="text-xl font-serif font-bold text-rose-950 mb-4">
                {currentGuest}
              </h3>

              <button
                onClick={handleOpenInvitation}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-xs font-mono tracking-[0.2em] uppercase rounded-full shadow-[0_5px_20px_rgba(244,63,94,0.35)] hover:brightness-105 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <MailOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>OPEN INVITATION SUITE</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE GARDEN APP LAYOUT (TABBED SLIDES & HEART CANNON) */}
      {isOpen && (
        <div className="max-w-xl mx-auto px-4 sm:px-6 pt-8 pb-16">

          {/* TAB CONTENT 1: HOME */}
          {activeTab === "home" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 text-center">
              <div className="bg-white/80 border border-rose-200/80 rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden backdrop-blur-sm">
                <div className="text-rose-400 text-2xl font-serif mb-2">❦ ❀ ❦</div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose-800/70">A BEAUTIFUL CELEBRATION</p>
                <h2 className="text-3xl sm:text-4xl font-serif italic text-rose-950 mt-1 mb-4">
                  {d.groomNickname} &amp; {d.brideNickname}
                </h2>
                <p className="text-xs text-rose-900/70 max-w-sm mx-auto italic leading-relaxed border-y border-rose-200/60 py-4 font-serif">
                  &ldquo;{d.quote}&rdquo;
                </p>

                <div className="mt-8 relative aspect-[4/5] w-full max-w-xs mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-rose-200">
                  <Image src={d.coverImage} alt="Couple Portrait" fill className="object-cover" />
                </div>

                {/* Countdown */}
                <div className="mt-8 pt-4 border-t border-rose-200/60">
                  <p className="text-[10px] font-mono tracking-widest text-rose-800/80 uppercase mb-3">
                    BLOSSOMING COUNTDOWN:
                  </p>
                  <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto font-mono">
                    {[
                      { label: "DAYS", val: timeLeft.days },
                      { label: "HOURS", val: timeLeft.hours },
                      { label: "MINS", val: timeLeft.minutes },
                      { label: "SECS", val: timeLeft.seconds }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-rose-50/80 border border-rose-200 p-2 rounded-xl text-center">
                        <span className="block text-xl font-bold text-rose-900">{String(item.val).padStart(2, "0")}</span>
                        <span className="text-[8px] text-rose-700/70 uppercase">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB CONTENT 2: COUPLE */}
          {activeTab === "couple" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                  THE BRIDE &amp; GROOM
                </span>
                <h2 className="text-3xl font-serif italic text-rose-950 mt-2">The Happy Couple</h2>
              </div>

              {/* Groom */}
              <div className="bg-white/80 border border-rose-200/80 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-md">
                <div className="relative w-36 h-48 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-rose-200">
                  <Image src={d.galleryImages[0] || d.coverImage} alt={d.groomName} fill className="object-cover" />
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-rose-600 uppercase">THE GROOM</span>
                  <h3 className="text-2xl font-serif text-rose-950">{d.groomName}</h3>
                  <p className="text-xs text-rose-900/70 font-serif leading-relaxed">{d.groomParents}</p>
                  <p className="text-[11px] font-mono text-rose-500">@{d.groomNickname.toLowerCase()}</p>
                </div>
              </div>

              {/* Bride */}
              <div className="bg-white/80 border border-rose-200/80 rounded-3xl p-6 flex flex-col sm:flex-row-reverse items-center gap-6 shadow-md">
                <div className="relative w-36 h-48 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-rose-200">
                  <Image src={d.galleryImages[1] || d.coverImage} alt={d.brideName} fill className="object-cover" />
                </div>
                <div className="text-center sm:text-right space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-rose-600 uppercase">THE BRIDE</span>
                  <h3 className="text-2xl font-serif text-rose-950">{d.brideName}</h3>
                  <p className="text-xs text-rose-900/70 font-serif leading-relaxed">{d.brideParents}</p>
                  <p className="text-[11px] font-mono text-rose-500">@{d.brideNickname.toLowerCase()}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB CONTENT 3: EVENT */}
          {activeTab === "event" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                  WEDDING ITINERARY
                </span>
                <h2 className="text-3xl font-serif italic text-rose-950 mt-2">Ceremony &amp; Reception</h2>
              </div>

              {/* Akad */}
              <div className="bg-white/80 border border-rose-200/80 rounded-3xl p-6 shadow-md space-y-3">
                <div className="flex justify-between items-center border-b border-rose-200 pb-2">
                  <span className="text-xs font-mono font-bold text-rose-700">HOLY MATRIMONY / AKAD</span>
                  <span className="text-xs font-mono bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full">{d.akadTime}</span>
                </div>
                <p className="text-xs text-rose-900/80 flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-rose-500" /> {d.akadDate}</p>
                <p className="text-sm font-bold text-rose-950 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-rose-500" /> {d.akadLocation}</p>
                <p className="text-xs text-rose-800/70 pl-5">{d.akadAddress}</p>
                <div className="pt-2 text-right">
                  <a href={d.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-mono text-rose-600 hover:text-rose-800 underline">
                    VIEW GOOGLE MAPS →
                  </a>
                </div>
              </div>

              {/* Reception */}
              <div className="bg-white/80 border border-rose-200/80 rounded-3xl p-6 shadow-md space-y-3">
                <div className="flex justify-between items-center border-b border-rose-200 pb-2">
                  <span className="text-xs font-mono font-bold text-rose-700">WEDDING BANQUET</span>
                  <span className="text-xs font-mono bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full">{d.resepsiTime}</span>
                </div>
                <p className="text-xs text-rose-900/80 flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-rose-500" /> {d.resepsiDate}</p>
                <p className="text-sm font-bold text-rose-950 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-rose-500" /> {d.resepsiLocation}</p>
                <p className="text-xs text-rose-800/70 pl-5">{d.resepsiAddress}</p>
                <div className="pt-2 text-right">
                  <a href={d.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs font-mono text-rose-600 hover:text-rose-800 underline">
                    VIEW GOOGLE MAPS →
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB CONTENT 4: GIFT */}
          {activeTab === "gift" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                  TOKEN OF LOVE
                </span>
                <h2 className="text-3xl font-serif italic text-rose-950 mt-2">Digital Envelope</h2>
              </div>

              <div className="bg-white/80 border border-rose-200/80 rounded-3xl p-8 text-center space-y-4 shadow-md">
                <p className="text-xs text-rose-900/70 max-w-sm mx-auto leading-relaxed">
                  Your heartfelt prayers and presence are the sweetest blessings to our blossoming union:
                </p>

                <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 max-w-sm mx-auto text-center font-mono">
                  <p className="text-xs font-bold text-rose-800 uppercase">{d.bankName}</p>
                  <p className="text-2xl font-bold text-rose-950 my-2">{d.accountNumber}</p>
                  <p className="text-xs text-rose-700/80 font-sans">A.N. {d.accountHolder}</p>

                  <button
                    onClick={copyAccount}
                    className="mt-4 w-full py-2.5 bg-rose-500 text-white font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "COPIED TO CLIPBOARD" : "COPY ACCOUNT NUMBER"}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB CONTENT 5: WISHES */}
          {activeTab === "wishes" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                  GUEST BOOK
                </span>
                <h2 className="text-3xl font-serif italic text-rose-950 mt-2">Blessings &amp; RSVP</h2>
              </div>

              <form onSubmit={submitWish} className="bg-white/80 border border-rose-200/80 rounded-3xl p-6 space-y-4 shadow-md font-sans">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-rose-800 mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-rose-50/50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-950 focus:outline-none focus:border-rose-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-rose-800 mb-1">ATTENDANCE</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Hadir", "Tidak Hadir"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setInputStatus(status)}
                        className={`py-2 text-xs rounded-xl font-mono border ${
                          inputStatus === status ? "bg-rose-500 text-white border-rose-500" : "border-rose-200 text-rose-700 hover:bg-rose-50"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-rose-800 mb-1">WARM WISHES</label>
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    rows={3}
                    placeholder="Pen a lovely note for the couple..."
                    className="w-full bg-rose-50/50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-950 focus:outline-none focus:border-rose-400 font-serif"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-rose-500 text-white font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-rose-600 transition-colors"
                >
                  SEND WISHES
                </button>
              </form>

              <div className="space-y-3 pt-2">
                {wishes.map((w, idx) => (
                  <div key={idx} className="bg-white/80 border border-rose-200/80 rounded-2xl p-4 shadow-sm space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-bold text-rose-950">{w.name}</span>
                      <span className="text-[10px] text-rose-600/70">{w.time}</span>
                    </div>
                    <p className="text-xs text-rose-900/80 italic font-serif leading-relaxed">&ldquo;{w.message}&rdquo;</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      )}

      {/* FLOATING HEART REACTION CANNON BUTTON */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 flex flex-col items-center">
          <button
            onClick={addHeartReaction}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-xl shadow-rose-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer group"
            title="Kirim Cinta"
          >
            <Heart className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
          </button>
          <span className="text-[9px] font-mono font-bold text-rose-800 mt-1 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-rose-200 shadow-xs">
            {heartCount} ❤️
          </span>
        </div>
      )}

      {/* INTERACTIVE BOTTOM DOCK NAVIGATION (APP UX) */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto z-40 bg-white/90 backdrop-blur-md border border-rose-200 rounded-full shadow-2xl p-1.5 flex justify-around items-center">
          {[
            { id: "home", label: "Beranda", icon: Home },
            { id: "couple", label: "Pasangan", icon: User },
            { id: "event", label: "Acara", icon: Calendar },
            { id: "gift", label: "Kado", icon: Gift },
            { id: "wishes", label: "Ucapan", icon: MessageCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                  isActive ? "bg-rose-500 text-white font-bold shadow-md" : "text-rose-900/60 hover:text-rose-950"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
