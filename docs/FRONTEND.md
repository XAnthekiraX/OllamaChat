# OllamaChat — Configuración Frontend

## Inicialización del Proyecto

```bash
npm create vite@latest ollamachat -- --template react-ts
cd ollamachat
npm install
```

## Dependencias

### Producción

```bash
npm install @iconify/react react-markdown remark-gfm
```

### Desarrollo

```bash
npm install tailwindcss @tailwindcss/vite
```

## Configuración Vite

**Archivo:** `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})
```

## Configuración Tailwind v4

No se necesita `tailwind.config.js`. Toda la configuración va en CSS.

**Archivo:** `src/index.css`

```css
@import "tailwindcss";
```

## Arbol de Archivos

```
ollamachat/
├── public/
├── src/
│   ├── components/
│   │   ├── ChatContainer.tsx       # Contenedor principal del chat
│   │   ├── CodeBlock.tsx           # Componente custom para bloques de código
│   │   ├── MessageList.tsx         # Lista de mensajes
│   │   ├── MessageBubble.tsx       # Burbuja individual de mensaje
│   │   ├── ChatInput.tsx           # Área de input multilínea
│   │   ├── ModelSelector.tsx       # Selector desplegable de modelos
│   │   ├── SystemPromptInput.tsx   # Campo de comportamiento / system prompt
│   │   ├── MetadataPanel.tsx       # Panel de metadatos de la última respuesta
│   │   ├── ThemeToggle.tsx         # Toggle modo oscuro/claro
│   │   ├── CopyButton.tsx          # Botón copiar mensaje
│   │   ├── ResetButton.tsx         # Botón reiniciar conversación
│   │   └── Header.tsx              # Cabecera con controles
│   ├── hooks/
│   │   ├── useChat.ts              # Hook principal de lógica del chat
│   │   └── useTheme.ts             # Hook para tema oscuro/claro
│   ├── types/
│   │   └── chat.ts                 # Tipos TypeScript
│   ├── App.tsx                     # Componente raíz
│   ├── App.css                     # Estilos globales
│   ├── index.css                   # Entry CSS (Tailwind import)
│   └── main.tsx                    # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── README.md
```

## Tipos TypeScript

**Archivo:** `src/types/chat.ts`

```typescript
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
```

## Renderizado de Código

Los bloques de código markdown se renderizan con un componente custom `CodeBlock` usando el `components` prop de ReactMarkdown:

```typescript
// En MessageBubble.tsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  }}
>
  {message.content}
</ReactMarkdown>
```

### Flujo de renderizado

1. El modelo produce markdown estándar con bloques de código:
   ````
   Aquí tienes el código:
   
   ```python
   def hello():
       print("Hola")
   ```
   ````

2. ReactMarkdown parsea el markdown y detecta el bloque `code` con clase `language-python`

3. El componente custom `pre` recibe el elemento `code` como children

4. `CodeBlock` extrae el lenguaje del `className` y el código del contenido

5. Renderiza la cabecera con nombre de lenguaje + botón copiar, y el código con JetBrains Mono

### Ventajas sobre formato custom

- Cero parser regex — el modelo produce markdown nativo
- System prompt limpio — sin instrucciones de formato
- Funciona con cualquier modelo sin configuración
- Compatible con bloques markdown estándar que los modelos ya generan
