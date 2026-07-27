export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
}

export interface OllamaResponse {
  model: string
  created_at: string
  message: {
    role: 'assistant'
    content: string
  }
  done: boolean
  done_reason: string
  total_duration: number
  load_duration: number
  prompt_eval_count: number
  prompt_eval_duration: number
  eval_count: number
  eval_duration: number
}

export interface OllamaMetadata {
  model: string
  totalDuration: string
  loadDuration: string
  promptEvalCount: number
  evalCount: number
  evalDuration: string
  doneReason: string
}

export interface ModelOption {
  name: string
  label: string
}

export type ThemeMode = 'light' | 'dark'
