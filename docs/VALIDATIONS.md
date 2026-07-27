# OllamaChat — Validaciones

## Input de Mensaje

| Regla | Descripción | Acción |
|-------|-------------|--------|
| No vacío | El mensaje debe contener al menos 1 carácter no-espacio | Deshabilitar botón enviar |
| Longitud máxima | 10000 caracteres | Truncar o prevenir envío |
| Solo texto plano | Sin HTML ni scripts | Sanitize automático |

## System Prompt

| Regla | Descripción | Acción |
|-------|-------------|--------|
| Opcional | Campo no obligatorio | Se omite del payload si está vacío |
| Longitud máxima | 2000 caracteres | Truncar o prevenir |

## Modelo

| Regla | Descripción | Acción |
|-------|-------------|--------|
| No vacío | Debe seleccionarse un modelo | Usar default si no hay selección |
| Formato válido | `nombre:tag` (ej: `qwen3-coder:latest`) | Validar patrón básico |

## Respuesta de API

| Validación | Descripción |
|------------|-------------|
| Estado HTTP | Solo 200 OK |
| `done === true` | Confirmar que la generación terminó |
| `message.content` presente | Verificar que hay contenido |
| JSON válido | Parsear correctamente la respuesta |

## Confirmaciones

| Acción | Diálogo | Aceptar | Cancelar |
|--------|---------|---------|----------|
| Reiniciar chat | "¿Estás seguro de que deseas reiniciar la conversación? Se perderán todos los mensajes." | Limpiar mensajes | No hacer nada |
