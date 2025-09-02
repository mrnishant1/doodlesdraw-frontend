"use client"
import { useState,useEffect, Reference } from "react";
import { redirect } from "next/navigation";
import { useServerSocket } from "../../hooks/useserver";
import { FaShare } from "react-icons/fa";

// import
interface Props {
  params:string|null,
}

export function ShareButton({params}:Props) {
  const [open, setOpen] = useState<Boolean>(false);
  const { connect } = useServerSocket();

const handleconnect = ()=>{
  if(!params) return;
    connect(params);
    setOpen(()=>false)
}

  return (
    <>
      <button
        className={`fixed top-4 right-[5%] transform -translate-x-1/2 bg-[#d2e3e6]  rounded-lg p-5 flex hover:shadow-md active:scale-95 z-50`}
        onClick={() => setOpen(!open)}
        aria-label="Start sharing"
      ><FaShare/></button>
      {/* Share button-Model----------------*/}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center opacity-100 z-10">
          <div className="bg-gray-900  rounded-2xl p-6 w-[50%] h-[50%] shadow-lg gap-1.5 text-center justify-around items-center flex flex-col">
            <h2 className="text-xl font-semibold text-indigo-300 mb-2">
              Live collaboration
            </h2>
            <p className="text-gray-300 text-sm mb-4">
              Invite people to collaborate on your drawing. <br />
              Don&apos;t worry, the session is end-to-end encrypted, and fully
              private. Not even our server can see what you draw.
              <br />
              <span className="text-red-400">
                Create, Share & Join to Start collaboration...........
              </span>
            </p>
            <div className="mt-4 flex flex-col w-full justify-between items-center gap-1.5">
              <button
                className="bg-indigo-400 hover:bg-indigo-500 text-black px-5 py-2 rounded-lg font-medium transition flex justify-around active:scale-90"
                onClick={() => redirect("/rooms")}
              >
                {/* <MdMeetingRoom className="h-[1%] w-[10%]"/> */}
                Rooms
              </button>
              <div className="w-full flex flex-row h-[30%]">
                <span className="w-full h-full bg-indigo-200 rounded-2xl border-2 border-indigo-300">
                  {params?`Share: http:localhost:3000/rooms/${params}`:`Creat or Join a room to Start a session`}
                </span>
                {params&&<button
                  className="bg-indigo-400 hover:bg-indigo-500 text-black px-5 py-2 rounded-lg font-medium transition active:scale-90"
                  onClick={()=>handleconnect()}
                >
                  Start
                </button>}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-200 text-sm active:scale-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
