'use client'
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface nextAuthProviderProps{
  children:ReactNode
}
export default function NextAuthProvider({children}:nextAuthProviderProps){
  return <SessionProvider>{children}</SessionProvider>
}