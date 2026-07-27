import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useChat } from '../hooks/useChatContext'

interface SystemPromptInputProps {
  /** When true, always show the textarea without accordion toggle (uses in sidebar) */
  expanded?: boolean
}

export default function SystemPromptInput({ expanded = false }: SystemPromptInputProps) {
  const { systemPrompt, setSystemPrompt } = useChat()
  const [isExpanded, setIsExpanded] = useState(false)

  const showContent = expanded || isExpanded

  // ── Expanded mode (always visible, no toggle) ────────────────
  if (expanded) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Icon icon="lineicons:pencil" className="text-[var(--color-red-neon)] text-sm" />
          <p className="font-pixel text-[9px] text-[var(--color-text-muted)] tracking-wider uppercase">
            Instrucciones del sistema
          </p>
        </div>
        <textarea
          id="system-prompt-input-sidebar"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          placeholder="Ej: Actúa como un experto en programación..."
          rows={6}
          maxLength={2000}
          className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]
            text-[var(--color-text-primary)] font-terminal text-base
            placeholder:text-[var(--color-text-muted)] placeholder:font-terminal
            px-3 py-2 rounded-sm resize-y min-h-[100px]
            focus:outline-none focus:border-[var(--color-red-neon)]
            transition-colors duration-150"
        />
        <div className="flex justify-between mt-1.5">
          <span className="font-pixel text-[8px] text-[var(--color-text-muted)]">
            {systemPrompt.length}/2000
          </span>
          {systemPrompt && (
            <button
              type="button"
              onClick={() => setSystemPrompt('')}
              className="flex items-center gap-1 font-terminal text-xs
                text-[var(--color-text-muted)] hover:text-[var(--color-red-neon)]
                transition-colors duration-100 cursor-pointer"
            >
              <Icon icon="lineicons:trash-1" className="text-sm" />
              Limpiar
            </button>
          )}
        </div>
      </div>
    )
  }

  // ── Default mode (accordion, inline) ─────────────────────────
  return (
    <div className="border-b border-[var(--color-border)]">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center gap-2 px-4 py-2 text-left
          text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]
          hover:bg-[var(--color-bg-tertiary)] transition-colors duration-150
          font-terminal text-sm cursor-pointer"
      >
        <Icon icon="lineicons:pencil" className="text-base" />
        <span className="flex-1">Comportamiento del modelo</span>
        <Icon
          icon="lineicons:chevron-down"
          className={`text-sm transition-transform duration-200 ${showContent ? 'rotate-0' : '-rotate-90'}`}
        />
        {systemPrompt && !showContent && (
          <span className="font-pixel text-[8px] text-[var(--color-red-neon)]">ACTIVO</span>
        )}
      </button>

      {showContent && (
        <div className="px-4 pb-3 animate-fade-in">
          <label htmlFor="system-prompt-input" className="block font-pixel text-[9px] text-[var(--color-text-muted)] mb-1">
            Instrucciones del sistema
          </label>
          <textarea
            id="system-prompt-input"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Ej: Actúa como un experto en programación..."
            rows={3}
            maxLength={2000}
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]
              text-[var(--color-text-primary)] font-terminal text-base
              placeholder:text-[var(--color-text-muted)] placeholder:font-terminal
              px-3 py-2 rounded-sm resize-none
              focus:outline-none focus:border-[var(--color-red-neon)]
              transition-colors duration-150"
          />
          <div className="flex justify-between mt-1">
            <span className="font-pixel text-[8px] text-[var(--color-text-muted)]">
              {systemPrompt.length}/2000
            </span>
            {systemPrompt && (
              <button
                type="button"
                onClick={() => setSystemPrompt('')}
                className="font-terminal text-xs text-[var(--color-text-muted)] hover:text-[var(--color-red-neon)]
                  transition-colors duration-100 cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
