# OllamaChat — Páginas

## Single Page Application (SPA)

OllamaChat es una aplicación de **página única**. No se requiere enrutamiento (React Router no es necesario).

### Única Ruta

| Ruta | Descripción |
|------|-------------|
| `/` | Pantalla principal de chat |

### Estados de la Página

#### 1. Estado Inicial (sin mensajes)

```
┌──────────────────────────────────┐
│  OllamaChat (Header)             │
├──────────────────────────────────┤
│                                  │
│        🖥️                        │
│   Bienvenido a OllamaChat        │
│   Selecciona un modelo y empieza │
│   a conversar.                   │
│                                  │
│   [Input vacío + Botón enviar]   │
│                                  │
└──────────────────────────────────┘
```

- Mensaje de bienvenida centrado
- Input listo para escribir
- Selector de modelo con opción por defecto

#### 2. Estado de Carga

```
┌──────────────────────────────────┐
│  Mensajes anteriores (si hay)    │
├──────────────────────────────────┤
│                                  │
│   Último mensaje del usuario     │
│                                  │
│   🤖                             │
│   [Spinner animado]              │
│   "Pensando..."                  │
│                                  │
└──────────────────────────────────┘
```

- Input deshabilitado durante la carga
- Indicador visual de que el modelo está procesando
- Botón de enviar muestra spinner

#### 3. Estado con Conversación

```
┌──────────────────────────────────┐
│  Mensajes visibles en orden      │
│  cronológico                     │
│                                  │
│  [Usuario] ──────────────►       │
│  [Asistente] ◄──────────────     │
│  [Usuario] ──────────────►       │
│  [Asistente] ◄──────────────     │
│                                  │
└──────────────────────────────────┘
```

- Scroll automático al último mensaje
- Animaciones fade-in para mensajes nuevos
- Botón copiar en cada mensaje del asistente

#### 4. Estado de Error

```
┌──────────────────────────────────┐
│  ... mensajes previos ...        │
├──────────────────────────────────┤
│                                  │
│  ⚠️ Error de conexión            │
│  No se pudo conectar con Ollama  │
│  Verifica que el servidor esté   │
│  corriendo en localhost:11434    │
│                                  │
│  [Reintentar]                    │
│                                  │
└──────────────────────────────────┘
```

- Burbuja de error visible en el chat
- Mensaje claro sobre qué ocurrió
- Botón para reintentar

#### 5. Estado Vacío (después de reiniciar)

- Similar al estado inicial
- Todos los mensajes eliminados
- Input habilitado de nuevo
