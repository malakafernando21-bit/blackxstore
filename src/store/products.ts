import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '@/lib/data';
import { Product } from '@/store/cart';

interface ProductsStore {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set) => ({
      products: initialProducts,
      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updatedProduct) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
    }),
    {
      name: 'blackx-products-storage',
    }
  )
);
