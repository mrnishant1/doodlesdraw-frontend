import RoomCard from "../../component/roomcard";
import { authOptions } from "../../../lib/authOption";

import { prisma } from "../../../lib/db";
import { getServerSession } from "next-auth";

export default async function Rooms() {
  const session = await getServerSession(authOptions);
  console.log(JSON.stringify(session));
  const userId = session?.user.id;

  if (!userId)
    return (
      <div className="text-center text-red-500 p-6">⚠️ No session found</div>
    );

  const response = await prisma.rooms.findMany({
    where: { memberships: { some: { userId: userId } } },
  });
  console.log(response);

  if (!response || response.length === 0) {
    return (
      <div className="text-center text-gray-500 p-6">
        You haven’t joined any rooms yet 🚪
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#16616E] self-center h-[100svh]" >
      {/* Heading */}
      <h1 className="text-5xl font-cursive text-white mb-6 text-center">
        Your Joined Rooms
      </h1>

      {/* Room Grid */}
      <div className="grid grid-cols-3 gap-1 text-white">
        {response.map((room, index) => (
          <RoomCard
            key={index}
            roomid={room.id}
            image="/face.png"
            title={room.roomcode}
          />
        ))}
      </div>

      <div className="w-[10%] flex flex-row justify-between gap-4 absolute top-4 right-[5%]">
        <a
          href="/draw"
          className="px-6 w-[100%]  py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        >
          Create
        </a>
        <a
          href="/draw"
          className="px-6 w-[100%]  py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        >
          Join
        </a>
      </div>
    </div>
  );
}
