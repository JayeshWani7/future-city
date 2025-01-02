import { Building2 } from 'lucide-react'
import { MainNav } from "./main-nav"
import Link from 'next/link'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="fixed px-20 top-0 z-50 w-full border-b border-white/10 bg-black/5 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-white">
          <Building2 className="h-6 w-6" />
          <span className="text-xl">SmartCity</span>
        </div>
        <MainNav />
        <Link href="/login">
            <Button variant="ghost" className="text-white hover:text-white/80">
              Login
            </Button>
          </Link>
      </div>
    </header>
  )
}

