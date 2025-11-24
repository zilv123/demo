"use client"

import { useEffect, useRef } from "react"

interface Trail {
  x: number
  y: number
  id: number
  life: number
}

interface Props {
  x: number
  y: number
}

export default function MouseTrail({ x, y }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<Trail[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    const trail: Trail = {
      x,
      y,
      id: idRef.current++,
      life: 1,
    }
    trailRef.current.push(trail)

    // 保持最多50个轨迹点
    if (trailRef.current.length > 50) {
      trailRef.current.shift()
    }
  }, [x, y])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      trailRef.current = trailRef.current.filter((t) => {
        t.life -= 0.05
        return t.life > 0
      })

      trailRef.current.forEach((trail) => {
        const gradient = ctx.createRadialGradient(trail.x, trail.y, 0, trail.x, trail.y, 15)
        gradient.addColorStop(0, `rgba(255, 107, 157, ${trail.life * 0.6})`)
        gradient.addColorStop(1, `rgba(198, 69, 105, ${trail.life * 0.3})`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(trail.x, trail.y, 15, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}
