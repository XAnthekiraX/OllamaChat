# OllamaChat — Flujo de Usuario

## Diagrama de Flujo Principal

```
[Inicio]
    │
    ▼
┌─────────────────────────────────────┐
│  Pantalla de bienvenida             │
│  - Selector de modelo               │
│  - Input listo para escribir        │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  Usuario escribe mensaje            │
│  + Enter (o clic en enviar)        │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  Burbuja usuario aparece (fade-in) │
│  Indicador de carga (spinner)       │
│  Input deshabilitado               │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  Llamada a API Ollama              │
│  ┌─── Éxito ───┐ ┌─── Error ───┐ │
│  │ Respuesta   │ │ Mensaje de  │ │
│  │ + metadatos │ │ error       │ │
│  └─────────────┘ └─────────────┘ │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  Burbuja asistente aparece         │
│  Markdown renderizado              │
│  Bloques de código (estandar):     │
│  ┌─ [python] ──────── [Copiar] ─┐ │
│  │  def hello():                 │ │
│  │      print("Hello")           │ │
│  └───────────────────────────────┘ │
│  Botón copiar mensaje visible      │
│  Panel metadata actualizado        │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│  Usuario puede:                    │
│  - Escribir otro mensaje           │
│  - Copiar respuesta                │
│  - Cambiar modelo                  │
│  - Editar system prompt            │
│  - Alternar tema                   │
│  - Ver metadatos                   │
│  - Reiniciar conversación          │
└─────────────────────────────────────┘
```

---

## Acciones Detalladas

### 1. Enviar Mensaje

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Escribir en textarea | Texto visible en input |
| 2 | Presionar Enter (sin Shift) | Input se deshabilita, aparece burbuja user |
| 3 | Esperar respuesta | Spinner "Pensando..." |
| 4 | Recibir respuesta | Burbuja asistente con Markdown, metadata actualizada |
| 5 | Input se rehabilita | Listo para siguiente mensaje |

### 2. Copiar Mensaje

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Hover sobre burbuja asistente | Aparece botón 📋 |
| 2 | Clic en botón copiar | Contenido copiado al portapapeles |
| 3 | Feedback visual | Botón muestra checkmark "✓ Copiado" por 2s |

### 3. Cambiar Modelo

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Clic en selector de modelo | Dropdown se despliega |
| 2 | Seleccionar modelo de la lista | Modelo cambia, dropdown se cierra |
| 3 | (Opcional) Escribir modelo manual | Modelo personalizado |
| 4 | Siguiente mensaje usa nuevo modelo | — |

### 4. Configurar Comportamiento

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Clic en "Comportamiento" | Panel se expande |
| 2 | Escribir prompt (ej: "Actúa como...") | System prompt se guarda |
| 3 | Enviar mensaje | Prompt se incluye en la solicitud |

### 5. Alternar Tema

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Clic en icono luna/sol | Transición suave a modo claro/oscuro |
| 2 | Todos los colores se actualizan | UI se adapta al nuevo tema |

### 6. Ver Metadatos

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Clic en botón de info 📊 | Panel metadata se abre (slide-in) |
| 2 | Ver datos de última respuesta | Modelo, tokens, tiempos |
| 3 | Clic en cerrar ✕ | Panel se cierra |

### 7. Reiniciar Conversación

| Paso | Acción | Resultado |
|------|--------|-----------|
| 1 | Clic en "Reiniciar conversación" | Diálogo de confirmación |
| 2 | Confirmar "Sí, reiniciar" | Todos los mensajes se eliminan |
| 3 | Pantalla vuelve a estado inicial | WelcomeScreen visible |
