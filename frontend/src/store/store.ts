import { create } from "zustand";

interface UserAuthState {
  userData: any | null;
  loading: boolean;
  socket: any | null;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
  isLoggedIN: () => boolean;
}

const userAuthStore = create<UserAuthState>((set, get) => ({
  userData: null,
  loading: false,
  socket: null,
  setUser: (user) => set({ userData: user }),
  setLoading: (loading) => set({ loading }),
  isLoggedIN: () => get().userData !== null,
}));
export { userAuthStore };
