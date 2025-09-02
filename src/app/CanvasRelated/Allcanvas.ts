import { Socket } from "socket.io-client";
import rough from "roughjs";
import { useStrokeColor, useShapeStore, useBGFill, useStroke } from "../../hooks/useShape";
import { ToolType } from "../Types/tooltype";
import { RoughCanvas } from "roughjs/bin/canvas";
import { ChatType } from "../Types/tooltype";
import { useExistingStore } from "../../hooks/useglobalstore";

// import { serverSocket } from "@/hooks/serverSocket";
import { CurrentShape, Shape, PencilShape, Cords } from "../Types/tooltype";

let allExistingShapes: Shape[] = [];
let globalsnapshot: Shape[] = useExistingStore.getState().allExistingShapes;

// wrapper
function push(shape: Shape) {
  const copy = { ...shape }; // shallow copy

  allExistingShapes.push(copy);
  useExistingStore.getState().push(copy);
}



let shape: ToolType;
let isclicked = false;
let myMouseX: number | null = null;
let myMouseY: number | null = null;
let rcs: RoughCanvas;
let ctx: CanvasRenderingContext2D | null;
let globalsocket: Socket | null;
let LocalRoomId: string;
let Localfill: string = "blue";
let Localstroke: string = "";
let LocalstrokeWidth: number = 1;
let pencilPath: Cords[] = [];
let remotePencilPath: Cords[] = [];
let lastRemotePoint: { x: number; y: number } | null = null;
let streamPrevX: number | null = null;
let streamPrevY: number | null = null;
// const {push,clearShapes,setExistingShapes,allExistingShapes} = useExistingStore();

function isPencil(s: Shape): s is PencilShape {
  return s.shape === "pencil";
}

export function CanvastoDraw(
  canvas: HTMLCanvasElement,
  roomId?: string,
  socketstore?: Socket | null
  
) {
  console.log("socket.current++: ", socketstore);

  if (roomId) {
    LocalRoomId = roomId;
    console.log("good RoomId here in Allcanvas");
  }

  rcs = rough.canvas(canvas);
  ctx = canvas.getContext("2d");

  if (!socketstore) {
    console.log("socket and globalsocket isn't here");
    globalsocket = null;
  } else {
    globalsocket = socketstore;
  }

  const rect = canvas.getBoundingClientRect();

  if (!ctx) return;

  //For the first time when canvas renders Draw all existing shapes stored in localstorage using Zustand persist....
  drawAgainPreviousShape(ctx);



  // ✅ define handlers with stable references
  const handleMouseDown = (e: MouseEvent) => mousedown(e);
  const handleMouseUp = (e: MouseEvent) => mouseup(e, ctx);
  const handleMouseMove = (e: MouseEvent) => {
    // Gets the shape value {GLOBAL ZUSTAND STATE VARIABLE}.................................................
    shape = useShapeStore.getState().shape;
    Localstroke = useStrokeColor.getState().strokecolor;
    Localfill = useBGFill.getState().bgcolor;
    LocalstrokeWidth = useStroke.getState().strokewidth;

    mousemove(e, shape, rcs, rect);
  };

  // ✅ attach listeners
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);
  
  // ✅ return cleanup function
  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
  };
}

