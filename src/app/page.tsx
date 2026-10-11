"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, MapPin, MailOpen, CalendarClock, Smartphone, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { TEMPLATES_DATA as TEMPLATES } from "@/data/templates";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span className="text-xl font-bold tracking-tight">IkutSeneng</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="text-slate-600 hover:text-rose-500 transition-colors">Fitur</Link>
            <Link href="#templates" className="text-slate-600 hover:text-rose-500 transition-colors">Tema (100+)</Link>
            <Link href="#pricing" className="text-slate-600 hover:text-rose-500 transition-colors">Harga</Link>
          </div>
          <a 
            href="https://wa.me/6289607090592?text=Halo%20Admin%20IkutSeneng,%20saya%20ingin%20membuat%20undangan%20digital."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-rose-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-rose-600 transition-all shadow-md hover:shadow-lg inline-block"
          >
            Buat Undangan
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4" /> Platform Undangan Digital Estetik
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Bagikan Momen Bahagia <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
              Tanpa Batas Ruang & Waktu
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Buat undangan pernikahan digital yang modern dan berkelas. 
            Kelola tamu, RSVP, dan amplop digital dalam satu platform yang canggih.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#templates" className="bg-slate-900 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              Lihat 100+ Tema <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="https://wa.me/6289607090592?text=Halo%20Admin%20IkutSeneng,%20saya%20mau%20tanya%20dan%20konsultasi%20tentang%20undangan%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-base font-semibold hover:bg-slate-50 transition-all inline-flex items-center justify-center"
            >
              Tanya Admin (WA)
            </a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur Lengkap Undangan Modern</h2>
            <p className="text-slate-600">Semua alat canggih yang Anda butuhkan, dikemas dalam desain elegan.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MailOpen, title: "RSVP & Buku Tamu Digital", desc: "Ketahui secara pasti siapa saja yang hadir. Tamu dapat mengirimkan ucapan doa secara langsung." },
              { icon: MapPin, title: "Integrasi Google Maps", desc: "Tamu cukup klik tombol navigasi dan langsung diarahkan ke lokasi resepsi atau akad." },
              { icon: Smartphone, title: "Amplop Digital (Cashless)", desc: "Terima hadiah, angpao, atau kado secara cashless langsung ke rekening atau e-wallet Anda." },
              { icon: CalendarClock, title: "Save The Date (Kalender)", desc: "Pengingat otomatis di kalender smartphone tamu agar momen penting Anda tidak terlewatkan." },
              { icon: Sparkles, title: "Animasi & Musik Latar", desc: "Berikan sentuhan personal dengan backsound lagu favorit dan animasi yang memukau." },
              { icon: Heart, title: "Custom Link & Nama Tamu", desc: "Buat setiap tamu merasa spesial dengan mencantumkan nama mereka di link undangan khusus." },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 transition-all"
              >
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600 mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section id="templates" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Koleksi Tema Eksklusif</h2>
              <p className="text-slate-400">Pilih dari 100+ desain arsitektur tema kami yang terus bertambah.</p>
            </div>
            <button className="mt-6 md:mt-0 text-rose-400 font-medium hover:text-rose-300 flex items-center gap-2">
              Jelajahi Semua 100+ Tema <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {TEMPLATES.map((template, idx) => (
              <Link href={`/tema/${template.id}`} key={idx}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                >
                  <div className="aspect-[3/4] relative">
                    <Image 
                      src={template.image} 
                      alt={template.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
                    <div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-3 inline-block">
                        {template.category}
                      </span>
                      <h3 className="text-2xl font-bold">{template.name}</h3>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilihan Paket Sesuai Kebutuhan</h2>
            <p className="text-slate-600">Investasi terbaik untuk membagikan kebahagiaan Anda secara profesional.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="p-8 rounded-3xl border border-slate-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Silver (Basic)</h3>
              <div className="text-4xl font-extrabold mb-6">Rp 99k</div>
              <ul className="space-y-4 mb-8">
                {['Desain Standard', 'Nama Tamu Unlimited', 'RSVP via WhatsApp', 'Musik Latar', 'Masa Aktif 3 Bulan'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/6289607090592?text=Halo%20Admin,%20saya%20ingin%20pesan%20paket%20Silver%20(Basic)%20seharga%20Rp99k" target="_blank" rel="noopener noreferrer" className="block text-center w-full py-3 rounded-xl border-2 border-slate-200 font-semibold hover:border-slate-800 hover:bg-slate-800 hover:text-white transition-all">
                Pilih Silver
              </a>
            </div>
            
            {/* Premium Plan */}
            <div className="p-8 rounded-3xl border-2 border-rose-500 bg-rose-50 relative transform md:-translate-y-4 shadow-xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Paling Laris
              </div>
              <h3 className="text-xl font-bold mb-2">Gold (Premium)</h3>
              <div className="text-4xl font-extrabold mb-6">Rp 199k</div>
              <ul className="space-y-4 mb-8">
                {['Semua Fitur Silver', 'Pilihan 100+ Tema Premium', 'Buku Tamu & RSVP Digital', 'Amplop Digital / Kado', 'Integrasi Google Maps', 'Masa Aktif 6 Bulan'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-rose-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/6289607090592?text=Halo%20Admin,%20saya%20ingin%20pesan%20paket%20Gold%20(Premium)%20seharga%20Rp199k" target="_blank" rel="noopener noreferrer" className="block text-center w-full py-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-all shadow-md hover:shadow-lg">
                Pilih Gold
              </a>
            </div>

            {/* Exclusive Plan */}
            <div className="p-8 rounded-3xl border border-slate-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Platinum (Eksklusif)</h3>
              <div className="text-4xl font-extrabold mb-6">Rp 349k</div>
              <ul className="space-y-4 mb-8">
                {['Semua Fitur Gold', 'Custom Domain (namakamu.com)', 'Galeri Video Prewedding', 'Filter Instagram Khusus', 'Prioritas Dukungan 24/7', 'Masa Aktif 1 Tahun'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-slate-900 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/6289607090592?text=Halo%20Admin,%20saya%20ingin%20pesan%20paket%20Platinum%20(Eksklusif)%20seharga%20Rp349k" target="_blank" rel="noopener noreferrer" className="block text-center w-full py-3 rounded-xl border-2 border-slate-200 font-semibold hover:border-slate-800 hover:bg-slate-800 hover:text-white transition-all">
                Pilih Platinum
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rose-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Siap Membuat Undangan Anda?</h2>
          <p className="text-rose-100 text-lg mb-8">
            Bergabung dengan ratusan pasangan lain yang telah membagikan kebahagiaannya bersama IkutSeneng.
          </p>
          <a 
            href="https://wa.me/6289607090592?text=Halo%20Admin%20IkutSeneng,%20saya%20siap%20membuat%20undangan%20digital." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-white text-rose-500 px-8 py-4 rounded-full text-lg font-bold hover:bg-rose-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Mulai Buat Sekarang - Chat WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0 text-white">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span className="text-xl font-bold">IkutSeneng</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center md:text-left text-sm opacity-60">
          © 2026 IkutSeneng Digital Invitation. All rights reserved. Membangun kenangan yang tak terlupakan.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6289607090592?text=Halo%20Admin%20IkutSeneng,%20saya%20butuh%20bantuan%20dan%20informasi%20undangan%20digital."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Admin"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm font-semibold pl-1">
          Chat CS Kami
        </span>
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
