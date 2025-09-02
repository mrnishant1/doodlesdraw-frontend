import { redirect } from "next/navigation"
import { FaDoorOpen } from "react-icons/fa"
export default function CreateJoinButton(){
    return(
        <div className="absolute bottom-0 items-center flex flex-row w-[60%]">
        <button
                onClick={()=>redirect('/create-join')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition"
              >
                <FaDoorOpen /> Create
      </button>
      <button
                onClick={()=>redirect('/create-join')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition"
              >
                <FaDoorOpen /> Join
      </button>
        </div>
    )
}