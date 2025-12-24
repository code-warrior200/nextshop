import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'cash';
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface OrderItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  brand: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  shippingAddresses: ShippingAddress[];
  defaultAddress: ShippingAddress | null;
  
  // Actions
  createOrder: (
    items: OrderItem[],
    shippingAddress: ShippingAddress,
    paymentMethod: PaymentMethod,
    userId?: string
  ) => Promise<Order>;
  getOrderById: (id: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addShippingAddress: (address: ShippingAddress) => void;
  setDefaultAddress: (address: ShippingAddress) => void;
  deleteShippingAddress: (index: number) => void;
  clearCurrentOrder: () => void;
}

const calculateTotals = (items: OrderItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;
  
  return { subtotal, shippingCost, tax, total };
};

const orderStoreImpl: StateCreator<OrderState> = (set, get) => ({
  orders: [],
  currentOrder: null,
  shippingAddresses: [],
  defaultAddress: null,
  
  createOrder: async (items, shippingAddress, paymentMethod, userId?: string) => {
    const { subtotal, shippingCost, tax, total } = calculateTotals(items);
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: userId || 'guest',
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      tax,
      total,
      status: 'pending',
      trackingNumber: `TRK${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    set((state) => ({
      orders: [newOrder, ...state.orders],
      currentOrder: newOrder,
    }));
    
    return newOrder;
  },
  
  getOrderById: (id) => {
    return get().orders.find(order => order.id === id);
  },
  
  getUserOrders: (userId) => {
    return get().orders.filter(order => order.userId === userId);
  },
  
  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ),
    }));
  },
  
  addShippingAddress: (address) => {
    set((state) => ({
      shippingAddresses: [...state.shippingAddresses, address],
      defaultAddress: state.defaultAddress || address,
    }));
  },
  
  setDefaultAddress: (address) => {
    set({ defaultAddress: address });
  },
  
  deleteShippingAddress: (index) => {
    set((state) => {
      const newAddresses = state.shippingAddresses.filter((_, i) => i !== index);
      const wasDefault = state.defaultAddress && 
        JSON.stringify(state.shippingAddresses[index]) === JSON.stringify(state.defaultAddress);
      
      return {
        shippingAddresses: newAddresses,
        defaultAddress: wasDefault ? newAddresses[0] || null : state.defaultAddress,
      };
    });
  },
  
  clearCurrentOrder: () => {
    set({ currentOrder: null });
  },
});

export const useOrderStore = create<OrderState>()(
  persist(orderStoreImpl, {
    name: 'order-storage',
    storage: createJSONStorage(() => localStorage),
  })
);

