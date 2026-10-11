import Link from "next/link";
import { Heart, Sparkles, MessageCircle } from "lucide-react";
import KatsudotoCatalog from "@/components/KatsudotoCatalog";

export const metadata = {
  title: "Wujudkan Desain Undangan Impianmu - IkutSeneng",
  description: "Tentukan tema, warna, ornament, dan impian lain yang kamu inginkan bersama tim desain yang sudah ahli dibidangnya.",
};

export default function DesainPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#2C2925] flex flex-col font-sans">
      {/* Katsudoto Style Navbar */}
      <nav className="fixed w-full z-50 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E6E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span className="text-xl font-serif font-bold tracking-tight text-[#2A241E]">IkutSeneng</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B5F52]">
            <Link href="/" className="hover:text-[#2A241E] transition-colors">Beranda</Link>
            <Link href="/desain" className="text-[#2A241E] font-bold border-b-2 border-[#2A241E] pb-1">Katalog Desain</Link>
            <Link href="/builder" className="hover:text-[#2A241E] transition-colors flex items-center gap-1 text-rose-600 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Studio Builder
            </Link>
            <Link href="/#pricing" className="hover:text-[#2A241E] transition-colors">Harga</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/builder"
              className="hidden sm:inline-flex px-4 py-2 rounded-full border border-[#DDD6C9] text-xs font-semibold hover:bg-white transition-colors"
            >
              Buat Undangan
            </Link>
            <a
              href="https://wa.me/6289607090592?text=Halo%20Admin%20IkutSeneng,%20saya%20tertarik%20dengan%20desain%20undangan%20digital."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2A241E] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-black transition-all shadow-sm"
            >
              Konsultasi (WA)
            </a>
          </div>
        </div>
      </nav>

      {/* Main Catalog View */}
      <main className="flex-1 pt-18">
        <KatsudotoCatalog showHero={true} />
      </main>

      {/* Footer */}
      <footer className="bg-[#2A241E] text-[#B8ADA0] py-16 border-t border-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-12 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-white mb-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span className="text-xl font-serif font-bold">IkutSeneng</span>
              </div>
              <p className="text-xs text-[#9E9283] max-w-sm">
                Solusi undangan digital modern, mewah, dan praktis dengan puluhan pilihan tema tanpa biaya tambahan.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-[#D8CEBF]">
              <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              <Link href="/desain" className="hover:text-white transition-colors">Katalog Desain</Link>
              <Link href="/builder" className="hover:text-white transition-colors">Studio Builder</Link>
              <Link href="/#pricing" className="hover:text-white transition-colors">Paket Harga</Link>
              <Link href="/admin" className="hover:text-white transition-colors">Admin Area</Link>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs opacity-60 gap-4">
            <p>© 2026 IkutSeneng Digital Invitation. All rights reserved.</p>
            <p>Inspirasi Desain Terkurasi &amp; Eksklusif</p>
          </div>
        </div>
      </footer>

      {/* Floating WA Button */}
      <a
        href="https://wa.me/6289607090592?text=Halo%20Admin%20IkutSeneng,%20saya%20butuh%20bantuan%20memilih%20desain."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Admin"
        className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm font-semibold pl-1">
          Tanya di WhatsApp
        </span>
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
