# OllamaChat — Gestión de Estado

## Filosofía

Para un proyecto de esta escala, se usará **React Context + hooks** como solución de estado. No se necesita una librería externa como Redux o Zustand.

---

## Estados Globales

### 1. ChatState (Context: `ChatContext`)

```typescript
interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
  metadata: OllamaMetadata | null
  systemPrompt: string
  selectedModel: string
}
```

| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `messages` | `Message[]` | `[]` | Historial de la conversación actual |
| `isLoading` | `boolean` | `false` | Indica si el modelo está generando |
| `error` | `string \| null` | `null` | Mensaje de error actual |
| `metadata` | `OllamaMetadata \| null` | `null` | Metadatos de la última respuesta |
| `systemPrompt` | `string` | `""` | Prompt de comportamiento del modelo |
| `selectedModel` | `string` | `"qwen3-coder:latest"` | Modelo seleccionado |

### 2. ThemeState (Context: `ThemeContext`)

```typescript
interface ThemeState {
  mode: 'light' | 'dark'
  toggleTheme: () => void
}
```

| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `mode` | `'light' \| 'dark'` | `'dark'` | Tema activo |

---

## Hooks

### `useChat()`

Hook principal que expone la lógica del chat.

```typescript
function useChat(): {
  messages: Message[]
  sendMessage: (content: string) => Promise<void>
  isLoading: boolean
  error: string | null
  metadata: OllamaMetadata | null
  systemPrompt: string
  setSystemPrompt: (prompt: string) => void
  selectedModel: string
  setSelectedModel: (model: string) => void
  resetChat: () => void
}
```

### `useTheme()`

Hook para control del tema oscuro/claro.

```typescript
function useTheme(): {
  mode: 'light' | 'dark'
  toggleTheme: () => void
}
```

---

## Flujo de Estado al Enviar Mensaje

```
1. Usuario escribe mensaje y presiona Enter
   → setLoading(true)
   → push mensaje usuario a messages[]

2. Construir payload con:
   - systemPrompt (si no está vacío)
   - todos los mensajes actuales
   - selectedModel

3. Fetch POST a localhost:11434/api/chat
   → Éxito:
     - push respuesta a messages[]
     - setMetadata(parsear metadatos)
     - setError(null)
   → Error:
     - setError(mensaje de error)
     - mostrar burbuja de error en chat

4. setLoading(false)
```

---

## Persistencia

No se persiste el estado. Al recargar la página:

- `messages` se reinicia a `[]`
- `selectedModel` vuelve a default
- `systemPrompt` vuelve a `""`
- `theme` se puede persistir en `localStorage`
