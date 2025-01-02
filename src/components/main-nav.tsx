"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Calculator, MapPin, Shield } from 'lucide-react'

export function MainNav() {
  const pathname = usePathname()
  
  const routes = [
    {
      href: "/carbon-calculator",
      label: "Carbon Calculator",
      icon: Calculator,
      active: pathname === "/carbon-calculator",
    },
    {
      href: "/women-safety",
      label: "Women Safety",
      icon: Shield,
      active: pathname === "/women-safety",
    },
    {
      href: "/nearby-amenities",
      label: "Nearby Amenities",
      icon: MapPin,
      active: pathname === "/nearby-amenities",
    },
  ]

  return (
    <nav className="flex items-center space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "group flex items-center gap-2 text-sm transition-all duration-300 hover:scale-105",
            route.active ? "text-white" : "text-white/70 hover:text-white"
          )}
        >
          <route.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          <span className="relative">
            {route.label}
            <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
          </span>
        </Link>
      ))}
    </nav>
  )
}

