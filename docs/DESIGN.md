# OllamaChat — Sistema de Diseño

> Mundo visual: **Collage Punk Terminal**
> Inspiración: Fanzines cyberpunk, terminales CRT, tipografía bitmap de los 80s, collage analógico

---

## Filosofía de Diseño

OllamaChat no es otro clon de ChatGPT. Es una herramienta con **actitud**: la energía cruda de un fanzine punk combinada con la precisión de un terminal. Rojo neón sobre negro abismal, tipografía pixelada, recortes que parecen rasgados a mano, y una usabilidad tan perfecta que la rebeldía se siente intencional, no caótica.

Tres principios rectores:
1. **Hecho para la vista** — cada píxel está cuidado, cada transición se siente bien
2. **Identidad propia** — no imita, no se disculpa, es inconfundible
3. **Sin fricción** — el teclado es suficiente para cualquier acción

---

## 🎨 Paleta de Colores

Tres colores. Sin medias tintas.

### Modo Oscuro (Default) — "Medianoche de Neón"

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--color-bg-primary` | Negro abismal | `#0a0a0a` | Fondo principal |
| `--color-bg-secondary` | Negro carbón | `#111111` | Paneles, inputs, burbujas |
| `--color-bg-tertiary` | Casi negro | `#1a1a1a` | Superficies secundarias |
| `--color-red-neon` | Rojo neón | `#ff2020` | Acento principal, brillo neón |
| `--color-red-dim` | Rojo oscuro | `#cc0000` | Hover, bordes secundarios |
| `--color-red-glow` | Resplandor rojo | `rgba(255, 32, 32, 0.15)` | Fondos de resplandor |
| `--color-text-primary` | Blanco roto | `#f0f0f0` | Texto principal |
| `--color-text-secondary` | Gris terminal | `#b0b0b0` | Texto secundario, metadatos |
| `--color-text-muted` | Gris oscuro | `#606060` | Texto sutil, placeholders |
| `--color-border` | Borde tenue | `#222222` | Bordes por defecto |
| `--color-border-neon` | Borde neón | `#ff2020` | Bordes con acento, focus |

### Modo Claro — "Papel Quemado"

| Token | Color | Hex | Uso |
|-------|-------|-----|-----|
| `--color-bg-primary` | Blanco roto | `#f5f0eb` | Fondo principal (como papel) |
| `--color-bg-secondary` | Blanco | `#ffffff` | Paneles, inputs |
| `--color-bg-tertiary` | Beige claro | `#ede5dc` | Superficies secundarias |
| `--color-red-neon` | Rojo sangre | `#d42020` | Acento principal |
| `--color-red-dim` | Rojo oscuro | `#a01818` | Hover |
| `--color-red-glow` | Resplandor rojo suave | `rgba(212, 32, 32, 0.1)` | Fondos de resplandor |
| `--color-text-primary` | Negro tinta | `#1a1a1a` | Texto principal |
| `--color-text-secondary` | Gris carbón | `#555555` | Texto secundario |
| `--color-text-muted` | Gris medio | `#999999` | Texto sutil |
| `--color-border` | Borde suave | `#d0c8c0` | Bordes por defecto |
| `--color-border-neon` | Borde rojo | `#d42020` | Bordes con acento |

---

## 🖋️ Tipografía

### Display — Pixel / Bitmap

| Elemento | Fuente | Tamaño | Peso |
|----------|--------|--------|------|
| Título principal | `"Press Start 2P"`, monospace | 1.5rem / 24px | Regular (400) |
| Heading chat | `"Press Start 2P"`, monospace | 0.875rem / 14px | Regular (400) |
| Etiquetas / badges | `"Press Start 2P"`, monospace | 0.625rem / 10px | Regular (400) |

### UI / Contenido — Terminal Mono

| Elemento | Fuente | Tamaño | Peso |
|----------|--------|--------|------|
| Mensajes usuario | `"VT323"`, monospace | 1.125rem / 18px | Regular (400) |
| Mensajes asistente | `"VT323"`, monospace | 1.125rem / 18px | Regular (400) |
| Input texto | `"VT323"`, monospace | 1.125rem / 18px | Regular (400) |
| Metadatos | `"VT323"`, monospace | 0.875rem / 14px | Regular (400) |
| Código en bloque | `"JetBrains Mono"`, `"Fira Code"`, monospace | 0.875rem / 14px | Regular (400) |

> **Carga de fuentes:** `Press Start 2P` y `VT323` desde Google Fonts. `JetBrains Mono` como respaldo para bloques de código.

---

## 🧩 Espaciado y Geometría

- Base: Tailwind spacing scale (4px)
- Ángulos: `rounded-sm` (2px) para bordes — nada demasiado redondeado, esto es un terminal
- Excepción: burbujas de mensaje con bordes ligeramente irregulares simulados (clip-path)
- `gap-3` (12px) entre burbujas
- `p-4` (16px) padding de contenedores
- `p-6` (24px) padding de layout principal

