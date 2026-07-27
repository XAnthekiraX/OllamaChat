import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useChat } from '../hooks/useChatContext'

export default function ResetButton() {
  const { messages, resetChat } = useChat()
  const [showConfirm, setShowConfirm] = useState(false)

  if (messages.length === 0) return null

  const handleReset = () => {
    resetChat()
    setShowConfirm(false)
  }

  return (
    <div className="px-4 py-2 flex justify-center">
      {showConfirm ? (
        <div className="flex items-center gap-2 animate-fade-in">
          <span className="font-terminal text-sm text-[var(--color-text-muted)]">
            ¿Reiniciar conversación?
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1 bg-[var(--color-red-neon)] text-white font-terminal text-sm
              rounded-sm hover:brightness-110 transition-all duration-150 cursor-pointer
              focus-ring-neon"
          >
            Sí, reiniciar
          </button>
          <button
            type="button"
            onClick={() => setShowConfirm(false)}
            className="px-3 py-1 border border-[var(--color-border)] text-[var(--color-text-secondary)]
              font-terminal text-sm rounded-sm hover:text-[var(--color-text-primary)]
              hover:border-[var(--color-text-muted)] transition-all duration-150 cursor-pointer
              focus-ring-neon"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-1.5 text-[var(--color-text-muted)]
            hover:text-[var(--color-red-neon)] font-terminal text-sm
            transition-colors duration-150 cursor-pointer"
        >
          <Icon icon="lineicons:refresh-1" className="text-base" />
          Reiniciar conversación
        </button>
      )}
    </div>
  )
}
