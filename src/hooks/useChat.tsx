import {
  useState,
  useCallback,
  useRef,
  useMemo,
  type ReactNode,
} from 'react'
import type { Message, OllamaResponse, OllamaMetadata } from '../types/chat'
import { ChatContext } from './useChatContext'

function formatDuration(nanoseconds: number): string {
  const seconds = nanoseconds / 1_000_000_000
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`
  if (seconds < 60) return `${seconds.toFixed(2)}s`
  const minutes = Math.floor(seconds / 60)
  const secs = (seconds % 60).toFixed(0)
  return `${minutes}m ${secs}s`
}

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
}

const API_URL = import.meta.env.VITE_OLLAMA_API_URL ?? 'http://localhost:11434/api/chat'

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<OllamaMetadata | null>(null)
  const [systemPrompt, setSystemPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState('qwen3-coder:latest')

  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    const trimmed = content.trim()
    if (!trimmed || isLoading) return

    setError(null)

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const payload: Record<string, unknown> = {
        model: selectedModel,
        messages: [
          ...(systemPrompt.trim()
            ? [{ role: 'system' as const, content: systemPrompt.trim() }]
            : []),
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user' as const, content: trimmed },
        ],
        stream: false,
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Modelo "${selectedModel}" no encontrado. Verifica que esté instalado en Ollama.`)
        }
        throw new Error(`Error HTTP ${response.status}: ${response.statusText}`)
      }

      const data: OllamaResponse = await response.json()

      if (!data.message?.content) {
        throw new Error('Respuesta vacía del modelo.')
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.message.content,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setMetadata({
        model: data.model,
        totalDuration: formatDuration(data.total_duration),
        loadDuration: formatDuration(data.load_duration),
        promptEvalCount: data.prompt_eval_count,
        evalCount: data.eval_count,
        evalDuration: formatDuration(data.eval_duration),
        doneReason: data.done_reason,
      })
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // User cancelled - do nothing
        return
      }
      const message = err instanceof Error ? err.message : 'Ocurrió un error inesperado.'
      setError(message)
      setMessages((prev) => [...prev, {
        id: generateId(),
        role: 'assistant',
        content: `⚠️ **Error:** ${message}\n\n*Intenta de nuevo o verifica que el servidor de Ollama esté corriendo.*`,
        timestamp: Date.now(),
      }])
    } finally {
      setIsLoading(false)
      abortRef.current = null
    }
  }, [isLoading, selectedModel, systemPrompt, messages])

  const cancelMessage = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
  }, [])

  const resetChat = useCallback(() => {
    setMessages([])
    setMetadata(null)
    setError(null)
  }, [])

  const contextValue = useMemo(() => ({
    messages,
    sendMessage,
    cancelMessage,
    isLoading,
    error,
    metadata,
    systemPrompt,
    setSystemPrompt,
    selectedModel,
    setSelectedModel,
    resetChat,
  }), [
    messages,
    sendMessage,
    cancelMessage,
    isLoading,
    error,
    metadata,
    systemPrompt,
    setSystemPrompt,
    selectedModel,
    setSelectedModel,
    resetChat,
  ])

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  )
}


