import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useChat } from "../hooks/useChatContext";
import SystemPromptInput from "./SystemPromptInput";

interface ModelSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ModelSidebar({ isOpen, onClose }: ModelSidebarProps) {
    const { selectedModel, metadata } = useChat();

    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" onClick={onClose} aria-hidden="true" />
            )}

            {/* Sidebar Panel */}
            <aside
                className={`
          fixed right-0 top-0 h-full w-[380px] max-w-[calc(100vw-3rem)] z-50
          bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)]
          shadow-[-4px_0_24px_rgba(0,0,0,0.4)]
          transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
                aria-label="Panel del modelo"
                aria-hidden={!isOpen}
            >
                {/* ── Header ──────────────────────────────────── */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 flex items-center justify-center rounded-sm bg-[var(--color-red-glow)] border border-[var(--color-border)]">
                            <Icon
                                icon="fluent:bot-sparkle-48-filled"
                                className="text-[var(--color-red-neon)] text-lg"
                            />
                        </div>
                        <div>
                            <h2 className="font-pixel text-[10px] text-[var(--color-red-neon)] tracking-wider leading-tight">
                                &gt; Modelo
                            </h2>
                            <p className="font-terminal text-[11px] text-[var(--color-text-muted)] leading-tight">
                                Configuración
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 rounded-sm
              text-[var(--color-text-muted)] hover:text-[var(--color-red-neon)]
              hover:bg-[var(--color-bg-tertiary)] border border-transparent
              hover:border-[var(--color-border)]
              transition-all duration-150 cursor-pointer focus-ring-neon"
                        aria-label="Cerrar panel"
                    >
                        <Icon icon="lineicons:close" className="text-lg" />
                    </button>
                </div>

                {/* ── Scrollable Content ──────────────────────── */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Active Model */}
                    <div className="px-4 py-4 border-b border-[var(--color-border)]">
                        <p className="font-pixel text-[9px] text-[var(--color-text-muted)] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                            <Icon icon="lineicons:cube" className="text-xs" />
                            Modelo activo
                        </p>
                        <div className="flex items-center gap-2 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-sm px-3 py-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-red-neon)] animate-neon-pulse shrink-0" />
                            <span className="font-terminal text-base text-[var(--color-text-primary)] truncate">
                                {selectedModel}
                            </span>
                        </div>
                    </div>

                    {/* Last Response Metadata */}
                    <div className="px-4 py-4 border-b border-[var(--color-border)]">
                        <p className="font-pixel text-[9px] text-[var(--color-text-muted)] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                            <Icon icon="lineicons:chart-bar" className="text-xs" />
                            Última respuesta
                        </p>
                        {metadata ? (
                            <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-sm px-3 py-2">
                                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm font-terminal">
                                    <span className="text-[var(--color-text-muted)]">Modelo</span>
                                    <span className="text-[var(--color-text-primary)] text-right truncate font-semibold">
                                        {metadata.model}
                                    </span>
                                    <span className="text-[var(--color-text-muted)]">Tokens prompt</span>
                                    <span className="text-[var(--color-text-primary)] text-right">
                                        {metadata.promptEvalCount.toLocaleString()}
                                    </span>
                                    <span className="text-[var(--color-text-muted)]">Tokens respuesta</span>
                                    <span className="text-[var(--color-text-primary)] text-right">
                                        {metadata.evalCount.toLocaleString()}
                                    </span>
                                    <span className="text-[var(--color-text-muted)]">Tiempo total</span>
                                    <span className="text-[var(--color-text-primary)] text-right">
                                        {metadata.totalDuration}
                                    </span>
                                    <span className="text-[var(--color-text-muted)]">Carga modelo</span>
                                    <span className="text-[var(--color-text-primary)] text-right">
                                        {metadata.loadDuration}
                                    </span>
                                    <span className="text-[var(--color-text-muted)]">Evaluación</span>
                                    <span className="text-[var(--color-text-primary)] text-right">
                                        {metadata.evalDuration}
                                    </span>
                                    <span className="text-[var(--color-text-muted)]">Razón fin</span>
                                    <span className="text-[var(--color-text-primary)] text-right truncate">
                                        {metadata.doneReason}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-sm px-3 py-4">
                                <p className="font-terminal text-sm text-[var(--color-text-muted)] text-center italic">
                                    Esperando primera respuesta...
                                </p>
                            </div>
                        )}
                    </div>

                    {/* System Prompt */}
                    <div className="px-4 py-4">
                        <SystemPromptInput expanded />
                    </div>
                </div>
            </aside>
        </>
    );
}
