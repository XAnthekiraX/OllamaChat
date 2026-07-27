import { createContext, useContext } from 'react'
import type { Message, OllamaMetadata } from '../types/chat'

interface ChatContextValue {
  messages: Message[]
  sendMessage: (content: string) => Promise<void>
  cancelMessage: () => void
  isLoading: boolean
  error: string | null
  metadata: OllamaMetadata | null
  systemPrompt: string
  setSystemPrompt: (prompt: string) => void
  selectedModel: string
  setSelectedModel: (model: string) => void
  resetChat: () => void
}

export const ChatContext = createContext<ChatContextValue | null>(null)

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}
