import { useState } from 'react'
import { Icon } from '@iconify/react'
import { ChatProvider } from './hooks/useChat'
import { ThemeProvider } from './hooks/useTheme'
import Header from './components/Header'
import WelcomeScreen from './components/WelcomeScreen'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'
import ResetButton from './components/ResetButton'
import ModelSidebar from './components/ModelSidebar'
import { useChat } from './hooks/useChatContext'

function ChatContent() {
  const { messages } = useChat()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div className="flex-1 flex flex-col h-screen bg-[var(--color-bg-primary)] scanlines">
        <Header />
        {messages.length === 0 ? <WelcomeScreen /> : <MessageList />}
        <div className="shrink-0">
          <ChatInput />
          <ResetButton />
        </div>
      </div>

      {/* Floating toggle button (visible only when sidebar is closed) */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className={`
          fixed right-0 top-1/2 -translate-y-1/2 z-30
          flex items-center justify-center w-9 h-20
          bg-[var(--color-bg-secondary)] border border-[var(--color-border)] border-r-0
          rounded-l-sm
          text-[var(--color-text-muted)] hover:text-[var(--color-red-neon)]
          hover:border-[var(--color-red-neon)] hover:border-r-0
          transition-all duration-200 cursor-pointer
          focus-ring-neon
          ${isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
          before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-px
          before:bg-[var(--color-red-neon)] before:opacity-0
          hover:before:opacity-40 before:transition-opacity before:duration-200
        `}
        aria-label="Abrir panel del modelo"
        title="Abrir panel del modelo"
      >
        <Icon icon="lineicons:chevron-left" className="text-xl" />
      </button>

      {/* Right sidebar */}
      <ModelSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <ChatContent />
      </ChatProvider>
    </ThemeProvider>
  )
}
