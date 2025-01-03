"use client"

import { Building2 } from "lucide-react"
import { MainNav } from "./main-nav"
import Link from "next/link"
import { Button } from "./ui/button"
import { useState, useEffect } from "react"
import { auth } from "@/config/firebaseConfig"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { CoolMode } from "./ui/cool-mode"

export function Header() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <header className="fixed px-20 top-0 z-50 w-full border-b border-white/10 bg-black/5 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-white">
          <Building2 className="h-6 w-6" />
          <span className="text-xl">NextCity</span>
        </div>
        <MainNav />
        {user ? (
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-white hover:text-white/80 rounded-lg"
          >
            Sign Out
          </Button>
        ) : (
          <Link href="/login">
  <CoolMode>
    <Button
      variant="ghost"
      className="bg-gradient-to-r from-[#2d2640] via-[#1a1625] to-[#2d2640] text-white px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:from-red-500 hover:via-pink-500 hover:to-red-600"
    >
      Login
    </Button>
  </CoolMode>
</Link>
        
        )}
      </div>
    </header>
  )
}
