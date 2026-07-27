# OllamaChat — Layout

## Estructura General

```
┌──────────────────────────────────────────────┐
│  Header (fijo arriba)                        │
│  ┌───────  Controles ───────────────────┐    │
│  │ [Model Selector] [Theme Toggle] [⚙]  │    │
│  └──────────────────────────────────────┘    │
├──────────────────────────────────────────────┤
│                                              │
│  Chat Area (scrollable)                      │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │  💬 MessageBubble (user)           │    │
│  │     ┌─────────────────────────┐    │    │
│  │     │  Texto del usuario       │    │    │
│  │     └─────────────────────────┘    │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │  🤖 MessageBubble (assistant)     │    │
│  │     ┌─────────────────────────┐    │    │
│  │     │  Markdown renderizado    │    │    │
│  │     │  [CopyButton]            │    │    │
│  │     └─────────────────────────┘    │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ... más mensajes...                         │
│                                              │
├──────────────────────────────────────────────┤
│  SystemPromptInput (colapsable)              │
│  ┌─ "Actúa como..." ─────────────────────┐   │
│  │  [textarea de system prompt]          │   │
│  └───────────────────────────────────────┘   │
├──────────────────────────────────────────────┤
│  ChatInput (fijo abajo)                      │
│  ┌─────────────────────────── [Send] ────┐   │
│  │  textarea multilínea (crece)         │   │
│  └───────────────────────────────────────┘   │
├──────────────────────────────────────────────┤
│  [ResetButton] "Reiniciar conversación"      │
└──────────────────────────────────────────────┘
```

## Capas y Posicionamiento

```
┌─── z-50 ──────────────────────────────────┐
│  Header (sticky top-0)                     │
├────────────────────────────────────────────┤
│  Chat Area (flex-1 overflow-y-auto)        │
├────────────────────────────────────────────┤
│  Input Area (sticky bottom-0)              │
│    SystemPromptInput (collapsible above)   │
│    ChatInput (textarea + send button)      │
├────────────────────────────────────────────┤
│  MetadataPanel (fixed right, z-40)         │
│  ──── solo visible en desktop ────         │
│  Se despliega/colapsa con botón            │
└────────────────────────────────────────────┘
```

## Contenedor Principal (App.tsx)

```tsx
<div className="flex h-screen bg-bg-primary text-text-primary">
  {/* Main Chat */}
  <main className="flex-1 flex flex-col">
    <Header />
    <MessageList />
    <div className="border-t border-border">
      <SystemPromptInput />
      <ChatInput />
    </div>
    <ResetButton />
  </main>

  {/* Metadata Panel (right side) */}
  <MetadataPanel />
</div>
```

## Responsive

### Desktop (> 1024px)
- Layout completo con panel metadata visible a la derecha

### Tablet (640-1024px)
- Panel metadata colapsable (toggle con icono)
- Ocupa ancho completo cuando está abierto (overlay)

### Mobile (< 640px)
- Panel metadata como bottom sheet o invisible
- Header simplificado (solo controles esenciales)
- Input ocupa todo el ancho disponible
