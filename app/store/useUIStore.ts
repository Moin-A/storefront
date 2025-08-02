import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type Language = 'en' | 'es' | 'fr';

type UIState = {
  theme: Theme;
  language: Language;
  sidebarOpen: boolean;
  cartOpen: boolean;
  searchOpen: boolean;
  hasHydrated: boolean;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  toggleSidebar: () => void;
  toggleCart: () => void;
  toggleSearch: () => void;
  setCartOpen: (open: boolean) => void;
  setHasHydrated: (value: boolean) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'en',
      sidebarOpen: false,
      cartOpen: false,
      searchOpen: false,
      hasHydrated: false,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
      toggleCart: () => set({ cartOpen: !get().cartOpen }),
      toggleSearch: () => set({ searchOpen: !get().searchOpen }),
      setCartOpen: (cartOpen) => set({ cartOpen }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ 
        theme: state.theme, 
        language: state.language 
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
