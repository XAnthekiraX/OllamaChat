# OllamaChat — Componentes

## Árbol de Componentes

```
App.tsx
├── Header
│   ├── ModelSelector (dropdown)
│   └── ThemeToggle (switch)
├── WelcomeScreen (visible si no hay mensajes)
├── MessageList
│   └── MessageBubble (por cada mensaje)
│       ├── CodeBlock (bloques de código markdown renderizados)
│       └── CopyButton (solo en mensajes del asistente)
├── InputArea
│   ├── SystemPromptInput (collapsable)
│   └── ChatInput
│       └── SendButton (con estado loading)
├── MetadataPanel (lateral derecho, colapsable)
└── ResetButton (reiniciar conversación)
```

---

## Descripción de Componentes

### 1. `App.tsx` — Componente Raíz

- **Props:** Ninguna
- **Estado:** Provee el contexto de chat y tema
- **Responsabilidad:** Orquestar layout principal y manejar estado global

### 2. `Header.tsx`

```
┌──────────────────────────────────────┐
│  OllamaChat         [Model ▼] [🌙]  │
└──────────────────────────────────────┘
```

- **Props:** Ninguna
- **Contiene:** `ModelSelector`, `ThemeToggle`
- **Comportamiento:** Sticky top, z-50

### 3. `ModelSelector.tsx`

```
┌─ [ qwen3-coder:latest ▼ ] ──────┐
│  ○ qwen3-coder:latest            │
│  ○ llama3:latest                 │
│  ○ mistral:latest                │
│  ○ deepseek-coder:latest         │
│  ─────────────────────           │
│  ✏️ Escribir modelo manual...    │
└──────────────────────────────────┘
```

- **Props:**
  - `models: ModelOption[]`
  - `selectedModel: string`
  - `onModelChange: (model: string) => void`
- **Estado local:** `isOpen` (dropdown abierto/cerrado)
- **Comportamiento:** Dropdown con modelos predefinidos + opción de escribir manualmente

### 4. `ThemeToggle.tsx`

```
[🌙 / ☀️]
```

- **Props:** Ninguna
- **Estado:** Usa hook `useTheme`
- **Comportamiento:** Toggle visual con iconos de luna/sol, transición suave de colores

### 5. `WelcomeScreen.tsx`

```
         🤖
  Bienvenido a OllamaChat
  Selecciona un modelo y
  empieza a conversar.
```

- **Props:** Ninguna
- **Visibilidad:** Solo cuando `messages.length === 0`

### 6. `MessageList.tsx`

- **Props:**
  - `messages: Message[]`
  - `isLoading: boolean`
- **Comportamiento:**
  - Scroll automático al último mensaje
  - Animación fade-in en mensajes nuevos
  - ref al final de la lista para scrollIntoView

### 7. `MessageBubble.tsx`

```
┌──────────────────────────┐
│  Mensaje del usuario     │  ← alineado derecha
└──────────────────────────┘

┌──────────────────────────┐
│  Markdown renderizado    │  ← alineado izquierda
│                          │
│  [📋 Copiar]             │  ← solo asistente
└──────────────────────────┘
```

- **Props:**
  - `message: Message`
  - `onCopy?: (content: string) => void`
- **Estados:**
  - Normal
  - Hover (sutil sombra)
  - Animación de entrada (fade-in-up)

### 8. `ChatInput.tsx`

```
┌───────────────────────────── [➤] ┐
│  Escribe un mensaje...           │
└──────────────────────────────────┘
```

- **Props:**
  - `onSend: (content: string) => void`
  - `disabled: boolean`
  - `placeholder?: string`
- **Estado local:** `inputValue: string`
- **Comportamiento:**
  - Textarea que crece hasta 200px
  - Enter = enviar (sin Shift)
  - Shift+Enter = nueva línea
  - Autofocus al cargar y después de enviar

### 9. `SystemPromptInput.tsx`

```
┌─ [🧠 Comportamiento ▼] ──────────┐
│  │  Actúa como un experto en... │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

- **Props:**
  - `value: string`
  - `onChange: (value: string) => void`
- **Estado local:** `isExpanded: boolean`
- **Comportamiento:** Colapsable por defecto, se expande al hacer clic

### 10. `MetadataPanel.tsx`

```
┌─ [📊 Info] ──────────────────────┐
│                                  │
│  Modelo: qwen3-coder:latest      │
│  Estado: Completado              │
│  ─────────────────────            │
│  Tokens usados                   │
│  • Prompt: 16                    │
│  • Respuesta: 71                 │
│  • Total: 87                     │
│  ─────────────────────            │
│  Tiempos                         │
│  • Total: 14.19s                 │
│  • Carga: 8.54s                  │
│  • Evaluación: 5.20s             │
│  ─────────────────────            │
│  [Cerrar]                        │
└──────────────────────────────────┘
```

- **Props:**
  - `metadata: OllamaMetadata | null`
  - `isOpen: boolean`
  - `onToggle: () => void`
- **Comportamiento:**
  - Panel lateral derecho (fixed)
  - Se actualiza automáticamente con cada respuesta
  - Colapsable con botón de toggle
  - Muestra valores formateados (human-readable)

### 11. `CopyButton.tsx`

- **Props:**
  - `content: string`
- **Estado local:** `copied: boolean` (temporal)
- **Comportamiento:**
  - Copia al portapapeles
  - Feedback visual: "¡Copiado!" por 2 segundos
  - Icono cambia de `lineicons:copy` a checkmark

### 12. `CodeBlock.tsx`

```
┌─ [python] ─────────────────── [Copiar] ─┐
│  def saludar(nombre):                    │
│      print(f"Hola, {nombre}!")           │
│                                          │
│  saludar("Mundo")                        │
└──────────────────────────────────────────┘
```

- **Props:**
  - `children?: ReactNode` — Elemento `code` de react-markdown (contiene className con lenguaje y código)
- **Estado local:** `copied: boolean` (feedback temporal de copia)
- **Comportamiento:**
  - Componente custom pasado al `components` prop de ReactMarkdown
  - Sustituye el tag `<pre>` por defecto por un bloque estilizado
  - Extrae el lenguaje del className del elemento `code` (`language-python` → `python`)
  - Extrae el código del contenido del elemento `code`
  - Cabecera con nombre del lenguaje (font-pixel, rojo neón) y botón copiar
  - Cuerpo con fondo `var(--color-bg-tertiary)`, fuente JetBrains Mono
  - Botón copia solo el código (sin la cabecera)

### 13. `ResetButton.tsx`

```
[🔄 Reiniciar conversación]
```

- **Props:**
  - `onReset: () => void`
- **Comportamiento:**
  - Muestra confirmación antes de reiniciar
  - Botón sutil, abajo del input
