import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProductType } from '@/type';

interface CartItem extends ProductType {
  cartQuantity: number;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  
  // Wishlist
  wishlist: ProductType[];
  addToWishlist: (product: ProductType) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  
  // UI
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const storeImpl: StateCreator<StoreState> = (set, get) => ({
      // Cart State
      cart: [],
      
      // Add to Cart
      addToCart: (product: ProductType) => {
        const cart = get().cart;
        const existingItem = cart.find((item: CartItem) => item._id === product._id);
        
        if (existingItem) {
          set({
            cart: cart.map((item: CartItem) =>
              item._id === product._id
                ? { ...item, cartQuantity: item.cartQuantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, cartQuantity: 1 }],
          });
        }
      },
      
      removeFromCart: (id: number) => {
        set({ cart: get().cart.filter((item: CartItem) => item._id !== id) });
      },
      // Increase Quantity
      increaseQuantity: (id: number) => {
        set({
          cart: get().cart.map((item: CartItem) =>
            item._id === id
              ? { ...item, cartQuantity: item.cartQuantity + 1 }
              : item
          ),
        });
      },
      
      // Decrease Quantity
      decreaseQuantity: (id: number) => {
        const cart = get().cart;
        const item = cart.find((item: CartItem) => item._id === id);
        
        if (item && item.cartQuantity > 1) {
          set({
            cart: cart.map((item: CartItem) =>
              item._id === id
                ? { ...item, cartQuantity: item.cartQuantity - 1 }
                : item
            ),
          });
        } else {
          get().removeFromCart(id);
        }
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      // Wishlist State
      wishlist: [],
      
      addToWishlist: (product: ProductType) => {
        const wishlist = get().wishlist;
        const exists = wishlist.find((item: ProductType) => item._id === product._id);
        
        if (!exists) {
          set({ wishlist: [...wishlist, product] });
        }
      },
      
      removeFromWishlist: (id: number) => {
        set({ wishlist: get().wishlist.filter((item: ProductType) => item._id !== id) });
      },
      
      isInWishlist: (id: number) => {
        return get().wishlist.some((item: ProductType) => item._id === id);
      },
      
      // UI State
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
});

export const useStore = create<StoreState>()(
  persist(storeImpl, {
    name: 'nextshop-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      cart: state.cart,
      wishlist: state.wishlist,
    }),
  })
);

