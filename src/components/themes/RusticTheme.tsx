"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Clock } from "lucide-react";
import Image from "next/image";

export default function RusticTheme() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5A5042] font-serif selection:bg-[#E8DCC4] overflow-x-hidden">
      {/* Floating Leaves / Decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40 mix-blend-multiply">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80')] bg-cover opacity-20 rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80')] bg-cover opacity-20 rounded-tl-full"></div>
      </div>

      <main className="relative z-10 max-w-md mx-auto bg-white min-h-screen shadow-2xl shadow-[#E8DCC4]/50 border-x border-[#E8DCC4]/30">
        
        {/* Cover Section */}
        <section className="min-h-[100svh] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full"
          >
            <p className="text-sm tracking-[0.3em] uppercase mb-4 text-[#8C7A6B]">The Wedding Of</p>
            <h1 className="text-5xl md:text-6xl mb-6 font-medium text-[#4A4036] leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Romeo <br/> <span className="text-3xl text-[#BFA07A] italic">&amp;</span> <br/> Juliet
            </h1>
            <p className="text-sm tracking-widest text-[#8C7A6B] mb-12">12 . 12 . 2026</p>
            
            <div className="w-48 h-64 mx-auto relative rounded-t-full rounded-b-xl overflow-hidden border-4 border-[#FDFBF7] shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80" 
                alt="Couple"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* Info Section */}
        <section className="py-20 px-8 text-center bg-[#FDFBF7]">
          <Heart className="w-8 h-8 mx-auto text-[#BFA07A] mb-8" />
          <p className="text-lg leading-relaxed mb-12 italic">
            "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami."
          </p>

          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCC4]/30"
            >
              <h3 className="text-2xl mb-4 text-[#4A4036] font-medium">Akad Nikah</h3>
              <div className="flex items-center justify-center gap-2 mb-2 text-[#8C7A6B]">
                <Calendar className="w-4 h-4" /> <span>Minggu, 12 Desember 2026</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4 text-[#8C7A6B]">
                <Clock className="w-4 h-4" /> <span>08.00 WIB - Selesai</span>
              </div>
              <p className="text-sm">Masjid Raya Kota Bandung<br/>Jl. Asia Afrika, Bandung</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCC4]/30"
            >
              <h3 className="text-2xl mb-4 text-[#4A4036] font-medium">Resepsi</h3>
              <div className="flex items-center justify-center gap-2 mb-2 text-[#8C7A6B]">
                <Calendar className="w-4 h-4" /> <span>Minggu, 12 Desember 2026</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4 text-[#8C7A6B]">
                <Clock className="w-4 h-4" /> <span>11.00 WIB - 14.00 WIB</span>
              </div>
              <p className="text-sm">Gedung Serbaguna<br/>Jl. Sudirman, Bandung</p>
            </motion.div>
          </div>
          
          <button className="mt-12 w-full bg-[#BFA07A] text-white py-4 rounded-xl font-medium tracking-wide hover:bg-[#A98963] transition-colors flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" /> Buka Google Maps
          </button>
        </section>

      </main>
    </div>
  );
}
