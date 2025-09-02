import Toolbar from "../component/toolbar";
import { CanvasSheet } from "../component/canvas";
import { ShareButton } from "../component/sharebutton";
export default function draw() {
  return (
    <div className="w-svw h-svh">
      <ShareButton params={null}/>
      <Toolbar />
      <CanvasSheet params={null} />
    </div>
  );
}
