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
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900">
      <ParticleBackground />
      <MouseTrail x={mousePosition.x} y={mousePosition.y} />
      <FloatingHearts />
      <ConfessionContent />
    </div>
  )
}
