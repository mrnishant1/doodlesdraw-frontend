"use client"
import { SessionProvider } from "next-auth/react"
export default function ({children}:Readonly<{children:React.ReactNode}>){
    return (<>
            
<SessionProvider>
    <div style={{backgroundImage: `url('/background.jpeg')`, height:'100svh',width:'100svw',backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}>
        {children}
    </div>
</SessionProvider>
    </>)
}