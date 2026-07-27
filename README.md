# OllamaChat

Interfaz de chat con estética retro CRT/punk terminal para interactuar con modelos locales de **Ollama**. Hecha con React 19, TypeScript y Tailwind CSS v4.

## Requisitos

- [Node.js](https://nodejs.org/) 18+
- [Ollama](https://ollama.com/) instalado y corriendo en `localhost:11434`

## Inicio rápido

```bash
# Clonar e instalar
git clone https://github.com/XAnthekiraX/OllamaChat
cd OllamaChat
npm install

# Configurar entorno
cp .env.example .env

# Desarrollo
npm run dev
```

La app se abre en `http://localhost:5173`.

## Comandos

| Comando           | Descripción                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Servidor de desarrollo (puerto 5173) |
| `npm run build`   | Typecheck + bundle de producción     |
| `npm run lint`    | Linting con oxlint                   |
| `npm run preview` | Vista previa de producción           |

## Características

- **Chat con modelos locales** — Envía mensajes a cualquier modelo instalado en Ollama
- **Selección de modelo** — Cambia entre modelos desde un dropdown (incluye opción manual)
- **System prompt** — Edita el comportamiento del modelo en tiempo real
- **Bloques de código** — Renderizado con copiar al portapapeles y nombre de lenguaje
- **Metadatos de respuesta** — Tokens, tiempos de carga y evaluación visibles por mensaje
- **Modo oscuro/claro** — Dos temas: "Medianoche de Neón" y "Papel Quemado"
- **Markdown + GFM** — Listas, tablas, negritas, enlaces y más
- **100% local** — Sin registro, sin cuentas, sin telemetría

## Stack

| Tecnología                  | Propósito                    |
| --------------------------- | ---------------------------- |
| React 19                    | UI framework                 |
| TypeScript 6                | Tipado estático              |
| Vite 8                      | Build tool y dev server      |
| Tailwind CSS 4              | Estilos utilitarios          |
| react-markdown + remark-gfm | Renderizado de markdown      |
| @iconify/react              | Iconos (colección lineicons) |
| oxlint                      | Linting                      |

## Estructura

```
src/
├── main.tsx                 # Montaje de React
├── App.tsx                  # Layout principal
├── index.css                # Variables CSS, animaciones, Tailwind
├── types/chat.ts            # Interfaces TypeScript
├── hooks/
│   ├── useChat.tsx          # Estado del chat, llamada a la API
│   ├── useChatContext.ts    # Contexto de chat
│   ├── useTheme.tsx         # Toggle oscuro/claro
│   └── useThemeContext.ts   # Contexto de tema
└── components/
    ├── Header.tsx           # Barra superior
    ├── MessageList.tsx      # Lista de mensajes
    ├── MessageBubble.tsx    # Burbuja individual
    ├── CodeBlock.tsx        # Bloques de código con copiar
    ├── ChatInput.tsx        # Campo de entrada
    ├── ModelSelector.tsx    # Selector de modelo
    ├── SystemPromptInput.tsx # Configuración del modelo
    ├── MetadataPanel.tsx    # Panel de métricas
    ├── ThemeToggle.tsx      # Switch de tema
    ├── ResetButton.tsx      # Reiniciar conversación
    └── WelcomeScreen.tsx    # Pantalla de inicio
```

## Entorno

Copiar `.env.example` a `.env` y configurar:

```env
VITE_OLLAMA_API_URL=http://localhost:11434/api/chat
```

## Diseño

La interfaz sigue una estética **collage punk terminal**: tipografía bitmap (Press Start 2P), terminal mono (VT323), código en JetBrains Mono, rojo neón sobre negro, bordes rasgados con `clip-path`, y scanlines CRT. Todo el texto de la interfaz está en español.

## Licencia

Proyecto personal.
