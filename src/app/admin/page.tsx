"use client";

import { useState } from "react";
import { LayoutDashboard, Users, Palette, Settings, Plus, LogOut, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { TEMPLATES_DATA } from "@/data/templates";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side protection for demo (In real app, use NextAuth / Backend)
    if (password === "admin123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Password salah!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Area Rahasia Admin</h1>
            <p className="text-slate-500 text-sm">Masukkan password untuk mengakses dashboard IkutSeneng.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all"
            >
              Masuk
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-900">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <Palette className="w-6 h-6 text-rose-500" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>
        <nav className="space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl text-white">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <Palette className="w-5 h-5" /> Kelola Tema
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <Users className="w-5 h-5" /> Klien (Users)
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="w-5 h-5" /> Pengaturan
          </a>
        </nav>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" /> Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard Utama</h1>
            <p className="text-slate-500">Ringkasan performa bisnis undangan digital Anda.</p>
          </div>
          <div className="flex gap-2">
            <Link 
              href="/builder"
              className="bg-rose-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-rose-600 transition-all flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Buka Studio Builder
            </Link>
          </div>
        </header>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Klien", value: "24", trend: "+12% dari bulan lalu" },
            { label: "Tema Tersedia", value: TEMPLATES_DATA.length.toString(), trend: "5 Kategori" },
            { label: "Pendapatan (Bulan Ini)", value: "Rp 4.580.000", trend: "+5% dari bulan lalu" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.label}</h3>
              <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-xs text-emerald-500 font-medium">{stat.trend}</div>
            </div>
          ))}
        </div>

        {/* Templates Overview */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Katalog Tema Terkini</h2>
            <button className="text-sm text-rose-500 font-medium hover:text-rose-600">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm">
                  <th className="p-4 font-medium">Nama Tema</th>
                  <th className="p-4 font-medium">Kategori</th>
                  <th className="p-4 font-medium">Harga</th>
                  <th className="p-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {TEMPLATES_DATA.map((template) => (
                  <tr key={template.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 overflow-hidden relative">
                        <img src={template.image} alt={template.name} className="object-cover w-full h-full" />
                      </div>
                      <span className="font-semibold text-slate-900">{template.name}</span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="px-2 py-1 bg-slate-100 rounded-md text-xs">{template.category}</span>
                    </td>
                    <td className="p-4 text-slate-600">Rp {template.price.toLocaleString("id-ID")}</td>
                    <td className="p-4 text-right">
                      <button className="text-slate-400 hover:text-slate-900 p-2">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
