import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Shape } from "../app/Types/tooltype";


interface ExistingStore {
  allExistingShapes: Shape[];
  keyName?:string;
  setExistingShapes: (shapes: Shape[]) => void;
  push: (shape: Shape) => void;
  clearShapes: () => void;
}

export const useExistingStore = create<ExistingStore>()(
  persist(
    (set) => ({
      allExistingShapes: [],
      
      setExistingShapes: (shapes) => set({ allExistingShapes: shapes }),


      push: (shape) => set((state) => ({ allExistingShapes: [...state.allExistingShapes, shape] })),
      clearShapes: () => set({ allExistingShapes: [] }),
    }),
    { name: `shapes-storage` } // saved under this key in localStorage
  )
);
