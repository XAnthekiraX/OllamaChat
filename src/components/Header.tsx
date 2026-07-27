import { Icon } from "@iconify/react";
import { useChat } from "../hooks/useChatContext";
import { useTheme } from "../hooks/useThemeContext";
import ModelSelector from "./ModelSelector";

const MODELS = [
    { name: "qwen3-coder:latest", label: "Qwen3 Coder" },
    { name: "llama3:latest", label: "Llama 3" },
    { name: "mistral:latest", label: "Mistral" },
    { name: "deepseek-coder:latest", label: "DeepSeek Coder" },
];

export default function Header() {
    const { selectedModel, setSelectedModel } = useChat();
    const { mode, toggleTheme } = useTheme();

    return (
        <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)] shrink-0">
            {/* Logo */}
            <div className="flex items-center gap-3">
                <h1 className="font-pixel text-[var(--color-red-neon)] text-xs tracking-wider select-none">
                    OllamaChat
                </h1>
                <span className="hidden sm:inline text-[var(--color-text-muted)] font-terminal text-sm">/</span>
                <span className="hidden sm:inline text-[var(--color-text-muted)] font-terminal text-sm">terminal</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
                <ModelSelector models={MODELS} selectedModel={selectedModel} onModelChange={setSelectedModel} />

                {/* Theme Toggle */}
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center justify-center w-8 h-8 rounded-sm border border-[var(--color-border)]
            text-[var(--color-text-secondary)] hover:text-[var(--color-red-neon)]
            hover:border-[var(--color-red-neon)] transition-all duration-150
            focus-ring-neon cursor-pointer"
                    aria-label={mode === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
                    title={mode === "dark" ? "Modo claro" : "Modo oscuro"}
                >
                    <Icon icon={mode === "dark" ? "lineicons:sun" : "lucide:moon"} className="text-lg" />
                </button>
            </div>
        </header>
    );
}