const mousedown = (e: MouseEvent) => {
  isclicked = true;

  const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
  myMouseX = e.clientX - rect.left;
  myMouseY = e.clientY - rect.top;
};
//Check-------calls Drawinghandler to draw
const mousemove = (
  e: MouseEvent,
  shape: ToolType,

  rcs: RoughCanvas,
  rect: DOMRect
) => {
  
  if (!isclicked || myMouseX == null || myMouseY == null) return;

  let movingX = e.clientX - rect.left; // current X relative to canvas
  let movingY = e.clientY - rect.top; // current Y relative to canvas

  if (!ctx) {
    console.log("No canvas contextRendere2D");
    return;
  }
  // ctx.beginPath();

  if (shape === "pencil") {
    DrawingHandler(
      shape,
      0,
      0,
      movingX,
      movingY,
      Localfill,
      Localstroke,
      LocalstrokeWidth
    );
  } else {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // ✅ prevent spam
    DrawingHandler(
      shape,
      myMouseX,
      myMouseY,
      movingX,
      movingY,
      Localfill,
      Localstroke,
      LocalstrokeWidth
    );
    if(shape !=='grab') drawAgainPreviousShape(ctx);
  }

  let localshape = { shape, myMouseX, myMouseY, movingX, movingY, isclicked,Localfill,Localstroke,LocalstrokeWidth };
  //UserId neeed to put here instead of hardcode one---------------------------------------------------------------------?????????????????????????ERORRRRRRRRRRRRRRRRRRRRRRRRRR
  convertAndSend(
    "a",
    LocalRoomId,
    ChatType.DRAWING,
    JSON.stringify(localshape)
  );
};
//check>-------shapes push or shape dislocate on grab
const mouseup = (e: MouseEvent, ctx: CanvasRenderingContext2D | null) => {
  isclicked = false;
  if (myMouseX == null || myMouseY == null) return;
  if (!ctx) {
    console.log("no ctx here");
    return;
  }


  ctx.beginPath(); //this resets the last cordinates to start with new one where clicked
  let Localstroke_on_mouseup= Localstroke     
  let Localfill_on_mouseup= Localfill     
  let Localstrokewidth_on_mouseup= LocalstrokeWidth    
  const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
  let endX = e.clientX - rect.left;
  let endY = e.clientY - rect.top;
  let movingX = endX;
  let movingY = endY;
  let localshape = { shape, myMouseX, myMouseY, movingX, movingY, isclicked,Localfill_on_mouseup,Localstroke_on_mouseup,Localstrokewidth_on_mouseup };

  finalizeShape(shape, myMouseX, myMouseY, endX, endY,Localfill_on_mouseup,Localstroke_on_mouseup,Localstrokewidth_on_mouseup); //Also resets pencilPath

  //this need to be changes userId is hardcoded for now-----------
  convertAndSend(
    "a",
    LocalRoomId,
    ChatType.DRAWING,
    JSON.stringify(localshape)
  );
};

// check----- Draws all Previous Shapes
export function drawAgainPreviousShape(ctx:CanvasRenderingContext2D,) {
  allExistingShapes.forEach((s) => {
    if (s.shape === "pencil") {
      ctx.strokeStyle=s.Localstroke;
      ctx.lineWidth = s.LocalstrokeWidth;
      ctx.beginPath();
      s.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    } else {
      DrawingHandler(
        s.shape,
        s.myMouseX,
        s.myMouseY,
        s.endX,
        s.endY,
        s.Localfill,
        s.Localstroke,
        s.LocalstrokeWidth
        // rcs
      );
    }
  });
  globalsnapshot.forEach((s) => {
    if (s.shape === "pencil") {
      ctx.strokeStyle=s.Localstroke;
      ctx.lineWidth = s.LocalstrokeWidth;
      ctx.beginPath();
      s.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    } else {
      DrawingHandler(
        s.shape,
        s.myMouseX,
        s.myMouseY,
        s.endX,
        s.endY,
        s.Localfill,
        s.Localstroke,
        s.LocalstrokeWidth
        // rcs
      );
    }
  });

}
// check----- Draws Shapes
export function DrawingHandler(
  shape: ToolType,
  myMouseX: number,
  myMouseY: number,
  endX: number,
  endY: number,
  fill: string,
  stroke: string,
  strokeWidth: number | 1

  // rcs: RoughCanvas
) {

  if (!ctx) {
    console.log("No canvas contextRendere2D");
    return;
  }
  switch (shape) {
    case "rectangle":
      rcs.rectangle(myMouseX, myMouseY, endX - myMouseX, endY - myMouseY, {
        fill,
        stroke,
        strokeWidth,
      });

      break;
    case "circle":
      rcs.circle(
        myMouseX,
        myMouseY,
        Math.abs(endY - myMouseY) + Math.abs(endX - myMouseX),
        { fill,stroke,strokeWidth }
      );
      break;
    case "ellipse":
      rcs.ellipse(
        myMouseX,
        myMouseY,
        Math.abs(endX - myMouseX),
        Math.abs(endY - myMouseY),
        { fill,stroke,strokeWidth }
      );
      break;
    case "line":
      rcs.line(myMouseX, myMouseY, endX, endY, {
        fill,
        stroke,
        strokeWidth,
      });
      break;

    case "pencil":
      ctx.strokeStyle=stroke;
      ctx.lineWidth = strokeWidth;
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.beginPath(); // reset path to current point
      ctx.moveTo(endX, endY);

      pencilPath.push({ x: endX, y: endY });

      break;
    case "select":
      console.log("select mode");
      break;
    case "grab":
      if (!ctx) {
        console.log("no contxt");
        return;
      }
      Grab(ctx, endX - myMouseX, endY - myMouseY);
      break;
    default:
      console.log("no shape matched");
  }
}

