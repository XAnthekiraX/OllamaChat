# OllamaChat — API Ollama

## Endpoint

```
POST http://localhost:11434/api/chat
```

## Request Payload

```json
{
  "model": "qwen3-coder:latest",
  "messages": [
    {
      "role": "system",
      "content": "Actúa como un experto en programación..."
    },
    {
      "role": "user",
      "content": "¿Cómo hago una función en Python?"
    }
  ],
  "stream": false
}
```

### Campos

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `model` | string | Sí | Nombre del modelo Ollama a usar |
| `messages` | array | Sí | Array de mensajes con `role` y `content` |
| `stream` | boolean | No | `false` para respuesta completa |

### Roles de Mensajes

| Role | Descripción |
|------|-------------|
| `system` | Prompt de comportamiento (opcional, editable por usuario) |
| `user` | Mensaje del usuario |
| `assistant` | Respuesta del asistente |

---

## Response

```json
{
  "model": "qwen3-coder:latest",
  "created_at": "2026-07-26T20:16:31.406498454Z",
  "message": {
    "role": "assistant",
    "content": "¡Hola! Soy Qwen..."
  },
  "done": true,
  "done_reason": "stop",
  "total_duration": 14187131516,
  "load_duration": 8538598882,
  "prompt_eval_count": 16,
  "prompt_eval_duration": 379890569,
  "eval_count": 71,
  "eval_duration": 5198494221
}
```

### Campos de Respuesta

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `model` | string | Modelo que generó la respuesta |
| `created_at` | string | Timestamp de creación |
| `message.role` | string | Siempre `"assistant"` |
| `message.content` | string | Contenido de la respuesta |
| `done` | boolean | `true` si la generación terminó |
| `done_reason` | string | Razón de finalización (`"stop"`, `"length"`, etc.) |
| `total_duration` | number | Duración total en nanosegundos |
| `load_duration` | number | Tiempo de carga del modelo en nanosegundos |
| `prompt_eval_count` | number | Tokens evaluados del prompt |
| `prompt_eval_duration` | number | Tiempo de evaluación del prompt en nanosegundos |
| `eval_count` | number | Tokens generados en la respuesta |
| `eval_duration` | number | Tiempo de generación en nanosegundos |

---

## Hook de Llamada API

### `src/hooks/useChat.ts`

```typescript
interface UseChatReturn {
  messages: Message[]
  sendMessage: (content: string) => Promise<void>
  isLoading: boolean
  error: string | null
  metadata: OllamaMetadata | null
  resetChat: () => void
}
```

### Flujo de `sendMessage`

1. Agregar mensaje del usuario a `messages`
2. Establecer `isLoading = true`
3. Construir payload con `messages` actuales + `systemPrompt`
4. Enviar POST a `http://localhost:11434/api/chat`
5. Recibir respuesta y agregar mensaje del asistente
6. Extraer metadatos de la respuesta cruda
7. Establecer `isLoading = false`
8. Manejar errores (conexión, timeout, etc.)

### Manejo de Errores

| Error | Causa | Mensaje al Usuario |
|-------|-------|-------------------|
| `ERR_CONNECTION_REFUSED` | Ollama no está corriendo | "No se pudo conectar con Ollama. Verifica que el servidor esté corriendo en localhost:11434" |
| `ERR_NETWORK_TIMEOUT` | Timeout de red | "La solicitud tardó demasiado. Intenta de nuevo." |
| HTTP 404 | Modelo no encontrado | "El modelo seleccionado no está disponible en Ollama." |
| Otros | Error desconocido | "Ocurrió un error inesperado: [mensaje]" |

---

## Formateo de Metadatos

Convertir nanosegundos a formato legible:

```typescript
function formatDuration(nanoseconds: number): string {
  const seconds = nanoseconds / 1_000_000_000
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`
  if (seconds < 60) return `${seconds.toFixed(2)}s`
  const minutes = Math.floor(seconds / 60)
  const secs = (seconds % 60).toFixed(0)
  return `${minutes}m ${secs}s`
}
```
