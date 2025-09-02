import { ReactNode } from "react";
import { Suspense } from "react";
export default function Layout({children}: {
  children:ReactNode
}) {
  return (
    <div style={{backgroundImage: `url('/background.jpeg')`, height:'100svh',width:'100svw',backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}>
            <Suspense>
                {children}
            </Suspense>
        
    </div>
  );
}

