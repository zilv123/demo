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
    <div className="relative w-full overflow-y-auto overflow-x-hidden" style={{ height: '100vh' }}>
      {/* 全屏视频区域 */}
      <section className="relative w-full" style={{ height: '100vh', minHeight: '100vh' }}>
        <video 
          src="/video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* 向下滚动提示 */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="flex flex-col items-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <span className="text-base sm:text-lg mb-2 font-medium">向下滑动</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* 表白内容区域 */}
      <section className="relative bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900" style={{ minHeight: '100vh' }}>
        <ParticleBackground />
        <MouseTrail x={mousePosition.x} y={mousePosition.y} />
        <FloatingHearts />
        <ConfessionContent />
      </section>
    </div>
  )
}
