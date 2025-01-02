import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MainNav } from "@/components/main-nav"

export default function Home() {
  return (
    <>
    <div className="flex min-h-screen flex-col">
      <Header/>
      <HeroSection />
    </div></>
  )
}

