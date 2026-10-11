export interface InvitationData {
  templateId: string;
  // Pasangan
  groomName: string;
  groomNickname: string;
  groomParents: string;
  brideName: string;
  brideNickname: string;
  brideParents: string;
  // Tanggal & Waktu
  weddingDate: string;
  akadDate: string;
  akadTime: string;
  akadLocation: string;
  akadAddress: string;
  resepsiDate: string;
  resepsiTime: string;
  resepsiLocation: string;
  resepsiAddress: string;
  mapsUrl: string;
  // Quotes & Cerita
  quote: string;
  loveStory?: string;
  // Media
  coverImage: string;
  galleryImages: string[];
  // Musik
  musicTitle: string;
  musicUrl: string;
  // Amplop Digital
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export const DEFAULT_INVITATION_DATA: InvitationData = {
  templateId: "rustic-floral-01",
  groomName: "Romeo Akbar Pratama",
  groomNickname: "Romeo",
  groomParents: "Putra dari Bpk. Bambang & Ibu Siti",
  brideName: "Juliet Anindya Putri",
  brideNickname: "Juliet",
  brideParents: "Putri dari Bpk. Hendra & Ibu Rina",
  weddingDate: "12 Desember 2026",
  akadDate: "Minggu, 12 Desember 2026",
  akadTime: "08.00 - 10.00 WIB",
  akadLocation: "Masjid Raya Kota Bandung",
  akadAddress: "Jl. Asia Afrika No. 12, Bandung",
  resepsiDate: "Minggu, 12 Desember 2026",
  resepsiTime: "11.00 - 14.00 WIB",
  resepsiLocation: "Grand Ballroom Hotel Savoy",
  resepsiAddress: "Jl. Asia Afrika No. 112, Bandung",
  mapsUrl: "https://maps.google.com",
  quote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
  loveStory: "Pertama kali bertemu di tahun 2022, hingga akhirnya kami memutuskan untuk melangkah ke jenjang yang lebih suci bersama di tahun 2026.",
  coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
  galleryImages: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800"
  ],
  musicTitle: "A Thousand Years (Acoustic Piano)",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-113333.mp3",
  bankName: "BCA",
  accountNumber: "1234567890",
  accountHolder: "Romeo Akbar Pratama"
};

export const MUSIC_PRESETS = [
  {
    title: "Romantic Piano - A Thousand Years Vibe",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-113333.mp3"
  },
  {
    title: "Canon in D (Classical Wedding)",
    url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=canon-in-d-major-classic-wedding-theme-10115.mp3"
  },
  {
    title: "Acoustic Warm Wedding Love",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c69781a7.mp3?filename=inspiring-cinematic-ambient-116199.mp3"
  },
  {
    title: "Islamic Wedding Instrumental (Nasyid Melodic)",
    url: "https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=middle-eastern-ambient-arabic-background-music-9993.mp3"
  }
];
