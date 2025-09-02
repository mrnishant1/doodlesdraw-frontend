"use client";
import { Color, ToolType } from "../../app/Types/tooltype";
import { useBGFill, useCanvasBG, useShapeStore, useStroke } from "../../hooks/useShape";
import { LuGrab } from "react-icons/lu";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { GrSelect } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
import Sidemenu from "./sidemenu";
import { useState } from "react";
import { useStrokeColor } from "../../hooks/useShape";


export default function Toolbar() {
  const { shape, setShape } = useShapeStore();
  const [visiblety,setvisiblety]= useState<boolean>(false)
  const [sidetools,setsidetools]= useState<boolean>(true)
  const {setstrokecolor} = useStrokeColor()
  const {setbgcolor} = useBGFill()
  const {setstrokewidth} = useStroke()
  const {setCanvasBG} = useCanvasBG()

  return (
    <>
    {/* Side tools */}
    <div className={`${sidetools?"w-[15%] left-[10%]":"w-[2%] left-[5%]"}  duration-500 transition-all h-[50%] flex flex-row font-cursive items-center fixed top-[12%]   transform -translate-x-1/2 bg-[#d2e3e6] shadow-2xl rounded-lg p-3 `}>
        <div onClick={()=>setsidetools(!sidetools)} className={` relative h-full w-[4%] left-0 top-0 border-gray-500 border-2 rounded-md cursor-pointer`}></div>
        <div className={`${sidetools?"visible":"hidden"} text-2xl w-full h-full p-2 border-gray-500 border-2 rounded-md flex flex-col gap-2`}>
          <span>Outline</span>
          <div className="bg-[#ffffff] w-full rounded-md transition-all duration-400 flex gap-1.5 items-center flex-col">
            <div className="flex w-full items-center justify-between">
            <button onClick={()=>{setstrokecolor(Color.Blue)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#1971c2] focus:outline-none" aria-label="Select color #1971c2" title="Select color #1971c2" ><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setstrokecolor(Color.Black)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#1e1e1e] focus:outline-none" aria-label="Select color #1e1e1e" title="Select color #1e1e1e"><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setstrokecolor(Color.Green)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#386741] focus:outline-none" aria-label="Select color #2f9e44" title="Select color #2f9e44"><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setstrokecolor(Color.Red)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#e03131] focus:outline-none" aria-label="Select color #e03131" title="Select color #e03131"><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setstrokecolor(Color.Yellow)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#f08c00] focus:outline-none active" aria-label="Select color #f08c00" title="Select color #f08c00">
            <div className="color-picker__button-outline"></div>
            </button>
            </div>
            <div className="flex w-full items-center justify-between">
            <button onClick={()=>{setstrokecolor(Color.White)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#ffffff] focus:outline-none" aria-label="Select color #1971c2" title="Select color #1971c2" ><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setstrokecolor(Color.Cyan)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#00FFFF] focus:outline-none" aria-label="Select color #1e1e1e" title="Select color #1e1e1e"><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setstrokecolor(Color.Magenta)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#FF00FF] focus:outline-none" aria-label="Select color #2f9e44" title="Select color #2f9e44"><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setstrokecolor(Color.Orange)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#FFA500] focus:outline-none" aria-label="Select color #e03131" title="Select color #e03131"><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setstrokecolor(Color.Purple)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#800080] focus:outline-none active" aria-label="Select color #f08c00" title="Select color #f08c00">
            <div className="color-picker__button-outline"></div>
            </button>
            </div>
          </div>
          <span>ShapeFill</span>
          <div className="bg-[#ffffff] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center justify-between ">
                <button onClick={()=>{setbgcolor(Color.Transparent)}} className="color-picker__button bg-transparent active  is-transparent has-outline  w-[2rem] h-[2rem] rounded-md border-black border-2 " type="button" title="transparent" data-testid="color-top-pick-transparent" ><div className="color-picker__button-outline"></div></button>
                <button onClick={()=>{setbgcolor(Color.Black)}} className="color-picker__button bg-[#1e1e1e]  w-[2rem] h-[2rem] rounded-md border-black border-2 hover:scale-110 focus:outline-none" type="button" title="#ffc9c9" data-testid="color-top-pick-#ffc9c9" ><div className="color-picker__button-outline bg-[#ffc9c9] "></div></button>
                <button onClick={()=>{setbgcolor(Color.White)}} className="color-picker__button bg-[#ffffff]  w-[2rem] h-[2rem] rounded-md border-black border-2 hover:scale-110 focus:outline-none" type="button" title="#b2f2bb" data-testid="color-top-pick-#b2f2bb"><div className="color-picker__button-outline  bg-[#b2f2bb] "></div></button>
                <button onClick={()=>{setbgcolor(Color.Green)}} className="color-picker__button bg-[#386741]  w-[2rem] h-[2rem] rounded-md border-black border-2 hover:scale-110 focus:outline-none" type="button" title="#a5d8ff" data-testid="color-top-pick-#a5d8ff" ><div className="color-picker__button-outline bg-[#a5d8ff] "></div></button>
                <button onClick={()=>{setbgcolor(Color.Yellow)}} className="color-picker__button bg-[#f08c00]  w-[2rem] h-[2rem] rounded-md border-black border-2 hover:scale-110 focus:outline-none" type="button" title="#ffec99" data-testid="color-top-pick-#ffec99" ><div className="color-picker__button-outline bg-[#ffec99] "></div></button>
          </div>
          <span>Stroke Width</span>
          <div className="bg-[#ffffff] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center justify-between ">
                <button onClick={()=>{setstrokewidth(1)}} className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center active:scale-90 ">Normal</button>
                <button onClick={()=>{setstrokewidth(5)}} className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center active:scale-90 ">Medium</button>
                <button onClick={()=>{setstrokewidth(10)}} className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center active:scale-90 ">large</button>
          </div>
          <span>Canvas Background</span>
          <div className="flex w-full items-center justify-between">
            <button onClick={()=>{setCanvasBG(Color.Gray)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#808080] focus:outline-none" aria-label="Select color #1971c2" title="Select color #1971c2" ><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setCanvasBG(Color.Black)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#1e1e1e] focus:outline-none" aria-label="Select color #1e1e1e" title="Select color #1e1e1e"><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setCanvasBG(Color.Green)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#386741] focus:outline-none" aria-label="Select color #2f9e44" title="Select color #2f9e44"><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setCanvasBG(Color.White)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#ffff] focus:outline-none" aria-label="Select color #e03131" title="Select color #e03131"><div className="color-picker__button-outline"></div></button>
            <button onClick={()=>{setCanvasBG(Color.Yellow)}} className="color-picker__button w-[2rem] h-[2rem] rounded-md border ring-0 transition-all hover:scale-110 bg-[#f08c00] focus:outline-none active" aria-label="Select color #f08c00" title="Select color #f08c00">
            <div className="color-picker__button-outline"></div>
            </button>
            </div>
        </div>
    </div>

    {/* sidemenu */}
      <Sidemenu visiblety={visiblety}/>
      <button
        className={`fixed top-4 left-[5%] transform -translate-x-1/2 bg-[#d2e3e6]  rounded-lg p-5 flex hover:shadow-md active:scale-95`}
        onClick={()=>setvisiblety(!visiblety)}
      >
        <i className="fas fa-hand-paper" /> {<IoMenu />}
      </button>
      
      {/* TopTools */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#d2e3e6] shadow-lg rounded-lg p-3 flex gap-2">
        <button
          className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2
          ${shape === "grab" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
          hover:shadow-md active:scale-95`}
          onClick={() => setShape("grab")}
        >
          <i className="fas fa-hand-paper" /> {<LuGrab />}
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2
          ${shape === "rectangle" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
          hover:shadow-md active:scale-95`}
          onClick={() => setShape("rectangle")}
        >
          <i className="fas fa-square-full" /> {<RiRectangleLine />}
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2
          ${shape === "ellipse" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
          hover:shadow-md active:scale-95`}
          onClick={() => setShape("ellipse")}
        >
          <i className="fas fa-circle" /> {<FaRegCircle />}
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2
          ${shape === "line" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
          hover:shadow-md active:scale-95`}
          onClick={() => setShape("line")}
        >
          <i className="fas fa-minus" /> /
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2
          ${shape === "pencil" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
          hover:shadow-md active:scale-95`}
          onClick={() => setShape("pencil")}
        >
          <i className="fas fa-pencil-alt" /> {<MdModeEditOutline />}
        </button>
        {/* <button
          className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center gap-2
          ${shape === "select" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"}
          hover:shadow-md active:scale-95`}
          onClick={() => setShape("select")}
        >
          <i className="fas fa-mouse-pointer" /> {<GrSelect />}
        </button> */}
      </div>
    </>
  );
}


