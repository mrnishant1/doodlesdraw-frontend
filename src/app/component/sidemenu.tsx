"use client"
import Link from "next/link";
import { ReactNode } from "react";
import { CgProfile } from "react-icons/cg";
import { MdMail, MdMeetingRoom } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { TbAccessPoint } from "react-icons/tb";
import { RiGroup2Line } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { useExistingStore } from "../../hooks/useglobalstore";
import { IoIosNuclear } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { useParams } from "next/navigation";

export default function Sidemenu({visiblety}:{visiblety:ReactNode}) {
  const {clearShapes} = useExistingStore();
  const {rooms} = useParams()

  function saveChats(){
    console.log({rooms});
  }



  return (
    <>
    <div className={`${visiblety?"visible":"hidden"} font-cursive text-2xl items-center fixed top-[12%] left-[12%] h-[70%] w-[15%] transform -translate-x-1/2 bg-[#d2e3e6] shadow-2xl rounded-lg p-3 flex flex-col`}>
        <div className="w-full h-full p-2 border-gray-500 border-2 rounded-md flex flex-col justify-around">
            {/* <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center " href="/rooms"    >   {<CgProfile/>} </Link> */}

            <div className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center active:scale-90  cursor-pointer" onClick={()=>{clearShapes(); location.reload()}} >   {<IoIosNuclear/>} Clear Canvas</div>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center active:scale-90" href="/rooms"    >   {<MdMeetingRoom/>} Rooms</Link>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center active:scale-90" href="/signin">  {<CiLogin/>} Login</Link>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center active:scale-90" href="/create-join"> {<TbAccessPoint/>} Create Room</Link>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center active:scale-90" href="/create-join"> {<RiGroup2Line/>} Join Room</Link>
            <Link className="hover:bg-[#969b9b] w-[100%] rounded-md transition-all duration-400 flex flex-row gap-1.5 items-center active:scale-90" href="/api/auth/signout"> {<IoMdLogOut/>} Logout</Link>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-gray-700 h-[1px] w-full my-4 dark:bg-default-border-color-dark"></div>
            <div className="flex flex-col w-full justify-around gap-2">
              <Link className="hover:bg-[#969b9b] w-[100%] rounded-md bg-[#b2b9b9] transition-all duration-400 active:scale-90" href="https://github.com/mrnishant1/excelDraw">  Github</Link> 
              <Link className="hover:bg-[#969b9b] w-[100%] rounded-md bg-[#b2b9b9] transition-all duration-400 active:scale-90" href="https://www.linkedin.com/in/nishant-kumar-692477226/">  Linkedin</Link>
              
              <a 
                href="mailto:nishantkumaragra@gmail.com" 
                className="hover:bg-[#969b9b] bg-[#b2b9b9] w-[100%] rounded-md transition-all duration-400 active:scale-90 flex flex-row justify-around text-sm font-mono"
              >
              <MdMail className="w-[2rem] h-[1.5rem]"/> nishantkumaragra@gmail.com
              </a>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-gray-700 h-[1px] w-full my-4 dark:bg-default-border-color-dark"></div>
        </div>
    </div>
    </>
  );
}
