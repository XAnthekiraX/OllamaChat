import { useChat } from '../hooks/useChatContext'

export default function WelcomeScreen() {
  const { selectedModel } = useChat()

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 select-none">
      {/* Glitch effect container */}
      <div className="relative mb-8 animate-fade-in">
        <h2
          className="font-pixel text-[var(--color-red-neon)] text-center text-lg sm:text-2xl leading-relaxed"
          style={{ animation: 'welcome-glitch 0.8s ease-out forwards' }}
        >
          OllamaChat
        </h2>
        <div
          className="absolute -inset-4 border border-[var(--color-red-glow)] opacity-30"
          style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0% 90%, 0% 10%)' }}
        />
      </div>

      {/* Terminal-style prompt */}
      <div className="animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        <p className="font-terminal text-[var(--color-text-secondary)] text-center text-lg mb-2">
          <span className="text-[var(--color-red-neon)]">root@ollama</span>
          <span className="text-[var(--color-text-muted)]">:~$</span>{' '}
          <span className="animate-glitch-scan inline-block">_</span>
        </p>
        <p className="font-terminal text-[var(--color-text-muted)] text-center text-base">
          Modelo activo: <span className="text-[var(--color-text-primary)]">{selectedModel}</span>
        </p>
      </div>

      {/* Quick tips */}
      <div
        className="mt-8 max-w-md w-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 rounded-sm animate-fade-in"
        style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
      >
        <p className="font-pixel text-[10px] text-[var(--color-text-muted)] mb-2 tracking-wider uppercase">
          &gt; Comandos rápidos
        </p>
        <ul className="font-terminal text-[var(--color-text-secondary)] text-base space-y-1">
          <li><span className="text-[var(--color-red-neon)]">Enter</span> — Enviar mensaje</li>
          <li><span className="text-[var(--color-red-neon)]">Shift+Enter</span> — Nueva línea</li>
          <li><span className="text-[var(--color-red-neon)]">↑</span> — Seleccionar modelo</li>
        </ul>
      </div>

      {/* CRT scanline accent */}
      <div
        className="mt-6 w-16 h-0.5 bg-[var(--color-red-dim)] animate-fade-in"
        style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
      />
    </div>
  )
}