### Efectos de "papel rasgado"

Las burbujas de mensaje usan `clip-path` para simular bordes irregulares:
- Usuario: borde derecho irregular
- Asistente: borde izquierdo irregular
- En hover: el borde se "endereza" ligeramente (transición)

---

## ✨ Animaciones y Micro-interacciones

| Elemento | Animación | Duración | Timing |
|----------|-----------|----------|--------|
| Entrada de mensaje | fade-in + slide-up con clip-path revelado | 350ms | ease-out (exponential) |
| Burbuja asistente | fade-in con delay progresivo + glow | 500ms | ease-out |
| Hover botones | bright 10% + sin escala (terminal) | 150ms | ease |
| Theme toggle | transición de colores + destello | 400ms | ease |
| Welcome screen | fade-in con glitch effect sutil | 800ms | ease-out |
| Neón glow al recibir respuesta | pulse suave en borde | 2s | infinite alternate |
| Focus input | border neon pulse | 1.5s | infinite alternate |

### Clases de animación (Tailwind v4)

```css
@keyframes glitch-scan {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(2px); }
}

@keyframes neon-pulse {
  0%, 100% { box-shadow: 0 0 5px rgba(255, 32, 32, 0.3); }
  50% { box-shadow: 0 0 15px rgba(255, 32, 32, 0.6); }
}

@keyframes fade-in-up-clip {
  from {
    opacity: 0;
    transform: translateY(8px);
    clip-path: inset(0 100% 0 0);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    clip-path: inset(0 0 0 0);
  }
}

@keyframes crt-scanline {
  0% { background-position: 0 0; }
  100% { background-position: 0 100%; }
}
```

---

## 📐 Bordes, Sombras y Efectos

### Modo Oscuro

- **Burbujas:** Fondo secundario con borde sutil. Borde irregular via `clip-path`
- **Burbuja usuario:** Acabado recto derecha, irregular izquierda
- **Burbuja asistente:** Acabado recto izquierda, irregular derecha + glow neón en hover
- **Bloques de código:** Borde `var(--color-border)`, fondo `var(--color-bg-tertiary)`, cabecera con nombre de lenguaje en rojo neón
- **Input focus:** Borde rojo neón con animación pulse
- **Sombras:** Duras (sin blur) — `box-shadow: 4px 4px 0 rgba(255, 32, 32, 0.2)`
- **Scanlines:** Overlay sutil de scanlines CRT en el fondo

### Modo Claro

- **Burbujas:** Fondo blanco con borde suave
- **Sombras:** Duras — `box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1)`
- **Scanlines:** No aplica

---

## 🎯 Iconos

Usar **@iconify/react** con la colección `lineicons`.

| Acción | Icono |
|--------|-------|
| Enviar mensaje | `lineicons:send` |
| Cancelar | `lineicons:close` (solo visible durante carga) |
| Copiar mensaje | `lineicons:copy` |
| Reiniciar chat | `lineicons:refresh-1` |
| Exportar | `lineicons:download` |
| Modo oscuro | `lineicons:moon` |
| Modo claro | `lineicons:sun` |
| Modelo | `lineicons:cube` |
| Comportamiento | `lineicons:pencil` |
| Cargando | `lineicons:spinner-6` (rotación) |
| Información | `lineicons:info-circle` |

---

## 📱 Responsive

| Breakpoint | Comportamiento |
|---|---|
| **Desktop (> 1024px)** | Layout completo. Metadata visible inline en cada burbuja |
| **Tablet (640-1024px)** | Metadata colapsable. Header simplificado |
| **Mobile (< 640px)** | Input full width. Metadata en bottom sheet |

---

## 📜 Contrato de Dirección

**THESIS:** Una interfaz de chat que se niega a parecerse a ChatGPT. Donde otros usan minimalismo genérico, OllamaChat usa collage punk — tipografía pixelada, rojo neón, recortes rasgados — con usabilidad perfecta.

**OWN-WORLD:** Tres colores (`#0a0a0a`, `#f0f0f0`, `#ff2020`). Tipografía bitmap para display, VT323 mono para contenido. Paneles con bordes irregulares. Sombras duras. Scanlines CRT. Glow neón en interacciones.

**STORY:** El usuario abre la app y siente que ha entrado a un espacio con personalidad. Los mensajes vuelan como recortes de fanzine. Las métricas se muestran crudas, como un terminal. Rápido, directo, con estilo propio.

**FIRST VIEWPORT:** Fondo negro. Título "OllamaChat" en Press Start 2P rojo neón. Selector de modelo como panel de control retro. Input con borde neón pulsante.

**FORM:** Collage fanzine punk + terminal CRT. Índice 4. Seed `a6fcebfa`.
