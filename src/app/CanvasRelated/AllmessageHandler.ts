import { DrawingMessageHandler } from "./Allcanvas";
import { ToolType } from "../Types/tooltype";
import { ChatType } from "../Types/tooltype";

export function AllmessageHandler(msg: string) {
  
  //Parse message to JSON--------

  const message_recieved: {
    userId: string;
    roomId: string;
    type: ChatType;
    content: string;
  } = JSON.parse(msg);


  if (message_recieved.type === ChatType.TEXT) {
    return message_recieved.content;
  } else if (message_recieved.type === ChatType.DRAWING) {
    try {
      let parsedDrawingMessage: {
        shape: ToolType;
        myMouseX: number;
        myMouseY: number;
        movingX: number;
        movingY: number;
        isclicked: boolean;
        Localfill:string|"";
        Localstroke:string|"";
        LocalstrokeWidth:number|1;
      } = JSON.parse(message_recieved.content);
      DrawingMessageHandler(
        parsedDrawingMessage.shape,
        parsedDrawingMessage.myMouseX,
        parsedDrawingMessage.myMouseY,
        parsedDrawingMessage.movingX,
        parsedDrawingMessage.movingY,
        parsedDrawingMessage.isclicked,
        parsedDrawingMessage.Localfill,
        parsedDrawingMessage.Localstroke,
        parsedDrawingMessage.LocalstrokeWidth,

      );

      return message_recieved.content;
    } catch (error) {
      console.log(error);
    }
  }
}
