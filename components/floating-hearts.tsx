"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  left: number
  delay: number
  duration: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const createHeart = () => {
      const newHeart: Heart = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 3,
      }
      setHearts((prev) => [...prev, newHeart])

      setTimeout(
        () => {
          setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
        },
        (newHeart.duration + newHeart.delay) * 1000,
      )
    }

    const interval = setInterval(createHeart, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-4xl animate-pulse"
          style={{
            left: `${heart.left}%`,
            bottom: "-20px",
            animation: `float ${heart.duration}s linear ${heart.delay}s forwards`,
            opacity: 0.8,
          }}
        >
          💗💕💕💕
        </div>
      ))}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
