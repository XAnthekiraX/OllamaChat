import { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'

interface ModelOption {
  name: string
  label: string
}

interface ModelSelectorProps {
  models: ModelOption[]
  selectedModel: string
  onModelChange: (model: string) => void
}

export default function ModelSelector({ models, selectedModel, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [customModel, setCustomModel] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel = models.find((m) => m.name === selectedModel)?.label || selectedModel

  const handleSelect = (name: string) => {
    onModelChange(name)
    setIsOpen(false)
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customModel.trim()) {
      onModelChange(customModel.trim())
      setCustomModel('')
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          font-terminal text-sm px-3 py-1.5 rounded-sm border cursor-pointer
          transition-all duration-150 focus-ring-neon
          ${isOpen
            ? 'border-[var(--color-red-neon)] text-[var(--color-red-neon)]'
            : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-neon)] hover:text-[var(--color-text-primary)]'
          }
        `}
      >
        <span className="hidden sm:inline">{selectedLabel}</span>
        <span className="sm:hidden font-pixel text-[10px]">M</span>
        <Icon
          icon="lineicons:chevron-down"
          className="ml-1.5 text-xs opacity-60 transition-transform duration-150"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[200px]
          bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
          rounded-sm shadow-hard animate-fade-in">
          <div className="py-1">
            {models.map((model) => (
              <button
                type="button"
                key={model.name}
                onClick={() => handleSelect(model.name)}
                className={`
                  w-full text-left px-3 py-2 font-terminal text-sm transition-colors duration-100 cursor-pointer
                  ${model.name === selectedModel
                    ? 'text-[var(--color-red-neon)] bg-[var(--color-red-glow)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]'
                  }
                `}
              >
                <span className="mr-2">{model.name === selectedModel ? '▸' : ' '}</span>
                {model.label}
                <span className="block text-[10px] font-pixel text-[var(--color-text-muted)] mt-0.5">
                  {model.name}
                </span>
              </button>
            ))}

            <div className="border-t border-[var(--color-border)] my-1" />

            <form onSubmit={handleCustomSubmit} className="px-3 py-2">
              <label htmlFor="custom-model-input" className="block font-pixel text-[9px] text-[var(--color-text-muted)] mb-1">
                Modelo personalizado
              </label>
              <input
                id="custom-model-input"
                type="text"
                value={customModel}
                onChange={(e) => setCustomModel(e.target.value)}
                placeholder="nombre:tag"
                className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)]
                  text-[var(--color-text-primary)] font-terminal text-sm px-2 py-1
                  focus:border-[var(--color-red-neon)] focus:outline-none
                  placeholder:text-[var(--color-text-muted)] focus-ring-neon"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
