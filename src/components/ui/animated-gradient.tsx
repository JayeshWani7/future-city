export function AnimatedGradient() {
  return (
    <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden">
      <div className="animate-gradient-slow absolute -top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-radial from-purple-600/30 via-blue-600/20 to-transparent blur-3xl" />
      <div className="animate-gradient-slow animation-delay-1000 absolute -bottom-1/2 right-1/2 h-[1000px] w-[1000px] translate-x-1/2 rounded-full bg-gradient-radial from-indigo-600/30 via-sky-600/20 to-transparent blur-3xl" />
      <div className="animate-gradient-slow animation-delay-2000 absolute -left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-y-1/2 rounded-full bg-gradient-radial from-violet-600/30 via-fuchsia-600/20 to-transparent blur-3xl" />
      <div className="animate-gradient-slow animation-delay-3000 absolute -right-1/2 top-1/2 h-[1000px] w-[1000px] -translate-y-1/2 rounded-full bg-gradient-radial from-cyan-600/30 via-teal-600/20 to-transparent blur-3xl" />
    </div>
  )
}

