"use client";
import { useEffect, useId, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createRoomSchema, roomschema } from "../../signin/loginschema";
import { redirect } from "next/navigation";

//-----------------------API endpoints------------------
async function creatroom(
  roomcode: string,
  userId: string,
  isPrivate: boolean,
  password?: string
) {
  try {
    const parsed = createRoomSchema.safeParse({ 
      roomcode,
      userId,
      isPrivate,
      password,});

    if (!parsed.success) {
      console.log("not parsed cuccessfully");
      const errors = parsed.error.flatten().fieldErrors;
      const stringifyError = JSON.stringify(errors);
      return stringifyError;
    }

    if (isPrivate && !password) {
      return "Password is required for private rooms.";
    }

 const res = await axios.post(
      "/api/create-room",
      { ...parsed },
      { validateStatus: () => true },
      
    );

    return (res.data);
  } catch (error) {
    alert(error);
  }
}

//Join-Room----API-----------------
async function joinRoom(roomcode: string, userId: string, password?: string) {
  console.log("frontend hit----------------" + roomcode, userId);

  try {
    const parsed = roomschema.safeParse({ roomcode, userId, password });
    if (!parsed.success) {
      console.log("not parsed cuccessfully");
      const errors = parsed.error.flatten().fieldErrors;
      const stringifyError = JSON.stringify(errors);
      return stringifyError;
    }

    const res = await axios.post(
      "/api/join-room",
      { ...parsed },
      { validateStatus: () => true }
    );

    return res.data;
  } catch (error) {
    return error;
  }
}

//------------------------Components----------------------------------
export default function CreateRoom() {
  const [roomcode, setroomcode] = useState<string>("");
  const [password, setpassword] = useState<string | undefined>();
  const [userId, setuserId] = useState<string>("");
  const [create, setcreate] = useState(true);
  const [publicroom, setprivacy] = useState(true);
  const [FormErrors, setFormErrors] = useState<string | null>();

  const handlesubmit = async () => {
    if (create) {
      const response = await creatroom(roomcode, userId, !publicroom, password);
      setFormErrors(response.message);
      redirect(`/rooms/${response.room.id}`)
    } else {
      const response = await joinRoom(roomcode, userId, password);
      setFormErrors(response.message);
      redirect(`/rooms/${response.membership.roomId}`)
    }
  };

  const { data: session } = useSession();
  useEffect(() => {
    console.log(session?.user.id);
    if (!session?.user.id) return;
    setuserId(session.user.id);
  }, [session]);

  return (
    <>
      <div className="min-h-screen m-0 p-0 flex items-center justify-center">
        <div className="w-[30%] h-[100%] m-0 p-[1%] bg-none border-2 border-gray-800 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <label className="relative inline-flex items-center cursor-pointer mb-4">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={() => setcreate((prev) => !prev)}
            />
            {/* <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div> */}
            <span>{create ? "Join" : "Create"}</span>
          </label>

          <h2 className="text-2xl font-hand mb-6 text-center border-b-2 border-gray-800 pb-2">
            {create ? "Create New Room" : "Join Room"}
          </h2>

          {/* Error OR Response */}
          <div className="text-red-400">{FormErrors}</div>

          <div className="space-y-4">
            {/* roomname */}
            <div>
              <label className="block font-hand text-lg mb-1">Room Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border-2 border-gray-800 rounded-md font-hand focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a unique room name..."
                value={roomcode}
                onChange={(e) => {
                  (setroomcode(e.target.value), console.log(roomcode));
                }}
                required
              />
            </div>
            {/* Uid */}
            <div>
              <label className="block font-hand text-lg mb-1">User ID</label>
              <input
                type="text"
                className="w-full px-3 py-2 border-2 border-gray-800 rounded-md font-hand focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user ID..."
                value={userId}
                onChange={(e) => setuserId(e.target.value)}
                required
              />
            </div>
            {/* privacy */}
            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setprivacy((prev) => !prev)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span>{publicroom ? "Private it" : "Public it"}</span>
            </label>
            {/* Password */}
            <div
              className={`${publicroom ? "hidden" : "visible"} transition-transform`}
            >
              <label className="block font-hand text-lg mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border-2 border-gray-800 rounded-md font-hand focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button
              className="w-full mt-6 px-4 py-2 bg-blue-500 text-white font-hand text-lg rounded-md border-2 border-gray-800 hover:bg-blue-600 transform active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => handlesubmit()}
            >
              {create ? "Create" : "Join"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
