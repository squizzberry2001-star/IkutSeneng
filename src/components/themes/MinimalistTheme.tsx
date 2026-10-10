"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";

export default function MinimalistTheme() {
  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      <main className="max-w-md mx-auto min-h-screen relative border-x border-gray-100">
        
        {/* Cover Section */}
        <section className="h-[100svh] flex flex-col justify-between p-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="pt-20"
          >
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Wedding Invitation</h2>
            <h1 className="text-5xl font-extrabold tracking-tighter mb-4">Danial<br/>&amp; Sarah</h1>
            <p className="text-sm font-medium">Sunday, November 15th, 2026</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="pb-10 flex flex-col items-start"
          >
            <div className="w-full h-[1px] bg-gray-200 mb-8"></div>
            <p className="text-xs text-gray-500 mb-6 max-w-[200px]">We joyfully request the pleasure of your company as we tie the knot.</p>
            <ArrowDown className="w-5 h-5 text-gray-300 animate-bounce" />
          </motion.div>
        </section>

        {/* Info Section */}
        <section className="py-20 px-10 bg-gray-50">
          <div className="space-y-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4 tracking-tight">The <br/> Ceremony</h3>
              <p className="font-medium text-sm mb-1">09.00 AM</p>
              <p className="text-gray-500 text-sm mb-4">Botanical Gardens, Glasshouse<br/>123 Nature Street, City</p>
              <button className="text-xs font-bold tracking-widest uppercase border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Get Directions
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4 tracking-tight">The <br/> Reception</h3>
              <p className="font-medium text-sm mb-1">11.30 AM - Drop</p>
              <p className="text-gray-500 text-sm mb-4">Botanical Gardens, Main Hall<br/>123 Nature Street, City</p>
              <button className="text-xs font-bold tracking-widest uppercase border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all flex items-center gap-2">
                <MapPin className="w-3 h-3" /> Get Directions
              </button>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
