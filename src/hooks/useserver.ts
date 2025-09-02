import { create } from "zustand";
import { io, Socket } from "socket.io-client";

type ServerState = {
  socket: Socket | null;
  loading: boolean;
  connect: (roomId:string) => void;
  disconnect: () => void;
};

export const useServerSocket = create<ServerState>((set, get) => ({
  socket: null,
  loading: true,

  connect: (roomId) => {
    if (get().socket) return;

    set({ loading: true });
    const s = io("http://localhost:4000");

    s.on("connect", () => {
      console.log("Frontend connected ✅");
      //Emit helps in making custom listener--------------------------
      s.emit('joinRoom',roomId);
      set({ loading: false, socket: s });
    });

    s.on("disconnect", () => {
      console.log("Frontend disconnected ❌");
      set({ loading: true, socket: null });
    });

   
  },

  disconnect: () => {
    const sock = get().socket;
    if (sock) {
      sock.disconnect();
      set({ socket: null, loading: true });
    }
  },

}));
