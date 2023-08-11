"use clinet";
import { createContext } from "react";
import { useSession } from "next-auth/react";

export const UserContext = createContext({});

export default function UserProvider({ children }: { children: React.ReactNode}) {
  const { data: session, status, update } = useSession();

  return (
    <UserContext.Provider value={{ session, status, update }}>
      {children}
    </UserContext.Provider>
  );
}
