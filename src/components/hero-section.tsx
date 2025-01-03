import { Button } from "@/components/ui/button"
import { Calculator, MapPin, Shield } from 'lucide-react'
import BlurIn from "@/components/ui/blur-in";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";


export function HeroSection() {
  const floatingIcons = [
    { Icon: Calculator, style: "top-1/4 left-1/4" },
    { Icon: Shield, style: "top-1/3 right-1/4" },
    { Icon: MapPin, style: "bottom-1/4 left-1/3" },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a0b2e]">
     <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[170%] skew-y-12",
        )}
      />
    
   
      
      {/* Floating icons */}
      {floatingIcons.map(({ Icon, style }, index) => (
        <div
          key={index}
          className={`absolute ${style} animate-float transition-transform hover:scale-110`}
        >
          <div className="group rounded-full border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
            <Icon className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="container relative pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
            AI-Powered Urban Planning Solutions
          </div>
          
           <BlurIn
      word="Building Smart Cities for a Connected Future"
       className="mt-8 bg-gradient-to-r from-white to-white/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent transition-all duration-300 hover:from-white hover:to-white/90 md:text-7xl"></BlurIn>
            
          
    
          <p className="mt-6 text-lg text-white/70 transition-colors duration-300 hover:text-white/90">
            Transform urban living with cutting-edge technology. Our Future city solutions 
            integrate sustainability, safety, and convenience for a better tomorrow.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button 
              className="group relative h-12 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-8 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_0_rgba(139,92,246,0.3)] hover:from-purple-600 hover:to-indigo-700"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Features
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 scale-x-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300 group-hover:scale-x-100" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="container absolute bottom-20 left-1/2 -translate-x-1/2">
        <div className="grid grid-cols-3 gap-8">
          {[
            { value: "500+", label: "Smart Buildings Connected" },
            { value: "240+", label: "Active City Zones" },
            { value: "98%", label: "User Satisfaction Rate" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:scale-105 hover:shadow-[0_0_40px_0_rgba(139,92,246,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 transition-opacity duration-300 group-hover:opacity-50" />
              <div className="relative">
                <div className="text-4xl font-bold text-white transition-transform duration-300 group-hover:scale-110">{stat.value}</div>
                <div className="mt-2 text-sm text-white/70 transition-colors duration-300 group-hover:text-white/90">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

