import { useState } from 'react'
import { Icon } from '@iconify/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message, OllamaMetadata } from '../types/chat'
import CodeBlock from './CodeBlock'

interface MessageBubbleProps {
  message: Message
  metadata: OllamaMetadata | null
}

export default function MessageBubble({ message, metadata }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const [showMeta, setShowMeta] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = message.content
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
    >
      <div
        className={`
          max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]
          ${isUser ? 'torn-edge-right' : 'torn-edge-left'}
          ${isUser
            ? 'bg-[var(--color-red-neon)] text-[var(--color-bg-primary)]'
            : 'bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)]'
          }
          ${!isUser ? 'hover:border-[var(--color-border-neon)]' : ''}
          transition-all duration-150
        `}
      >
        {/* Content */}
        <div className="px-4 py-3">
          {isUser ? (
            <p className="font-terminal text-lg leading-snug whitespace-pre-wrap break-words">
              {message.content}
            </p>
          ) : (
            <div className="font-terminal text-lg leading-snug prose prose-invert max-w-none
              prose-headings:font-pixel prose-headings:text-sm prose-headings:text-[var(--color-red-neon)]
              prose-a:text-[var(--color-red-neon)] prose-a:no-underline hover:prose-a:underline
              prose-code:font-mono-code prose-code:text-sm prose-code:bg-[var(--color-bg-tertiary)] prose-code:px-1
              prose-pre:bg-transparent prose-pre:border-0 prose-pre:p-0
              prose-strong:text-[var(--color-red-neon)]
              prose-ul:list-disc prose-ol:list-decimal
              [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
            ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Actions bar - only for assistant messages */}
        {!isUser && (
          <div className="flex items-center justify-between px-4 py-1.5 border-t border-[var(--color-border)]
            bg-[var(--color-bg-tertiary)] opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-[var(--color-text-muted)] hover:text-[var(--color-red-neon)]
                  transition-colors duration-100 cursor-pointer font-terminal text-sm"
                title="Copiar mensaje"
              >
                <Icon icon={copied ? 'lineicons:check' : 'lineicons:copy'} className="text-base" />
                <span className="text-xs">{copied ? 'Copiado' : 'Copiar'}</span>
              </button>

              {/* Metadata toggle */}
              {metadata && (
                <button
                  type="button"
                  onClick={() => setShowMeta(!showMeta)}
                  className="flex items-center gap-1 text-[var(--color-text-muted)] hover:text-[var(--color-red-neon)]
                    transition-colors duration-100 cursor-pointer font-terminal text-sm"
                  title="Ver metadatos"
                >
                  <Icon icon="lineicons:info-circle" className="text-base" />
                  <span className="text-xs">Info</span>
                </button>
              )}

              {/* Export button */}
              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([message.content], { type: 'text/markdown' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `ollamachat-${message.id}.md`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                className="flex items-center gap-1 text-[var(--color-text-muted)] hover:text-[var(--color-red-neon)]
                  transition-colors duration-100 cursor-pointer font-terminal text-sm"
                title="Exportar mensaje"
              >
                <Icon icon="lineicons:download" className="text-base" />
                <span className="text-xs">Exportar</span>
              </button>
            </div>

            <span className="font-pixel text-[8px] text-[var(--color-text-muted)]">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        )}

        {/* Metadata panel (expandable) */}
        {!isUser && metadata && showMeta && (
          <div className="px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]
            font-terminal text-sm animate-fade-in">
            <p className="font-pixel text-[9px] text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wider">
              &gt; Metadatos
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[var(--color-text-secondary)]">
              <span>Modelo</span>
              <span className="text-[var(--color-text-primary)] text-right">{metadata.model}</span>
              <span>Tokens prompt</span>
              <span className="text-[var(--color-text-primary)] text-right">{metadata.promptEvalCount}</span>
              <span>Tokens respuesta</span>
              <span className="text-[var(--color-text-primary)] text-right">{metadata.evalCount}</span>
              <span>Tiempo total</span>
              <span className="text-[var(--color-text-primary)] text-right">{metadata.totalDuration}</span>
              <span>Carga modelo</span>
              <span className="text-[var(--color-text-primary)] text-right">{metadata.loadDuration}</span>
              <span>Evaluación</span>
              <span className="text-[var(--color-text-primary)] text-right">{metadata.evalDuration}</span>
              <span>Razón fin</span>
              <span className="text-[var(--color-text-primary)] text-right">{metadata.doneReason}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
