"use client";
import { redirect } from "next/navigation";
import React from "react";
import { FaDoorOpen, FaShareAlt } from "react-icons/fa";

interface RoomCardProps {
  image: string;
  title: string;
  roomid: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  image,
  title,
  roomid,
}) => {
  const handleJoin = () => {
    redirect(`/rooms/${roomid}`)
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000/rooms/${roomid}`);
    alert("Room link copied!");
  };

  return (
    <div
      className="w-full max-w-sm 
                rounded-2xl border border-white/30 
                bg-white/20 backdrop-blur-md 
                shadow-lg hover:shadow-xl 
                transition p-6 flex flex-col items-center gap-4 cursor-pointer"
    >
      {/* Room Image */}
      <div className="relative h-20 w-20">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover rounded-full border border-gray-200"
        />
        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      </div>

      {/* Room Info */}
      <div className="text-center text-white">
        <h3 className="text-lg font-semibold ">{title}</h3>
        <p className="text-xs  mt-0.5">ID: {roomid}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-3 w-full">
        <button
          onClick={handleJoin}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition active:scale-90"
        >
          <FaDoorOpen /> Enter
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition active:scale-90"
        >
          <FaShareAlt /> Share
        </button>

      

      </div>
    </div>
  );
};

export default RoomCard;
