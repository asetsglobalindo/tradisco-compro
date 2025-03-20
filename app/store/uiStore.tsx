import { create } from "zustand";

interface UserState {
  headerColor: "black" | "white";
  setHeaderColor: (state: "black" | "white") => void;
}

const uiStore = create<UserState>()((set, get) => ({
  headerColor: "black",
  setHeaderColor: (payload) => {
    // Check if the value is actually changing to prevent unnecessary updates
    if (get().headerColor !== payload) {
      set(() => ({ headerColor: payload }));
    }
  },
}));

export default uiStore;
