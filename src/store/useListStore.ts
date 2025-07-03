import { create } from "zustand";
import type { ListInterface } from "../lib/type";

interface ListStore {
    list: ListInterface[];
    setList: (list: ListInterface[]) => void;
}

export const useListStore = create<ListStore>((set) => ({
    list: JSON.parse(localStorage.getItem("list") || "[]"),
    setList: (list: ListInterface[]) => set({ list })
}))
