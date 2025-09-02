"use client";
import { useEffect, useRef, useState } from "react";
import {
  CanvastoDraw,
  drawAgainPreviousShape,
} from "../CanvasRelated/Allcanvas";

import { AllmessageHandler } from "../CanvasRelated/AllmessageHandler";
import { useServerSocket } from "../../hooks/useserver";
import { useCanvasBG } from "../../hooks/useShape";



interface Props {
  params: string|null;
}
export function CanvasSheet({params}:Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { socket, connect, disconnect, loading } = useServerSocket();
  

  //My code is Like building block, you'll find function as building block with lines like ---------------------------------------------------------------
  //My code is Like building block, you'll find function as building block with lines like ---------------------------------------------------------------
  //My code is Like building block, you'll find function as building block with lines like ---------------------------------------------------------------

  // Helps in canvas Dimension as per canvas not as per browser-----------------
  useEffect(() => {
    if (!canvasRef.current) {
      console.log("canvasRef isn't here------------------")
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }, []);

  // Resize + Scroll effect, won't affect you Drawinngs -----------------------------------
  useEffect(() => {
    const handleResizeOrScroll = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
    };

    handleResizeOrScroll(); // run once
    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll);
    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll);
    };
  }, []);

  //(Runs two time) as connection takes time and at first loading = false, connection done loading = true ------------------------------
  useEffect(() => {
    console.log("🔥 loading changed to:", loading);
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cleanup: (() => void) | undefined;

    if (loading) {
      // Only local drawing
      cleanup = CanvastoDraw(canvas);
    } else if (socket&&params) {
      // Collaborative drawing with socket
      cleanup = CanvastoDraw(canvas,params, socket);
    }

    return () => {
      cleanup?.();
      //disconnect(); //<- only if you want to stop collab on unmount
    };
  }, [loading]);

  //Helps in Message to other user in room-----------------------------
  
  useEffect(() => {
 
    if (!socket) {console.log("There is no socke in canvas.tsx");return};
  
    socket.on("message", (msg: string) => {
     
      AllmessageHandler(msg);
    });

    return () => {
      if (socket) socket.off("message", (msg: string) => {
      AllmessageHandler(msg);
    });
      disconnect();
    };
  }, [loading]);

  const {CanvasBG,setCanvasBG} = useCanvasBG();

  return (
    <div className="bg-gray-400 w-[100%] h-[100%]">
      <canvas
        ref={canvasRef}
        style={{
          border: "2px solid white",
          backgroundColor: `${CanvasBG}`,
          width: "100%", // CSS-driven
          height: "100%", // CSS-driven
        }}
      />
    </div>
  );
}
