import { useRef, useEffect } from 'react'
import { useChat } from '../hooks/useChatContext'
import MessageBubble from './MessageBubble'

export default function MessageList() {
  const { messages, isLoading, metadata } = useChat()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-2 sm:px-4">
      <div className="mx-auto max-w-4xl py-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            metadata={msg.role === 'assistant' && msg.id === messages[messages.length - 1]?.id ? metadata : null}
          />
        ))}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center gap-2 pl-2 animate-fade-in" aria-live="polite" aria-label="El asistente está generando una respuesta">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-[var(--color-red-neon)] rounded-sm typing-dot typing-dot-1" />
            <span className="w-2 h-2 bg-[var(--color-red-neon)] rounded-sm typing-dot typing-dot-2" />
            <span className="w-2 h-2 bg-[var(--color-red-neon)] rounded-sm typing-dot typing-dot-3" />
          </div>
          <span className="font-terminal text-[var(--color-text-muted)] text-base animate-glitch-scan">
            Pensando...
          </span>
        </div>
      )}

      <div ref={bottomRef} />
      </div>
    </div>
  )
}
