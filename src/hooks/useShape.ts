import { ToolType } from '../app/Types/tooltype';
import {create} from 'zustand';
import { Color } from '../app/Types/tooltype';
interface ToolState {
  shape: ToolType;
  setShape: (shape: ToolType) => void;
}


export const useShapeStore = create<ToolState>((set) => ({
  shape: "rectangle", // default
  setShape: (shape) => set({ shape }),
}));

interface FillStroke {
  strokecolor: Color;
  setstrokecolor: (strokecolor:Color)=> void
}

export const useStrokeColor = create<FillStroke>((set)=>({
  strokecolor: Color.Black,
  setstrokecolor: (strokecolor)=>set({strokecolor})
}))


interface FillBg {
  bgcolor: Color;
  setbgcolor: (becolor:Color)=> void
}

export const useBGFill = create<FillBg>((set)=>({
  bgcolor: Color.Transparent,
  setbgcolor: (bgcolor: Color)=> set({bgcolor})
}))

interface SetStroke{
  strokewidth: number;
  setstrokewidth: (strokewidth: number)=>void
}

export const useStroke = create<SetStroke>((set)=>({
  strokewidth: 1,
  setstrokewidth: (strokewidth: number)=> set({strokewidth})
}))

interface CanvasBG{
  CanvasBG: Color
  setCanvasBG: (CanvasBG:Color)=>void
}


export const useCanvasBG = create<CanvasBG>((set)=>({
  CanvasBG: Color.White,
  setCanvasBG: (CanvasBG: Color)=> set({CanvasBG})
}))
