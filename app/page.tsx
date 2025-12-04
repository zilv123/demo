"use client"

import { useEffect, useState } from "react"
import ParticleBackground from "@/components/particle-background"
import ConfessionContent from "@/components/confession-content"
import FloatingHearts from "@/components/floating-hearts"
import MouseTrail from "@/components/mouse-trail"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative w-full overflow-y-auto overflow-x-hidden">
      {/* 全屏视频区域 */}
      <section className="relative w-full h-screen">
        <video 
          src="/video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" />
        
        {/* 向下滚动提示 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-black">
            <span className="text-lg mb-2">向下滑动</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* 表白内容区域 */}
      <section className="relative min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900">
        <ParticleBackground />
        <MouseTrail x={mousePosition.x} y={mousePosition.y} />
        <FloatingHearts />
        <ConfessionContent />
      </section>
    </div>
  )
}
