"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  musicUrl?: string;
  musicTitle?: string;
}

export default function MusicPlayer({ musicUrl, musicTitle }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && musicUrl) {
      audioRef.current.src = musicUrl;
      audioRef.current.load();
    }
  }, [musicUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log("Autoplay blocked or audio failed:", e);
      });
    }
  };

  if (!musicUrl) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} loop src={musicUrl} preload="auto" />
      <button
        onClick={togglePlay}
        title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 ${
          isPlaying 
            ? "bg-slate-900/90 text-white border-white/20 scale-105" 
            : "bg-white/90 text-slate-800 border-slate-200 hover:scale-105"
        }`}
      >
        <div className={`p-1.5 rounded-full ${isPlaying ? "bg-rose-500 animate-spin" : "bg-slate-200"}`}>
          <Music className="w-4 h-4 text-white" />
        </div>
        <div className="text-left hidden sm:block max-w-[140px]">
          <p className="text-[10px] uppercase font-bold tracking-wider opacity-60">Musik Latar</p>
          <p className="text-xs font-semibold truncate">{musicTitle || "Lagu Pernikahan"}</p>
        </div>
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse ml-1" />
        ) : (
          <VolumeX className="w-4 h-4 opacity-50 ml-1" />
        )}
      </button>
    </div>
  );
}
