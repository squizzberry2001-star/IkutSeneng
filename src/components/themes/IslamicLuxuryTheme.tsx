"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Calendar, Clock, MapPin, Gift, Copy, Check, Send, 
  Volume2, VolumeX, MailOpen, CalendarPlus, Sparkles, Moon
} from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";

interface ThemeProps {
  data?: Partial<InvitationData>;
  guestName?: string;
}

export default function IslamicLuxuryTheme({ 
  data = {}, 
  guestName = "Tamu Undangan" 
}: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(guestName);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 75,
    hours: 16,
    minutes: 40,
    seconds: 12
  });

  const [copied, setCopied] = useState(false);
  const [wishes, setWishes] = useState([
    {
      name: "Ustadz Ahmad & Keluarga",
      status: "Hadir",
      message: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Semoga menjadi keluarga sakinah mawaddah warahmah.",
      time: "1 jam lalu"
    },
    {
      name: "Hj. Nurul Khotimah",
      status: "Hadir",
      message: "Alhamdulillah selamat berbahagia anak-anakku, senantiasa dilimpahi rezeki dan keberkahan rumah tangga.",
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
    <div className="relative min-h-screen bg-[#041c16] text-[#e8f1ed] font-sans antialiased selection:bg-[#d4af37] selection:text-[#041c16]">
      {/* Hidden Audio */}
      <audio ref={audioRef} src={d.musicUrl} loop preload="auto" />

      {/* Floating Islamic Gold Music Controller */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={toggleMusic}
            className="flex items-center gap-2 bg-[#09352a]/95 text-[#e5c572] border border-[#d4af37]/60 px-4 py-2.5 rounded-full shadow-2xl text-xs tracking-wider backdrop-blur-md hover:bg-[#0c4335] transition-all"
          >
            <Moon className="w-3.5 h-3.5 text-[#e5c572]" />
            <span className="text-[11px] font-mono">{isPlaying ? "ISLAMIC NASHEED" : "PAUSED"}</span>
            {isPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </motion.div>
      )}

      {/* COVER SCREEN - ROYAL EMERALD & GOLD MOROCCAN ARCH */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="islamic-cover-screen"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-gradient-to-b from-[#02130f] via-[#052820] to-[#02130f] p-6 sm:p-10 overflow-hidden text-center"
          >
            {/* Background Arch & Pattern */}
            <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Top Bismillah Calligraphy */}
            <div className="relative z-10 pt-4">
              <p className="font-serif text-2xl sm:text-3xl text-[#e5c572] tracking-wide mb-1">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="text-[11px] font-mono tracking-[0.25em] text-[#93b8aa] uppercase">
                THE SACRED UNION &amp; WALIMATUL &apos;URSY
              </p>
            </div>

            {/* Moroccan Arch Frame for Photo */}
            <div className="relative z-10 my-auto flex flex-col items-center">
              <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-t-full border-4 border-[#d4af37] p-2 bg-[#08352b] shadow-[0_0_35px_rgba(212,175,55,0.25)] overflow-hidden">
                <div className="relative w-full h-full rounded-t-full overflow-hidden">
                  <Image
                    src={d.coverImage}
                    alt="Cover Islamic"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041c16]/80 via-transparent to-transparent" />
                </div>
              </div>

              {/* Names */}
              <div className="mt-6 space-y-1">
                <h1 className="text-3xl sm:text-5xl font-serif text-[#f5deb3] tracking-wide">
                  {d.groomNickname} <span className="text-[#d4af37] font-light">&amp;</span> {d.brideNickname}
                </h1>
                <p className="text-xs font-mono tracking-widest text-[#a8cfbe]">
                  {d.weddingDate}
                </p>
              </div>
            </div>

            {/* Guest Invitation & Open Button */}
            <div className="relative z-10 w-full max-w-sm border-t border-[#d4af37]/40 pt-5">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86ab9c] mb-1">
                KEPADA YTH. BAPAK/IBU/SAUDARA/I:
              </p>
              <h3 className="text-lg font-serif font-bold text-white mb-5">
                {currentGuest}
              </h3>

              <button
                onClick={handleOpenInvitation}
                className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f3d078] to-[#c99b38] text-[#041c16] font-bold text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_5px_20px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
              >
                <MailOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>BUKA UNDANGAN</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN INVITATION CONTENT: ISLAMIC MOROCCAN LUXURY */}
      {isOpen && (
        <div className="max-w-xl mx-auto px-6 py-12 space-y-24">

          {/* SECTION 1: AYAT AL-QURAN & HERO */}
          <section className="text-center pt-6 space-y-6 bg-[#07261e] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            <p className="font-serif text-3xl sm:text-4xl text-[#e5c572] leading-relaxed">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="text-xs font-mono tracking-[0.25em] uppercase text-[#96c2b1]">
              SURAH AR-RUM AYAT 21
            </p>

            {/* Quran Verse */}
            <div className="bg-[#041913] border border-[#d4af37]/30 rounded-2xl p-6 space-y-3">
              <p className="text-lg font-serif text-[#ffd97d] leading-loose text-right">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
              </p>
              <p className="text-xs text-[#b8d9cc] leading-relaxed italic border-t border-[#093d30] pt-3">
                &ldquo;{d.quote}&rdquo;
              </p>
            </div>

            {/* Countdown Hijri & Gregorian */}
            <div className="pt-4">
              <p className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase mb-3">
                Menghitung Hari Menuju Ikrar Suci:
              </p>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
                {[
                  { label: "HARI", val: timeLeft.days },
                  { label: "JAM", val: timeLeft.hours },
                  { label: "MENIT", val: timeLeft.minutes },
                  { label: "DETIK", val: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#052119] border border-[#d4af37]/40 p-3 rounded-xl text-center">
                    <span className="block text-2xl font-mono font-bold text-[#f5deb3]">{String(item.val).padStart(2, "0")}</span>
                    <span className="text-[9px] font-mono text-[#8cbda9] uppercase">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: MEMPELAI MUSLIM & MUSLIMAH */}
          <section className="space-y-12">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] border border-[#d4af37]/50 px-4 py-1 rounded-full">
                KEDUA MEMPELAI
              </span>
              <h2 className="text-3xl font-serif text-[#ffd97d] mt-4">Pasangan Pengantin</h2>
              <p className="text-xs text-[#9ebfad] mt-1">Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan</p>
            </div>

            {/* Mempelai Pria */}
            <div className="bg-[#07261e] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
              <div className="relative w-40 h-52 rounded-t-full border-2 border-[#d4af37] overflow-hidden flex-shrink-0 bg-[#041c16]">
                <Image
                  src={d.galleryImages[0] || d.coverImage}
                  alt={d.groomName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">MEMPELAI PRIA</span>
                <h3 className="text-2xl font-serif text-[#fce8b2]">{d.groomName}</h3>
                <p className="text-xs text-[#b8d9cc] leading-relaxed">{d.groomParents}</p>
                <p className="text-[11px] font-mono text-[#84b8a2] pt-1">@{d.groomNickname.toLowerCase()}</p>
              </div>
            </div>

            {/* Mempelai Wanita */}
            <div className="bg-[#07261e] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row-reverse items-center gap-6 shadow-xl">
              <div className="relative w-40 h-52 rounded-t-full border-2 border-[#d4af37] overflow-hidden flex-shrink-0 bg-[#041c16]">
                <Image
                  src={d.galleryImages[1] || d.coverImage}
                  alt={d.brideName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-right space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">MEMPELAI WANITA</span>
                <h3 className="text-2xl font-serif text-[#fce8b2]">{d.brideName}</h3>
                <p className="text-xs text-[#b8d9cc] leading-relaxed">{d.brideParents}</p>
                <p className="text-[11px] font-mono text-[#84b8a2] pt-1">@{d.brideNickname.toLowerCase()}</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: AGENDA ACARA - AKAD & WALIMATUL 'URSY */}
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37]">
                RANGKAIAN ACARA
              </span>
              <h2 className="text-3xl font-serif text-[#ffd97d] mt-1">Agenda Walimatul &apos;Ursy</h2>
            </div>

            {/* Akad Nikah */}
            <div className="bg-[#07261e] border border-[#d4af37]/40 rounded-2xl p-6 relative shadow-xl">
              <div className="flex justify-between items-center border-b border-[#0d4a3b] pb-3 mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37]">AKAD NIKAH &amp; IJAB QABUL</span>
                <span className="text-xs font-mono text-[#e5c572] bg-[#041c16] px-2.5 py-1 rounded-md border border-[#d4af37]/30">{d.akadTime}</span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-mono text-[#a9d1c1] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#d4af37]" /> {d.akadDate}
                </p>
                <p className="text-sm font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d4af37]" /> {d.akadLocation}
                </p>
                <p className="text-xs text-[#8ab8a5] pl-6 leading-relaxed">{d.akadAddress}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0d4a3b] flex justify-end">
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b38f2b] text-[#041c16] font-bold text-xs font-mono rounded-lg uppercase hover:brightness-110 transition-all"
                >
                  PANDUAN LOKASI (GOOGLE MAPS) →
                </a>
              </div>
            </div>

            {/* Walimatul 'Ursy / Resepsi */}
            <div className="bg-[#07261e] border border-[#d4af37]/40 rounded-2xl p-6 relative shadow-xl">
              <div className="flex justify-between items-center border-b border-[#0d4a3b] pb-3 mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37]">WALIMATUL &apos;URSY (RESEPSI)</span>
                <span className="text-xs font-mono text-[#e5c572] bg-[#041c16] px-2.5 py-1 rounded-md border border-[#d4af37]/30">{d.resepsiTime}</span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-mono text-[#a9d1c1] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#d4af37]" /> {d.resepsiDate}
                </p>
                <p className="text-sm font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d4af37]" /> {d.resepsiLocation}
                </p>
                <p className="text-xs text-[#8ab8a5] pl-6 leading-relaxed">{d.resepsiAddress}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#0d4a3b] flex justify-end">
                <a
                  href={d.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#b38f2b] text-[#041c16] font-bold text-xs font-mono rounded-lg uppercase hover:brightness-110 transition-all"
                >
                  PANDUAN LOKASI (GOOGLE MAPS) →
                </a>
              </div>
            </div>
          </section>

          {/* SECTION 4: DRESSCODE SYAR'I & ELEGAN */}
          <section className="bg-[#07261e] border border-[#d4af37]/40 rounded-3xl p-8 text-center space-y-6 shadow-xl">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#d4af37]">
              PANDUAN BUSANA (DRESS CODE)
            </span>
            <h3 className="text-2xl font-serif text-[#ffd97d]">Nuansa Hijau Zamrud &amp; Emas</h3>
            <p className="text-xs text-[#b8d9cc] max-w-sm mx-auto leading-relaxed">
              Merupakan suatu kehormatan bagi kami apabila para tamu undangan berkenan mengenakan busana sopan bernuansa senada:
            </p>

            <div className="flex justify-center items-center gap-3 pt-2">
              {[
                { name: "EMERALD", bg: "bg-[#0b5345]" },
                { name: "SAGE", bg: "bg-[#52796f]" },
                { name: "ROYAL GOLD", bg: "bg-[#d4af37]" },
                { name: "CHAMPAGNE", bg: "bg-[#ebd49b]" },
                { name: "IVORY PEARL", bg: "bg-[#fcf8ec]" }
              ].map((swatch, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-full border border-[#d4af37]/40 ${swatch.bg}`} />
                  <span className="text-[8px] font-mono text-[#a3c9b9]">{swatch.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: GALERI FOTO */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37]">
                DOKUMENTASI
              </span>
              <h2 className="text-3xl font-serif text-[#ffd97d] mt-1">Potret Bahagia</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(d.galleryImages.length > 0 ? d.galleryImages : [d.coverImage, d.coverImage, d.coverImage, d.coverImage]).map((img, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-2xl border-2 border-[#d4af37]/40 overflow-hidden shadow-lg bg-[#041c16]">
                  <Image
                    src={img}
                    alt={`Galeri ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: INFAQ & AMPLOP DIGITAL */}
          <section className="bg-[#07261e] border border-[#d4af37]/40 rounded-3xl p-8 text-center space-y-6 shadow-xl">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#d4af37]">
              TANDA KASIH &amp; HADIAH
            </span>
            <h3 className="text-2xl font-serif text-[#ffd97d]">Amplop Digital / Kado Pernikahan</h3>
            <p className="text-xs text-[#b8d9cc] max-w-sm mx-auto leading-relaxed">
              Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital, dapat melalui rekening berikut:
            </p>

            <div className="bg-[#041c16] border border-[#d4af37]/50 rounded-2xl p-6 max-w-sm mx-auto text-center shadow-inner">
              <p className="text-xs font-mono font-bold text-[#d4af37] uppercase tracking-wider">{d.bankName}</p>
              <p className="text-2xl font-mono font-bold text-white tracking-widest my-2">{d.accountNumber}</p>
              <p className="text-xs font-sans text-[#a8cfbd]">Atas Nama: {d.accountHolder}</p>

              <button
                onClick={copyAccount}
                className="mt-5 w-full py-2.5 bg-gradient-to-r from-[#d4af37] to-[#b38f2b] text-[#041c16] font-bold text-xs font-mono tracking-wider uppercase rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "NOMOR REKENING TERSALIN" : "SALIN NOMOR REKENING"}</span>
              </button>
            </div>
          </section>

          {/* SECTION 7: UCAPAN DOA & RESTU */}
          <section className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37]">
                DOA WALIMAH
              </span>
              <h2 className="text-3xl font-serif text-[#ffd97d] mt-1">Kirimkan Ucapan &amp; Doa</h2>
            </div>

            <form onSubmit={submitWish} className="bg-[#07261e] border border-[#d4af37]/40 rounded-3xl p-6 space-y-4 shadow-xl">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#d4af37] mb-1">
                  NAMA LENGKAP
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-[#041c16] border border-[#0d4a3b] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#d4af37] mb-1">
                  KONFIRMASI KEHADIRAN
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Hadir", "Tidak Hadir"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setInputStatus(status)}
                      className={`py-2 text-xs font-mono rounded-xl transition-all border ${
                        inputStatus === status 
                          ? "bg-gradient-to-r from-[#d4af37] to-[#b38f2b] text-[#041c16] font-bold border-transparent" 
                          : "border-[#0d4a3b] text-[#8cbda9] hover:bg-[#052820]"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#d4af37] mb-1">
                  UNTALIAN DOA &amp; UCAPAN
                </label>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  rows={3}
                  placeholder="Tuliskan untaian doa berkah untuk kedua mempelai..."
                  className="w-full bg-[#041c16] border border-[#0d4a3b] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#d4af37] via-[#f3d078] to-[#c99b38] text-[#041c16] font-bold text-xs font-mono uppercase tracking-widest rounded-xl hover:brightness-110 transition-all"
              >
                KIRIMKAN DOA RESTU
              </button>
            </form>

            {/* Feed Ucapan */}
            <div className="space-y-3 pt-3">
              {wishes.map((w, idx) => (
                <div key={idx} className="bg-[#07261e] border border-[#0d4a3b] rounded-2xl p-4 shadow-sm space-y-1">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-[#f5deb3]">{w.name}</span>
                    <span className="text-[10px] text-[#86ab9c]">{w.time}</span>
                  </div>
                  <p className="text-xs text-[#b8d9cc] leading-relaxed">&ldquo;{w.message}&rdquo;</p>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-center pt-12 border-t border-[#0d4a3b] space-y-2">
            <h4 className="text-2xl font-serif text-[#ffd97d]">{d.groomNickname} &amp; {d.brideNickname}</h4>
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#86ab9c] uppercase">
              JAZAKUMULLAH KHAIRAN KATSIRAN ATAS KEHADIRAN &amp; DOA RESTU ANDA
            </p>
            <p className="text-[9px] font-mono text-[#4e7a68] pt-4">IKUTSENENG ISLAMIC SERIES // MMXXVI</p>
          </footer>

        </div>
      )}
    </div>
  );
}
