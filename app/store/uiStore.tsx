import {create} from "zustand";

interface UserState {
  headerColor: "black" | "white";
  setHeaderColor: (state: "black" | "white") => void;
}

const uiStore = create<UserState>()((set) => ({
  headerColor: "black",
  setHeaderColor: (payload) => set(() => ({headerColor: payload})),
}));

export default uiStore;

