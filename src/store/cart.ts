import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  get itemCount(): number;
  get subtotal(): number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      addItem: (product, size) => set((state) => {
        const existingItem = state.items.find(i => i.id === product.id && i.selectedSize === size);
        if (existingItem) {
          return {
            items: state.items.map(i => 
              (i.id === product.id && i.selectedSize === size) 
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            isOpen: true
          };
        }
        return { items: [...state.items, { ...product, quantity: 1, selectedSize: size }], isOpen: true };
      }),
      removeItem: (productId, size) => set((state) => ({
        items: state.items.filter(i => !(i.id === productId && i.selectedSize === size))
      })),
      updateQuantity: (productId, size, quantity) => set((state) => ({
        items: state.items.map(i => 
          (i.id === productId && i.selectedSize === size)
            ? { ...i, quantity: Math.max(1, quantity) }
            : i
        )
      })),
      clearCart: () => set({ items: [] }),
      get itemCount() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      get subtotal() {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'blackx-cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
