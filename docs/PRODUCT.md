# OllamaChat — Documento de Producto

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Desarrollador/programador individual que necesita probar y comparar modelos locales de Ollama desde una interfaz visual atractiva y eficiente. Proyecto personal de aprendizaje y experimentación.

## Product Purpose

OllamaChat es una interfaz de chat minimalista y elegante para interactuar con modelos locales de **Ollama**. Su propósito es proporcionar una experiencia fluida, rápida y visualmente cuidada para consumir la API REST de Ollama (`localhost:11434/api/chat`), permitiendo:

- Enviar mensajes a modelos locales
- Controlar el comportamiento del modelo mediante system prompts editables
- Seleccionar entre diferentes modelos instalados en Ollama
- Visualizar metadatos de la respuesta (modelo, tiempo, tokens)
- Cambiar entre modo oscuro y claro
- Copiar respuestas y reiniciar conversaciones

## Positioning

OllamaChat está diseñada específicamente para el **flujo de trabajo del desarrollador** que prueba modelos locales. A diferencia de interfaces genéricas como Open WebUI o soluciones en la nube como ChatGPT, OllamaChat prioriza:

- **Simplicidad radical:** Sin registro, sin cuentas, sin configuración compleja
- **Contexto de evaluación:** Metadatos detallados de cada respuesta para comparar rendimiento entre modelos
- **Estética cuidada:** Una experiencia visual premium que hace agradable la interacción diaria
- **100% local:** Todo corre en localhost, sin telemetría ni dependencias externas más allá de Ollama

## Operating Context

- El usuario tiene Ollama instalado y corriendo en `localhost:11434`
- Flujo típico: seleccionar modelo → enviar prompt → evaluar respuesta y métricas → cambiar modelo → repetir
- El usuario suele tener múltiples modelos instalados y los alterna para comparar calidad y rendimiento
- El entorno es de escritorio (Linux/macOS/Windows), con uso ocasional en tablet
- La herramienta se usa en sesiones de trabajo focales, no como chat casual

## Capabilities and Constraints

### Capacidades confirmadas

- Envío de mensajes a la API de Ollama (streaming: no, respuestas completas)
- Historial de conversación en memoria (no persistente)
- Selección de modelo entre los instalados
- System prompt editable (incluido en el payload cuando no está vacío)
- Metadata de respuesta formateada (tokens, tiempos, modelo)
- Tema oscuro/claro
- Copia de respuestas al portapapeles
- Confirmación antes de reiniciar conversación
- Renderizado Markdown con soporte GFM

### Constraints técnicas

- API endpoint: `POST http://localhost:11434/api/chat`
- `stream: false` — respuesta completa, no streaming
- Los mensajes se pierden al recargar la página (sin persistencia)
- Sin autenticación, sin multiusuario, sin bases de datos

### Decisiones abiertas

- Posibilidad de persistir conversaciones en localStorage
- Soporte de streaming (`stream: true`) en el futuro
- Exportación de conversaciones

## Brand Commitments

- **Nombre:** OllamaChat
- **Identidad visual basada en rojo y negro:** El acento rojo (`#dc2626`) sobre fondos oscuros es el rasgo visual más distintivo y debe preservarse como seña de identidad
- **Personalidad:** No es un clon de ChatGPT — debe tener identidad visual propia, premium y reconocible
- **Voz:** Técnica, directa, sin florituras

## Evidence on Hand

- Documentación completa del diseño actual en `DESIGN.md`
- Documentación de componentes en `COMPONENTS.md`
- Documentación de layout en `LAYOUT.md`
- No hay implementación de código fuente en este repositorio aún

## Product Principles

1. **Hecho para la vista** — La estética importa tanto como la función. Cada píxel debe estar cuidado, cada transición debe sentir bien. La belleza no es un adorno, es parte de la experiencia.

2. **Identidad propia** — OllamaChat no es un clon de ChatGPT. Debe tener personalidad visual única, reconocible y memorable. El rojo y negro como sello distintivo, no como imitación.

3. **Sin fricción** — Cada interacción debe sentirse instantánea y natural. El teclado es suficiente para cualquier acción. Sin menús innecesarios, sin clicks extra.

## Accessibility & Inclusion

- Soporte de modo oscuro y claro para preferencia del usuario
- Contraste suficiente entre texto y fondo en ambos modos
- Navegación por teclado en elementos principales

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Vite | Última | Build tool y dev server |
| React | 19+ | UI Framework |
| TypeScript | 5+ | Lenguaje |
| Tailwind CSS | 4 | Estilos utilitarios |
| @iconify/react | Última | Librería de iconos |
| react-markdown | Última | Renderizado Markdown |
| remark-gfm | Última | Soporte GFM en Markdown |

## Integraciones

- **API Ollama:** HTTP directa a `http://localhost:11434/api/chat`
