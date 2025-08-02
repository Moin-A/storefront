import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {Order} from '../types/solidus'

type OrderState = {
  orders: Order[];
  currentOrder: Order | null;
  hasHydrated: boolean;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (orderId: number, orderData: Partial<Order>) => void;
  setCurrentOrder: (order: Order | null) => void;
  clearOrders: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      hasHydrated: false,
      setOrders: (orders) => set({ orders }),
      addOrder: (order) => {
        const { orders } = get();
        set({ orders: [...orders, order] });
      },
      updateOrder: (orderId, orderData) => {
        const { orders, currentOrder } = get();
        const updatedOrders = orders.map(order =>
          order.id === orderId ? { ...order, ...orderData } : order
        );
        
        set({
          orders: updatedOrders,
          currentOrder: currentOrder?.id === orderId 
            ? { ...currentOrder, ...orderData }
            : currentOrder
        });
      },
      setCurrentOrder: (currentOrder) => set({ currentOrder }),
      clearOrders: () => set({ orders: [], currentOrder: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'order-storage',
      partialize: (state) => ({ 
        orders: state.orders, 
        currentOrder: state.currentOrder 
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
