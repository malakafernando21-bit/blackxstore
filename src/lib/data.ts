import { Product } from '../store/cart';

export type { Product };
export const products: Product[] = [
  {
    id: "p_1",
    name: "Onyx Oversized Hoodie",
    price: 180,
    description: "Crafted from heavy 500gsm loopback cotton. Boxy silhouette, dropped shoulders. Minimal aesthetic.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    category: "Hoodies"
  },
  {
    id: "p_2",
    name: "Obsidian Tech Jacket",
    price: 320,
    description: "Water-resistant, multi-pocket tactical jacket. Matte black finish, silver hardware.",
    image: "https://images.unsplash.com/photo-1551028719-01253a6619e1?q=80&w=1000&auto=format&fit=crop",
    category: "Jackets"
  },
  {
    id: "p_3",
    name: "Void Cargo Pants",
    price: 240,
    description: "Wide leg cargo pants in structured Japanese twill. Adjustable hems.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
    category: "Pants"
  },
  {
    id: "p_4",
    name: "Eclipse Heavyweight Tee",
    price: 95,
    description: "Premium organic cotton t-shirt. Thick collar, relaxed fit.",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop",
    category: "T-Shirts"
  },
  {
    id: "p_5",
    name: "Nocturne Sunglasses",
    price: 150,
    description: "Acetate frame, polarized black lenses. Sleek angular shape.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: "p_6",
    name: "Abyss Leather Boots",
    price: 450,
    description: "Chunky sole combat boots in premium full-grain leather.",
    image: "https://images.unsplash.com/photo-1605314800275-c5432a9a7a92?q=80&w=1000&auto=format&fit=crop",
    category: "Shoes"
  },
  {
    id: "p_7",
    name: "Shadow Zip-Up Hoodie",
    price: 190,
    description: "Double zips, elongated sleeves, heavyweight terry.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop", // Reusing for now
    category: "Hoodies"
  },
  {
    id: "p_8",
    name: "Graphite Beanie",
    price: 60,
    description: "Ribbed knit beanie in a deep charcoal black.",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1000&auto=format&fit=crop",
    category: "Accessories"
  }
];
