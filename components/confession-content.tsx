"use client"

import { useState, useEffect } from "react"

export default function ConfessionContent() {
  const [displayText, setDisplayText] = useState("")
  const [showButtons, setShowButtons] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [noCount, setNoCount] = useState(0)

  const fullText = "张韩雨牛逼"

  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1))
      }, 100)
      return () => clearTimeout(timer)
    } else if (displayText.length === fullText.length) {
      const timer = setTimeout(() => {
        setShowButtons(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [displayText])

  const handleYes = () => {
    setConfirmed(true)
  }

  const handleNo = () => {
    setNoCount(noCount + 1)
  }

  if (confirmed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10 animate-in fade-in duration-1000">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            太好了！
          </h1>
          <p className="text-3xl text-pink-300 mb-8">我们有未来一起创造的故事 💫</p>
          <div className="text-9xl animate-bounce">💖</div>
          <div className="mt-12 text-2xl text-purple-300">
            <p>期待与你一起</p>
            <p>创造更多美好时刻✨</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="z-10 text-center">
        {/* 主标题 */}
        <h1 className="text-7xl font-bold mb-12 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent h-24 flex items-center justify-center">
          {displayText}
          {displayText.length < fullText.length && <span className="animate-pulse">|</span>}
        </h1>

        <div className="mb-12">
          <img src="/【恋风】20250911151537.jpeg" alt="表白配图" className="w-60 h-60 rounded-lg shadow-lg mx-auto" />
        </div>
        
        {/* 副文本 */}
        <p className="text-2xl text-pink-200 mb-16 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
          这是我最真诚的表白
        </p>

        {/* 按钮区 */}
        {showButtons && (
          <div className="flex gap-8 justify-center opacity-0 animate-in  fade-in scale-in duration-1000">
            <button
              onClick={handleYes}
              className="px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xl font-bold rounded-full hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-110"
            >
              我也喜欢你 💖
            </button>

            <button
              onClick={handleNo}
              className="px-12 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xl font-bold rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 relative"
              style={{
                transform:
                  noCount > 0
                    ? `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`
                    : "translate(0, 0)",
              }}
            >
              {noCount === 0 && "我再想想"}
              {noCount === 1 && "再等等"}
              {noCount === 2 && "快抓不住了"}
              {noCount >= 3 && "你逃不了！"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
