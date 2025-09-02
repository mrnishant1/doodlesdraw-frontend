import { ReactNode } from "react";


export default function Layout({children}: {
  children:ReactNode
}) {
  return (
    <div className="flex flex-row">
        {children}
    </div>
  );
}

