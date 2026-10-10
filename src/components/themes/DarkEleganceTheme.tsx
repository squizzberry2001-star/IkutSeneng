"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, CalendarClock } from "lucide-react";
import Image from "next/image";

export default function DarkEleganceTheme() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-sans overflow-x-hidden">
      
      <main className="max-w-md mx-auto bg-[#111111] min-h-screen relative shadow-2xl border-x border-[#333]">
        
        {/* Cover Section */}
        <section className="min-h-[100svh] flex flex-col items-center justify-center p-8 text-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a2118] via-[#111111] to-[#111111] opacity-50"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 w-full"
          >
            <Sparkles className="w-6 h-6 mx-auto text-[#D4AF37] mb-6" />
            <p className="text-xs tracking-[0.4em] uppercase mb-6 text-[#A0A0A0]">We Invite You To Celebrate</p>
            
            <h1 className="text-6xl mb-4 font-bold text-[#D4AF37] tracking-tight">
              A <span className="italic font-serif font-normal">&amp;</span> B
            </h1>
            
            <div className="w-full h-80 mx-auto relative my-10 rounded-sm overflow-hidden border border-[#D4AF37]/30">
              <Image 
                src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80" 
                alt="Couple"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>
            </div>

            <h2 className="text-2xl font-semibold tracking-widest text-white mb-2">ARTHUR & BELLA</h2>
            <p className="text-sm tracking-[0.2em] text-[#D4AF37]">24 . 10 . 2026</p>
          </motion.div>
        </section>

        {/* Info Section */}
        <section className="py-20 px-8 bg-[#0F0F0F] relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-[#D4AF37]/50"></div>
          
          <div className="text-center mt-8">
            <h3 className="text-[#D4AF37] text-sm tracking-widest uppercase mb-10">Event Details</h3>
            
            <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="border border-[#222] p-8 rounded-lg relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h4 className="text-xl text-white mb-2 font-serif italic">Holy Matrimony</h4>
                <p className="text-[#D4AF37] text-sm mb-4">Saturday, 24 October 2026<br/>09.00 AM</p>
                <p className="text-xs text-[#888] leading-relaxed">St. Peter Cathedral<br/>Jakarta Pusat</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="border border-[#222] p-8 rounded-lg relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h4 className="text-xl text-white mb-2 font-serif italic">Grand Reception</h4>
                <p className="text-[#D4AF37] text-sm mb-4">Saturday, 24 October 2026<br/>19.00 PM</p>
                <p className="text-xs text-[#888] leading-relaxed">The Ritz-Carlton Ballroom<br/>Jakarta Selatan</p>
              </motion.div>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              <button className="w-full bg-transparent border border-[#D4AF37] text-[#D4AF37] py-4 rounded font-medium tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-2 uppercase">
                <MapPin className="w-4 h-4" /> View Location
              </button>
              <button className="w-full bg-[#D4AF37] text-black py-4 rounded font-medium tracking-widest text-xs hover:bg-[#C39F2B] transition-all flex items-center justify-center gap-2 uppercase">
                <CalendarClock className="w-4 h-4" /> Save The Date
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
