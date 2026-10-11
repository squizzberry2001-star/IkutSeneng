"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Copy, Check, Send, Gift, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { InvitationData, DEFAULT_INVITATION_DATA } from "@/types/invitation";
import MusicPlayer from "@/components/MusicPlayer";

interface ThemeProps {
  data?: Partial<InvitationData>;
}

export default function MinimalistTheme({ data = {} }: ThemeProps) {
  const d = { ...DEFAULT_INVITATION_DATA, ...data };
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const [comments, setComments] = useState<{ name: string; msg: string; status: string; date: string }[]>([
    {
      name: "Dimas Aditya",
      msg: "Happy wedding! Wishing you both a lifetime of love and happiness.",
      status: "Hadir",
      date: "Baru saja"
    }
  ]);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(d.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;
    setComments([
      { name: guestName, msg: guestMessage, status: attendance, date: "Baru saja" },
      ...comments
    ]);
    setGuestMessage("");
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden relative">
      {/* Background Music Player */}
      <MusicPlayer musicUrl={d.musicUrl} musicTitle={d.musicTitle} />

      <main className="max-w-md mx-auto min-h-screen relative border-x border-gray-100">
        
        {/* Cover Section */}
        <section className="min-h-[100svh] flex flex-col justify-between p-8 sm:p-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="pt-12"
          >
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Wedding Invitation</h2>
            <h1 className="text-5xl font-extrabold tracking-tighter mb-4">
              {d.groomNickname}<br/>&amp; {d.brideNickname}
            </h1>
            <p className="text-sm font-medium text-gray-600">{d.weddingDate}</p>

            <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden my-6 border border-gray-100 shadow-md">
              <Image 
                src={d.coverImage} 
                alt="Couple"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="pb-6 flex flex-col items-start"
          >
            <div className="w-full h-[1px] bg-gray-200 mb-6"></div>
            <p className="text-xs text-gray-500 mb-4 max-w-[260px] leading-relaxed">
              "{d.quote}"
            </p>
            <ArrowDown className="w-4 h-4 text-gray-400 animate-bounce" />
          </motion.div>
        </section>

        {/* Mempelai Section */}
        <section className="py-16 px-8 sm:px-10 bg-gray-50 border-t border-gray-100 text-left">
          <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-8">The Happy Couple</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-2xl font-extrabold tracking-tight">{d.groomName}</h4>
              <p className="text-xs text-gray-500 mt-1">{d.groomParents}</p>
            </div>
            <span className="text-xl text-gray-400 font-light block">&amp;</span>
            <div>
              <h4 className="text-2xl font-extrabold tracking-tight">{d.brideName}</h4>
              <p className="text-xs text-gray-500 mt-1">{d.brideParents}</p>
            </div>
          </div>
        </section>

        {/* Info Acara */}
        <section className="py-16 px-8 sm:px-10 bg-white border-t border-gray-100">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Akad Nikah</h3>
              <p className="font-semibold text-xs text-gray-800 mb-1">{d.akadDate} • {d.akadTime}</p>
              <p className="text-gray-500 text-xs mb-3">{d.akadLocation}, {d.akadAddress}</p>
              <a 
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold tracking-widest uppercase border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all inline-flex items-center gap-1.5"
              >
                <MapPin className="w-3 h-3" /> Get Directions
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Resepsi</h3>
              <p className="font-semibold text-xs text-gray-800 mb-1">{d.resepsiDate} • {d.resepsiTime}</p>
              <p className="text-gray-500 text-xs mb-3">{d.resepsiLocation}, {d.resepsiAddress}</p>
              <a 
                href={d.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold tracking-widest uppercase border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all inline-flex items-center gap-1.5"
              >
                <MapPin className="w-3 h-3" /> Get Directions
              </a>
            </motion.div>
          </div>
        </section>

        {/* Galeri Foto */}
        {d.galleryImages && d.galleryImages.length > 0 && (
          <section className="py-16 px-8 sm:px-10 bg-gray-50 border-t border-gray-100">
            <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">Gallery</h3>
            <div className="grid grid-cols-2 gap-3">
              {d.galleryImages.map((img, i) => (
                <div key={i} className="aspect-[3/4] relative rounded-xl overflow-hidden bg-gray-200">
                  <Image src={img} alt={`Gallery ${i+1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Amplop Digital */}
        <section className="py-16 px-8 sm:px-10 bg-white border-t border-gray-100 text-center">
          <Gift className="w-6 h-6 mx-auto mb-2 text-gray-800" />
          <h3 className="text-xl font-bold mb-2">Digital Gift</h3>
          <p className="text-xs text-gray-500 mb-6">Your presence is the greatest gift. For cashless gifts:</p>
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 max-w-xs mx-auto">
            <p className="text-xs font-bold uppercase tracking-wider mb-1">{d.bankName}</p>
            <p className="text-xl font-mono font-bold tracking-wider mb-1">{d.accountNumber}</p>
            <p className="text-xs text-gray-500 mb-4">a.n {d.accountHolder}</p>
            <button
              onClick={handleCopyAccount}
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-800 transition-all"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy Account"}
            </button>
          </div>
        </section>

        {/* Guestbook RSVP */}
        <section className="py-16 px-8 sm:px-10 bg-gray-50 border-t border-gray-100">
          <h3 className="text-xl font-bold mb-2">RSVP &amp; Wishes</h3>
          <p className="text-xs text-gray-500 mb-6">Leave your warm wishes and attendance confirmation</p>

          <form onSubmit={handleAddComment} className="space-y-3 mb-8">
            <input 
              type="text" 
              placeholder="Your Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-black"
              required
            />
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-black"
            >
              <option value="Hadir">Attending</option>
              <option value="Tidak Hadir">Unable to attend</option>
              <option value="Ragu-ragu">Tentative</option>
            </select>
            <textarea 
              rows={3} 
              placeholder="Write your prayers and wishes..."
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-black"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3 h-3" /> Submit Wishes
            </button>
          </form>

          {/* List Ucapan */}
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {comments.map((c, i) => (
              <div key={i} className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold">{c.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium">{c.status}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{c.msg}</p>
                <span className="text-[9px] text-gray-400 block mt-1">{c.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-gray-400 bg-white border-t border-gray-100">
          <p>IkutSeneng Digital Invitation</p>
        </footer>

      </main>
    </div>
  );
}
