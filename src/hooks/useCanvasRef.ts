import {create} from 'zustand';

interface CanvasState {
  canvas: HTMLCanvasElement | null;
  setCanvas: (c: HTMLCanvasElement | null) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  canvas: null,
  setCanvas: (c) => set({ canvas: c }),
}));