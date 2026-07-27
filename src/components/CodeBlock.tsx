import { useState, type ReactNode } from 'react'
import { Icon } from '@iconify/react'

interface CodeBlockProps {
  children?: ReactNode
}

function extractCode(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractCode).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    return extractCode((children as { props: { children: ReactNode } }).props.children)
  }
  return ''
}

function extractLanguage(children: ReactNode): string {
  if (!children || typeof children !== 'object' || !('props' in children)) return 'código'
  const props = (children as { props: { className?: string } }).props
  const match = props.className?.match(/language-(\w+)/)
  return match ? match[1] : 'código'
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const code = extractCode(children)
  const language = extractLanguage(children)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = code
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="my-3 border border-[var(--color-border)] rounded-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <span className="font-pixel text-[9px] text-[var(--color-red-neon)] uppercase tracking-wider">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-[var(--color-text-muted)] hover:text-[var(--color-red-neon)]
            transition-colors duration-100 cursor-pointer font-terminal text-sm"
          title="Copiar código"
        >
          <Icon icon={copied ? 'lineicons:check' : 'lineicons:copy'} className="text-sm" />
          <span className="text-xs">{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>

      {/* Code body */}
      <div className="bg-[var(--color-bg-tertiary)] p-3 overflow-x-auto">
        <pre className="font-mono-code text-sm text-[var(--color-text-primary)] whitespace-pre break-words m-0">
          {children}
        </pre>
      </div>
    </div>
  )
}
