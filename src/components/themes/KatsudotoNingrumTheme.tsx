"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Volume2, VolumeX, MailOpen, CalendarPlus, Sparkles, Shield
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
  const [isOpeningGates, setIsOpeningGates] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(guestName);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 48,
    hours: 14,
    minutes: 36,
    seconds: 12
  });

  const [copied, setCopied] = useState(false);
  const [wishes, setWishes] = useState([
    {
      name: "Keluarga Suryaningrat",
      status: "Hadir",
      message: "Ndherek bingah dhumateng Mas Nicholas & Mbak Ningrum. Mugi tansah pinaringan berkah, ayem tentrem dumugi kaken-kaken ninen-ninen.",
      time: "1 jam lalu"
    },
    {
      name: "Bpk. H. Hardjono & Ibu",
      status: "Hadir",
      message: "Selamat menempuh hidup baru anakmas dan nimas. Semoga sakinah mawaddah warahmah.",
      time: "3 jam lalu"
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
    setIsOpeningGates(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }, 1100);
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
    <div className="relative min-h-screen bg-[#15100c] text-[#eddcc4] font-serif antialiased selection:bg-[#d4af37] selection:text-[#15100c] overflow-x-hidden">
      {/* Background Audio Gamelan */}
      <audio ref={audioRef} src={d.musicUrl} loop preload="auto" />

      {/* Floating Traditional Gamelan Player */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={toggleMusic}
            className="flex items-center gap-2 bg-[#2b1f16]/95 text-[#f0d48b] border-2 border-[#d4af37] px-4 py-2.5 rounded-full shadow-[0_5px_25px_rgba(0,0,0,0.8)] text-xs tracking-wider backdrop-blur-md hover:bg-[#3d2c20] transition-all"
          >
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[11px] font-sans font-bold">{isPlaying ? "GENDHING KERATON" : "PAUSED"}</span>
            {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </motion.div>
      )}

      {/* GRAND SLIDING PALACE GATES (PINTU GEBYOK KERATON SLIDING ANIMATION) */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed inset-0 z-50 flex overflow-hidden">
            {/* PINTU KIRI (SLIDES LEFT) */}
            <motion.div
              initial={{ x: 0 }}
              animate={isOpeningGates ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
              className="w-1/2 h-full bg-[#1e150f] border-r border-[#d4af37]/40 relative flex flex-col justify-between p-6 sm:p-10 shadow-2xl z-20"
              style={{
                backgroundImage: "radial-gradient(#d4af37 0.75px, transparent 0.75px)",
                backgroundSize: "20px 20px"
              }}
            >
              {/* Ornamen Gebyok Kiri */}
              <div className="border-4 border-[#d4af37]/30 h-full w-full rounded-r-3xl p-4 flex flex-col justify-between relative overflow-hidden bg-gradient-to-r from-[#18110c] to-[#251a13]">
                <div className="text-[#d4af37] text-xs font-sans tracking-[0.3em] uppercase opacity-75">
                  PAWIWAHAN AGENG
                </div>

                {/* Gunungan Wayang Silhouette Kiri */}
                <div className="text-right pr-2">
                  <span className="text-4xl sm:text-6xl text-[#d4af37]/20 font-serif">❖</span>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-[#baa486] font-sans tracking-widest uppercase">KAPARENG AMEDHAR</p>
                </div>
              </div>
            </motion.div>

            {/* PINTU KANAN (SLIDES RIGHT) */}
            <motion.div
              initial={{ x: 0 }}
              animate={isOpeningGates ? { x: "100%" } : { x: 0 }}
              transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
              className="w-1/2 h-full bg-[#1e150f] border-l border-[#d4af37]/40 relative flex flex-col justify-between p-6 sm:p-10 shadow-2xl z-20"
              style={{
                backgroundImage: "radial-gradient(#d4af37 0.75px, transparent 0.75px)",
                backgroundSize: "20px 20px"
              }}
            >
              {/* Ornamen Gebyok Kanan */}
              <div className="border-4 border-[#d4af37]/30 h-full w-full rounded-l-3xl p-4 flex flex-col justify-between relative overflow-hidden bg-gradient-to-l from-[#18110c] to-[#251a13]">
                <div className="text-right text-[#d4af37] text-xs font-sans tracking-[0.3em] uppercase opacity-75">
                  SERAT ULEM
                </div>

                {/* Gunungan Wayang Silhouette Kanan */}
                <div className="text-left pl-2">
                  <span className="text-4xl sm:text-6xl text-[#d4af37]/20 font-serif">❖</span>
                </div>

                <div className="text-left">
                  <p className="text-[10px] text-[#baa486] font-sans tracking-widest uppercase">{d.weddingDate}</p>
                </div>
              </div>
            </motion.div>

            {/* CENTER MEDALLION & UNLOCK TRIGGER */}
            <motion.div 
              animate={isOpeningGates ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-sm bg-[#160f0a]/95 border-2 border-[#d4af37] p-6 sm:p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.95)] text-center pointer-events-auto backdrop-blur-md">
                <span className="text-[#d4af37] text-2xl font-serif">ꦱꦼꦫꦠ꧀ꦲꦸꦊꦩ꧀</span>
                <p className="text-[10px] font-sans tracking-[0.3em] text-[#d4af37] uppercase mt-1">PAWIWAHAN ADAT JAWI</p>

                <h1 className="text-3xl sm:text-4xl font-serif text-[#fbf1db] font-bold mt-4 tracking-wide">
                  {d.groomNickname} &amp; {d.brideNickname}
                </h1>

                {/* Garis Gunungan */}
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-4" />

                <div className="bg-[#241a12] border border-[#d4af37]/40 rounded-xl p-3 my-4">
                  <p className="text-[9px] font-sans tracking-widest text-[#baa282] uppercase mb-0.5">Katur Dhumateng Panjenenganipun:</p>
                  <p className="text-lg font-serif font-bold text-[#fbf1db]">{currentGuest}</p>
                </div>

                <button
                  onClick={handleOpenInvitation}
                  className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f7e096] to-[#b38c26] text-[#15100c] font-sans font-bold text-xs tracking-[0.2em] uppercase rounded-full shadow-lg shadow-[#d4af37]/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <MailOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>BUKA PINTU PAWIWAHAN</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ROYAL INNER COURT CONTENT (LAYOUT KHAS PRANATACARA ADAT JAWA) */}
      {isOpen && (
        <div className="max-w-xl mx-auto px-6 py-16 space-y-28">

          {/* SECTION 1: SERAT RAWUH & GUNUNGAN */}
          <section className="text-center pt-8 space-y-6 bg-gradient-to-b from-[#221710] to-[#17100b] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            <div className="text-3xl text-[#d4af37]">❖ ꦧꦼꦂꦏꦃ ❖</div>

            <p className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37]">
              SERAT ULEM PAWIWAHAN
            </p>

            <h1 className="text-4xl sm:text-5xl font-serif text-[#fbf1db] leading-tight font-bold">
              {d.groomNickname} <br />
              <span className="text-2xl font-light text-[#d4af37] italic">&amp;</span> <br />
              {d.brideNickname}
            </h1>

            <p className="text-xs text-[#baa486] leading-relaxed max-w-sm mx-auto italic font-serif border-y border-[#d4af37]/30 py-4">
              &ldquo;{d.quote}&rdquo;
            </p>

            {/* Bingkai Foto Medallion Keraton */}
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto border-4 border-[#d4af37] rounded-3xl overflow-hidden shadow-[0_0_35px_rgba(212,175,55,0.25)] bg-[#120c08]">
              <Image
                src={d.coverImage}
                alt="Penganten"
                fill
                className="object-cover sepia-[0.25]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-xs font-sans tracking-widest text-[#fbf1db] uppercase">{d.weddingDate}</span>
              </div>
            </div>

            {/* Countdown Kalender Jawa */}
            <div className="pt-4">
              <p className="text-[10px] font-sans tracking-widest text-[#d4af37] uppercase mb-3">
                Wanci Ndungkap Dinten Pawiwahan:
              </p>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto font-sans">
                {[
                  { label: "DINTEN", val: timeLeft.days },
                  { label: "TABUH", val: timeLeft.hours },
                  { label: "MENIT", val: timeLeft.minutes },
                  { label: "DETIK", val: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#241a12] border border-[#d4af37]/40 p-2.5 rounded-xl text-center">
                    <span className="block text-xl font-bold text-[#fbf1db]">{String(item.val).padStart(2, "0")}</span>
                    <span className="text-[8px] text-[#baa486] uppercase">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: TEMANTEN KEKALIH (PROFIL MEMPELAI ADAT) */}
          <section className="space-y-12">
            <div className="text-center">
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37] border border-[#d4af37]/40 px-4 py-1 rounded-full">
                TEMANTEN KEKALIH
              </span>
              <h2 className="text-3xl font-serif text-[#fbf1db] mt-4 font-bold">Pasangan Pengantin</h2>
            </div>

            {/* Pengantin Pria */}
            <div className="bg-[#221710] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
              <div className="relative w-36 h-48 rounded-2xl border-2 border-[#d4af37] overflow-hidden flex-shrink-0 bg-[#160f0a]">
                <Image
                  src={d.galleryImages[0] || d.coverImage}
                  alt={d.groomName}
                  fill
                  className="object-cover sepia-[0.2]"
                />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <span className="text-[10px] font-sans tracking-widest text-[#d4af37] uppercase">PENGANTEN KAKUNG</span>
                <h3 className="text-2xl font-serif text-[#fbf1db] font-bold">{d.groomName}</h3>
                <p className="text-xs text-[#baa486] leading-relaxed">{d.groomParents}</p>
                <p className="text-[11px] font-sans text-[#d4af37] pt-1">@{d.groomNickname.toLowerCase()}</p>
              </div>
            </div>

            {/* Pengantin Putri */}
            <div className="bg-[#221710] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row-reverse items-center gap-6 shadow-xl">
              <div className="relative w-36 h-48 rounded-2xl border-2 border-[#d4af37] overflow-hidden flex-shrink-0 bg-[#160f0a]">
                <Image
                  src={d.galleryImages[1] || d.coverImage}
                  alt={d.brideName}
                  fill
                  className="object-cover sepia-[0.2]"
                />
              </div>
              <div className="text-center sm:text-right space-y-2">
                <span className="text-[10px] font-sans tracking-widest text-[#d4af37] uppercase">PENGANTEN PUTRI</span>
                <h3 className="text-2xl font-serif text-[#fbf1db] font-bold">{d.brideName}</h3>
                <p className="text-xs text-[#baa486] leading-relaxed">{d.brideParents}</p>
                <p className="text-[11px] font-sans text-[#d4af37] pt-1">@{d.brideNickname.toLowerCase()}</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: RUNDOWN PRANATACARA ADAT (SUSUNAN ACARA GEBYOK) */}
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37]">
                RANCANGAN ACARA
              </span>
              <h2 className="text-3xl font-serif text-[#fbf1db] font-bold mt-1">Pranatacara Pawiwahan</h2>
            </div>

            {/* Acara 1: Ijab Qabul & Akad Nikah */}
            <div className="bg-[#221710] border-2 border-[#d4af37]/50 rounded-2xl p-6 relative shadow-xl">
              <div className="flex justify-between items-center border-b border-[#3d2b1f] pb-3 mb-4">
                <span className="text-xs font-sans font-bold tracking-widest text-[#d4af37]">AKAD NIKAH / IJAB QABUL</span>
                <span className="text-xs font-sans text-[#15100c] bg-[#d4af37] px-2.5 py-0.5 rounded font-bold">{d.akadTime}</span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-sans text-[#baa486] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#d4af37]" /> {d.akadDate}
                </p>
                <p className="text-sm font-serif font-bold text-[#fbf1db] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d4af37]" /> {d.akadLocation}
                </p>
                <p className="text-xs text-[#8c7457] pl-6 leading-relaxed">{d.akadAddress}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#3d2b1f] flex justify-end">
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#a67c1e] text-[#15100c] font-sans font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 transition-all"
                >
                  PANDUAN LOKASI (MAPS) →
                </a>
              </div>
            </div>

            {/* Acara 2: Upacara Panggih & Resepsi Pahargyan */}
            <div className="bg-[#221710] border-2 border-[#d4af37]/50 rounded-2xl p-6 relative shadow-xl">
              <div className="flex justify-between items-center border-b border-[#3d2b1f] pb-3 mb-4">
                <span className="text-xs font-sans font-bold tracking-widest text-[#d4af37]">PAHARGYAN &amp; UPACARA PANGGIH</span>
                <span className="text-xs font-sans text-[#15100c] bg-[#d4af37] px-2.5 py-0.5 rounded font-bold">{d.resepsiTime}</span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-sans text-[#baa486] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#d4af37]" /> {d.resepsiDate}
                </p>
                <p className="text-sm font-serif font-bold text-[#fbf1db] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d4af37]" /> {d.resepsiLocation}
                </p>
                <p className="text-xs text-[#8c7457] pl-6 leading-relaxed">{d.resepsiAddress}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#3d2b1f] flex justify-end">
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#a67c1e] text-[#15100c] font-sans font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 transition-all"
                >
                  PANDUAN LOKASI (MAPS) →
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 4: TATA BUSANA (DRESSCODE TRADISIONAL) */}
          <section className="bg-[#221710] border border-[#d4af37]/40 rounded-3xl p-8 text-center space-y-6 shadow-xl">
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#d4af37]">
              PITEDAH BUSANA
            </span>
            <h3 className="text-2xl font-serif text-[#fbf1db] font-bold">Nuansa Batik &amp; Kebaya</h3>
            <p className="text-xs text-[#baa486] max-w-sm mx-auto leading-relaxed">
              Mugi kepareng rawuh kanthi ngagem busana batik, beskap, utawi kebaya ingkang senada:
            </p>

            <div className="flex justify-center items-center gap-3 pt-2 font-sans">
              {[
                { name: "SOGAN", bg: "bg-[#593922]" },
                { name: "EMAS JAWI", bg: "bg-[#d4af37]" },
                { name: "COKLAT KAYU", bg: "bg-[#382315]" },
                { name: "SEMBADA", bg: "bg-[#8f6a39]" },
                { name: "KRIM", bg: "bg-[#eadcc2]" }
              ].map((swatch, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full border border-[#d4af37]/40 ${swatch.bg}`} />
                  <span className="text-[8px] text-[#baa486]">{swatch.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: GALERI KERATON */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37]">
                DOKUMENTASI
              </span>
              <h2 className="text-3xl font-serif text-[#fbf1db] font-bold mt-1">Potret Bahagia</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(d.galleryImages.length > 0 ? d.galleryImages : [d.coverImage, d.coverImage, d.coverImage, d.coverImage]).map((img, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-lg bg-[#160f0a]">
                  <Image
                    src={img}
                    alt={`Galeri ${i}`}
                    fill
                    className="object-cover sepia-[0.2]"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: KADO & AMPLOP DIGITAL */}
          <section className="bg-[#221710] border border-[#d4af37]/40 rounded-3xl p-8 text-center space-y-6 shadow-xl">
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#d4af37]">
              TANDHA TRESNA
            </span>
            <h3 className="text-2xl font-serif text-[#fbf1db] font-bold">Kado &amp; Amplop Digital</h3>
            <p className="text-xs text-[#baa486] max-w-sm mx-auto leading-relaxed">
              Donga pangestu panjenengan dados berkah ingkang tanpa upami. Kagem ingkang kepareng maringi tandha tresna:
            </p>

            <div className="bg-[#160f0a] border border-[#d4af37]/50 rounded-2xl p-6 max-w-sm mx-auto text-center font-sans shadow-inner">
              <p className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">{d.bankName}</p>
              <p className="text-2xl font-mono font-bold text-white tracking-widest my-2">{d.accountNumber}</p>
              <p className="text-xs text-[#baa486]">Atas Nama: {d.accountHolder}</p>

              <button
                onClick={copyAccount}
                className="mt-5 w-full py-2.5 bg-gradient-to-r from-[#d4af37] to-[#a67c1e] text-[#15100c] font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "REKENING TERSALIN" : "SALIN NOMOR REKENING"}</span>
              </button>
            </div>
          </section>

          {/* SECTION 7: UCAPAN & DONGA PANGESTU */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37]">
                DONGA PANGESTU
              </span>
              <h2 className="text-3xl font-serif text-[#fbf1db] font-bold mt-1">Kirimaken Donga Pangestu</h2>
            </div>

            <form onSubmit={submitWish} className="bg-[#221710] border border-[#d4af37]/40 rounded-3xl p-6 space-y-4 shadow-xl font-sans">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#d4af37] mb-1">
                  ASMA JANGKEP
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Ketik asma panjenengan"
                  className="w-full bg-[#160f0a] border border-[#3d2b1f] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#d4af37] mb-1">
                  KONFIRMASI RAWUH
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Hadir", "Tidak Hadir"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setInputStatus(status)}
                      className={`py-2 text-xs rounded-xl transition-all border ${
                        inputStatus === status 
                          ? "bg-gradient-to-r from-[#d4af37] to-[#a67c1e] text-[#15100c] font-bold border-transparent" 
                          : "border-[#3d2b1f] text-[#baa486] hover:bg-[#1f150e]"
                      }`}
                    >
                      {status === "Hadir" ? "Insya Allah Rawuh" : "Mboten Saged Rawuh"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#d4af37] mb-1">
                  ATUR PANDONGA
                </label>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  rows={3}
                  placeholder="Serataken donga pangestu panjenengan..."
                  className="w-full bg-[#160f0a] border border-[#3d2b1f] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#d4af37] via-[#f7e096] to-[#b38c26] text-[#15100c] font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 transition-all"
              >
                KIRIMAKEN DONGA PANGESTU
              </button>
            </form>

            {/* List Ucapan */}
            <div className="space-y-3 pt-3">
              {wishes.map((w, idx) => (
                <div key={idx} className="bg-[#221710] border border-[#3d2b1f] rounded-2xl p-4 shadow-sm space-y-1">
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="font-bold text-[#fbf1db]">{w.name}</span>
                    <span className="text-[10px] text-[#baa486]">{w.time}</span>
                  </div>
                  <p className="text-xs text-[#baa486] leading-relaxed italic font-serif">&ldquo;{w.message}&rdquo;</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-center pt-12 border-t border-[#3d2b1f] space-y-2">
            <h4 className="text-2xl font-serif text-[#fbf1db] font-bold">{d.groomNickname} &amp; {d.brideNickname}</h4>
            <p className="text-[10px] font-sans tracking-[0.25em] text-[#baa486] uppercase">
              MATUR NUWUN INGKANG TANPA UPAMI AWIH SAKING KASUDARAN PANJENENGAN
            </p>
            <p className="text-[9px] font-sans text-[#7a6247] pt-4">IKUTSENENG PAWIWAHAN ADAT JAWI // MMXXVI</p>
          </footer>

        </div>
      )}
    </div>
  );
}
