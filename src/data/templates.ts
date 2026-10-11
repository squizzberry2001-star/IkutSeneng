export interface Template {
  id: string;
  name: string;
  category: 'Silver' | 'Gold' | 'Platinum';
  style: 'Minimalist' | 'Floral' | 'Dark Elegance' | 'Rustic' | 'Modern' | 'Traditional' | 'Fairytale' | 'Vintage' | 'Islamic';
  image: string;
  price: number;
}

// Ini adalah sistem arsitektur data. Anda dapat dengan mudah menambahkan 100+ template
// hanya dengan menambahkan objek baru ke dalam array ini tanpa harus merubah kode UI berulang kali.
export const TEMPLATES_DATA: Template[] = [
  {
    id: "rustic-floral-01",
    name: "Rustic Botanical",
    category: "Gold",
    style: "Floral",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    price: 199000
  },
  {
    id: "dark-elegance-01",
    name: "Midnight Gold",
    category: "Platinum",
    style: "Dark Elegance",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    price: 349000
  },
  {
    id: "minimalist-white-01",
    name: "Pure White Clean",
    category: "Silver",
    style: "Minimalist",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800",
    price: 99000
  },
  {
    id: "traditional-java-01",
    name: "Keraton Jawi",
    category: "Gold",
    style: "Traditional",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800",
    price: 199000
  },
  {
    id: "modern-sage-01",
    name: "Sage Green Aesthetic",
    category: "Gold",
    style: "Modern",
    image: "https://images.unsplash.com/photo-1507646870590-b302c38096c4?auto=format&fit=crop&q=80&w=800",
    price: 199000
  }
  // Tambahkan template ke-6 hingga ke-100+ di sini...
];