let viewOffsetX = 0;
let viewOffsetY = 0;
//check----------Grabs Canvas
function Grab(ctx: CanvasRenderingContext2D, dx: number, dy: number) {
  viewOffsetX = dx;
  viewOffsetY = dy;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.save();
  ctx.translate(viewOffsetX, viewOffsetY);
  //Redraw each shapes as on every GRAB call Canvas cleared----------------
  drawAgainPreviousShape(ctx);
  ctx.restore();
}

function convertAndSend(
  userId: string | null,
  roomId: string,
  type: ChatType,
  content: string | null
) {
  if (globalsocket && content !== null) {
    let convertedMessage = {
      userId: userId ?? "",
      roomId: roomId,
      type: type,
      content: content,
    };

    //Message send to Backend Socket
    // console.log("message sent from Allcanvas.ts")
    globalsocket.emit("sendMessage", {
      roomId,
      message: JSON.stringify(convertedMessage),
    });
  }
}

// let messagePencil:Cords[] =[];
export function DrawingMessageHandler(
  shape: ToolType,
  myMouseX: number,
  myMouseY: number,
  MessageendX: number,
  MessageendY: number,
  isclicked: boolean,
  Localfill:string|"",
  Localstroke:string|"",
  LocalstrokeWidth:number|1,
) {
  if (!ctx) {
    console.log("No CTX in drawingMessageHandler");
    return;
  }

  if(shape !=="pencil"){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawAgainPreviousShape(ctx);
  }

  // draw the live one

  if (shape === "pencil") {

    console.log(streamPrevX,streamPrevY)
    if (streamPrevX === null || streamPrevY === null) {
        // ctx.beginPath();
          streamPrevX = myMouseX;
          streamPrevY = myMouseY;
        }
        ctx.strokeStyle=Localstroke;
        ctx.lineWidth = LocalstrokeWidth;
        ctx.moveTo(streamPrevX, streamPrevY)
        ctx.lineTo(MessageendX,MessageendY);
        ctx.stroke();
        remotePencilPath.push({ x: MessageendX, y: MessageendY });
        // Update prev point
        streamPrevX = MessageendX;
        streamPrevY = MessageendY;

    // lastRemotePoint = { x: MessageendX, y: MessageendY };
  } else {
    DrawingHandler(shape, myMouseX, myMouseY, MessageendX, MessageendY,Localfill,Localstroke,LocalstrokeWidth);
  }

  if (!isclicked) {
    finalizeShape(shape, myMouseX, myMouseY, MessageendX, MessageendY,Localfill,Localstroke,LocalstrokeWidth);
    lastRemotePoint = null;
    streamPrevX = null;
    streamPrevY = null;
    
  }
}

//CHECK--------Just Push shapes as json in allExistingShapes or On Grab changes cords---------------
function finalizeShape(
  shape: ToolType,
  myMouseX: number,
  myMouseY: number,
  endX: number,
  endY: number,
  Localfill:string|"",
  Localstroke:string|"",
  LocalstrokeWidth:number|1,
) {
  if (shape === "pencil") {
    console.log("first"+pencilPath.length)
    console.log("second"+remotePencilPath.length)
    finalizePencil(pencilPath, Localfill, Localstroke, LocalstrokeWidth);
    finalizePencil(remotePencilPath, Localfill, Localstroke, LocalstrokeWidth);

  } else if (shape !== "grab") {
    push({
      shape,
      myMouseX,
      myMouseY,
      endX,
      endY,
      Localfill: Localfill,
      Localstroke: Localstroke,
      LocalstrokeWidth: LocalstrokeWidth,
    } as CurrentShape);
  } else {
    allExistingShapes.forEach((s) => {
      if (isPencil(s)) {
        s.points.forEach((p) => {
          p.x += viewOffsetX;
          p.y += viewOffsetY;
        });
      } else {
        s.myMouseX += viewOffsetX;
        s.myMouseY += viewOffsetY;
        s.endX += viewOffsetX;
        s.endY += viewOffsetY;
      }
    });
  }
}

function finalizePencil(path: Cords[], fill: string, stroke: string, strokeWidth: number) {
  if (path.length > 0) {
    push({
      shape: "pencil",
      points: [...path],
      Localfill: fill,
      Localstroke: stroke,
      LocalstrokeWidth: strokeWidth,
    } as PencilShape);

    path.length = 0; // clear in-place (no need to reassign)
  }
}

