import { prisma } from "../../../lib/db";
// import { Role } from "../../../node_modules/generated/prisma/client";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json(); // read full JSON
  console.log("Full request body:", body);

  const { roomcode, userId,isPrivate, password } = body.data; // destructure after logging
  console.log(
    "backend hit---------------------------",
    roomcode,
    userId,
    isPrivate,
    password
  );

  if (!roomcode || !userId)  return NextResponse.json(
      { error: "Missing parameters", message: "roomcode or userID were missing" },
      { status: 400 }
    );
  const existingRoom = await prisma.rooms.findUnique({
    where: { roomcode: roomcode },
  });
  if (existingRoom) {
    return NextResponse.json({ error: "roomcode Not unique",message:"Room Name is not unique" }, { status: 409 });

  } else {
    if (!isPrivate || (isPrivate && !!password)) {
      const room = await prisma.rooms.create({
        data: {
          roomcode: roomcode,
          createdBy: userId,
          isPrivate,
          password,
          memberships: {
            create: {
              userId: userId,
              role: Role.ADMIN,
            },
          },
        },
        include: {
          memberships: true,
        },
      });

      return (NextResponse.json({ success: true, message:"Room has been created",room },{status: 200})
      )
    }
  }
}
