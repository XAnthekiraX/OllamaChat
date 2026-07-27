import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChatContext";

export default function ChatInput() {
    const { sendMessage, cancelMessage, isLoading } = useChat();
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        const newHeight = Math.min(textarea.scrollHeight, 200);
        textarea.style.height = `${newHeight}px`;
    }, [inputValue]);

    // Auto-focus on mount and after sending
    useEffect(() => {
        if (!isLoading) {
            textareaRef.current?.focus();
        }
    }, [isLoading]);

    const handleSubmit = () => {
        const trimmed = inputValue.trim();
        if (!trimmed || isLoading) return;
        sendMessage(trimmed);
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 sm:px-4 py-3">
            <div className="flex items-end gap-2 max-w-4xl mx-auto">
                {/* Textarea */}
                <div className="flex-1 relative">
                    <label htmlFor="chat-input" className="sr-only">
                        Mensaje
                    </label>
                    <textarea
                        id="chat-input"
                        ref={textareaRef}
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Escribe un mensaje..."
                        disabled={isLoading}
                        rows={1}
                        className={`
              w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
              text-[var(--color-text-primary)] font-terminal text-lg
              placeholder:text-[var(--color-text-muted)] placeholder:font-terminal
              px-4 py-2.5 pr-12
              resize-none rounded-sm
              transition-all duration-150
              focus:outline-none focus:border-[var(--color-red-neon)]
              disabled:opacity-50 disabled:cursor-not-allowed
              ${!isLoading && "focus:animate-neon-pulse"}
            `}
                        style={{ maxHeight: "200px" }}
                    />
                </div>

                {/* Send / Cancel button */}
                <button
                    type="button"
                    onClick={isLoading ? cancelMessage : handleSubmit}
                    disabled={!isLoading && !inputValue.trim()}
                    className={`
            flex items-center justify-center w-10 h-10 rounded-sm shrink-0
            transition-all duration-150 focus-ring-neon cursor-pointer
            ${
                isLoading
                    ? "bg-[var(--color-red-dim)] text-white hover:bg-[var(--color-red-neon)]"
                    : inputValue.trim()
                      ? "bg-[var(--color-red-neon)] text-white hover:brightness-110"
                      : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] cursor-not-allowed"
            }
          `}
                    title={isLoading ? "Cancelar" : "Enviar mensaje"}
                >
                    {isLoading ? (
                        <Icon icon="lineicons:close" className="text-xl" />
                    ) : (
                        <Icon icon="tabler:send" className="text-xl" />
                    )}
                </button>
            </div>

            {/* Hint text */}
            <p className="mt-1.5 text-center font-pixel text-[8px] text-[var(--color-text-muted)]">
                Enter para enviar · Shift+Enter para nueva línea
            </p>
        </div>
    );
}
