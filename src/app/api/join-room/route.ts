import { prisma } from "../../../lib/db";
// import { Role } from "../../../node_modules/generated/prisma/client";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json();   // read full JSON
    console.log("Full request body:", body);

    const { roomcode, userId, password } = body.data;  // destructure after logging
    console.log("backend hit---------------------------", roomcode, userId, password);


    if (!roomcode.trim() || !userId.trim()) {
      return NextResponse.json("Provide correct credentials");
    }
    const room = await prisma.rooms.findUnique({
      where: { roomcode: roomcode },
      include:{memberships:true}
    });
    if (!room) {
      return NextResponse.json({ error: "Room not found",message:"Room NOt found" }, { status: 404 });
    }
    // private room check-------------
    if (room.isPrivate) {
      if (room.password !== password) {
        return NextResponse.json(
          { error: "Invalid_Input",message:"Correct Password is required!" },
          { status: 400 }
        );
      }
    }
    const alreadymember = room.memberships.find(
      (m) => m.userId === userId && m.roomId === room.id
    );
    if (alreadymember) {  
      return NextResponse.json({ error: "Already member", message:"Your are already a member",membership:alreadymember }, { status: 403});
    }

    // create membership for both private (with valid password) and public rooms
    const membership = await prisma.membership.create({
      data: { roomId: room.id, userId: userId, role: Role.USER },
    });

    return NextResponse.json({success: true, message:"Joined the Room",membership:membership },{status: 200 });
    
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
