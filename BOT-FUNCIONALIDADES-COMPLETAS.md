# 📚 Documentación Completa de Funcionalidades - Ego Bot

## 📋 Tabla de Contenidos
- [Sistema de Tickets](#-sistema-de-tickets)
- [Sistema de Voice Support](#-sistema-de-voice-support)
- [Sistema de Gestión de Tareas](#-sistema-de-gestión-de-tareas)
- [Sistema de Logs](#-sistema-de-logs)
- [Sistema de Moderación con IA](#-sistema-de-moderación-con-ia)
- [Sistema de Verificación](#-sistema-de-verificación)
- [Sistema de Invitaciones](#-sistema-de-invitaciones)
- [Sistema Q&A con IA](#-sistema-qa-con-ia)
- [Panel de Embeds Anónimos](#-panel-de-embeds-anónimos)
- [Sistema de Comandos Personalizados](#-sistema-de-comandos-personalizados)
- [Sistema de Vinculación de Redes Sociales](#-sistema-de-vinculación-de-redes-sociales)
- [Sistema de Anti-Spam](#-sistema-de-anti-spam)
- [Sistema Anti-Profanidad](#-sistema-anti-profanidad)
- [Sistema de Uptime 24/7](#-sistema-de-uptime-247)
- [Deployment en Oracle Cloud VPS](#-deployment-en-oracle-cloud-vps)

---

## 🎫 Sistema de Tickets

### Descripción General
Sistema completo de gestión de tickets con 13 categorías configurables, transcripciones automáticas, soporte de voz y sistema de uso limitado.

### Categorías Disponibles
1. **Soporte/dudas** 🔧 - Consultas generales de normativas o del servidor
2. **Bugs/Fallos** ⚠️ - Reporta errores técnicos o fallos del servidor
3. **Donaciones** 💰 - Realizar donación o consultar beneficios VIP
4. **Playmakers** 👥 - Solicitudes o consultas relacionadas con playermakers
5. **CK** ☑️ - Peticiones o revisiones de CK
6. **Reportes Públicos** 💬 - Reporta jugadores o incumplimientos del reglamento
7. **Ticket de apelación** ⚖️ - Apela una sanción o ban del servidor
8. **Ticket de devoluciones** 🔄 - Recupera objetos, dinero o vehículos perdidos por bugs
9. **Creador de contenido** 📹 - Gestión y permisos para creadores de contenido
10. **Peds** 🏠 - Solicita o modifica tu ped personalizado
11. **EMS** 🚑 - Altas, bajas, dudas o gestiones del cuerpo médico
12. **LSPD/SAPD** 👮 - Gestiones policiales: ascensos, bajas, reportes
13. **Organizaciones criminales** 🔫 - Soporte, registro o gestión de bandas criminales

### Comandos Disponibles

#### `/setup-ticket-panel`
Crea el panel de selección de tickets con menú desplegable.
- **Permisos requeridos**: Administrador
- **Ubicación**: Canal configurado en `ticketChannelId`
- **Funcionalidad**: 
  - Crea embed con menú desplegable
  - Muestra las 13 categorías con sus descripciones personalizadas
  - Permite al usuario seleccionar el tipo de ticket

#### `/add-ticket-menu`
Añade el menú de tickets a un mensaje existente.
- **Permisos requeridos**: Administrador
- **Parámetros**: `message_id` (ID del mensaje donde se agregará el menú)
- **Funcionalidad**:
  - Añade el selector desplegable a cualquier mensaje
  - Confirmación efímera (solo la ve el admin)
  - Útil para personalizar mensajes con embeds propios

#### `/añadir-usuario`
Añade un usuario adicional a un ticket específico.
- **Permisos requeridos**: Staff (rol configurado)
- **Ubicación**: Solo funciona dentro de canales de tickets
- **Parámetros**: `usuario` (usuario a añadir al ticket)
- **Funcionalidad**:
  - Otorga permisos de visualización y escritura al usuario mencionado
  - Permite colaboración en tickets
  - Registra la acción en logs de tickets
  - Confirmación con embed visual
- **Casos de uso**:
  - Añadir otro miembro del staff para colaborar
  - Incluir a otro usuario relacionado con el ticket
  - Permitir que testigos participen en reportes

#### `/transcript`
Genera una transcripción manual del ticket actual.
- **Permisos requeridos**: Gestionar Mensajes (Manage Messages)
- **Ubicación**: Solo funciona dentro de canales de tickets
- **Parámetros**: `cantidad` (opcional, 1-50 mensajes, por defecto 50)
- **Funcionalidad**:
  - Genera archivo `.txt` con transcripción completa del ticket
  - Envía automáticamente al canal de transcripciones de la categoría
  - Incluye embed con información detallada del ticket
  - Respuesta efímera confirmando el envío
- **Información incluida en la transcripción**:
  - Metadata completa del ticket (tipo, número, creador)
  - Todos los mensajes con timestamps
  - Archivos adjuntos con URLs
  - Embeds y stickers
  - Lista de participantes
- **Casos de uso**:
  - Generar backup antes de cambios importantes
  - Documentar conversaciones específicas sin cerrar el ticket
  - Crear registros parciales para reportes
  - Guardar evidencia de interacciones importantes

### Funcionalidades del Sistema

#### Creación de Tickets
1. Usuario selecciona categoría del menú desplegable
2. Bot crea canal privado con formato: `🎫│ticket-[número]`
3. Permisos configurados automáticamente:
   - Usuario creador: Ver canal, enviar mensajes, leer historial
   - Staff (rol configurado): Acceso completo
   - @everyone: Sin acceso
4. Embed de bienvenida con:
   - Información del tipo de ticket
   - Descripción de la categoría
   - Número de ticket
   - Hora de creación
5. Botones de acción disponibles

#### Botones de Acción

**🔧 Subir a soporte**
- Crea canal de voz privado para el ticket
- Permisos: Creador del ticket y staff
- Contador de usos: Máximo 2 canales de voz por ticket
- Timer automático de 15 minutos
- Nombre del canal: `🎤│Ticket-[número]`

**🔒 Cerrar Ticket**
- Solo accesible por staff (rol configurado)
- Inicia proceso de cierre:
  1. Genera transcripción completa del canal
  2. Guarda en canal de transcripciones configurado
  3. Elimina el canal del ticket
  4. Registra en logs de tickets

#### Sistema de Transcripciones
- **Formato**: HTML con estilos de Discord
- **Contenido incluido**:
  - Todos los mensajes del canal
  - Autor, timestamp y contenido
  - Archivos adjuntos con enlaces
  - Embeds y respuestas
  - Menciones formateadas
- **Almacenamiento**: Canal específico por categoría
- **Metadata**:
  - Número de ticket
  - Categoría
  - Creador
  - Fecha de cierre
  - Total de mensajes

#### Contadores Persistentes
- Archivo: `ticket-counters.json`
- Contador global por categoría
- Sobrevive a reinicios del bot
- Formato: `#1, #2, #3...`

---

## 🎤 Sistema de Voice Support

### Descripción General
Sistema de canales de voz temporales para tickets con persistencia de timers, auto-desconexión y límite de usos.

### Características Principales

#### Creación de Canal de Voz
- **Activación**: Botón "🔧 Subir a soporte" en tickets
- **Permisos**: Solo el creador del ticket puede usarlo
- **Límite**: 2 canales de voz por ticket
- **Ubicación**: Misma categoría que el ticket
- **Formato**: `🎤│Ticket-[número]`

#### Sistema de Timer Persistente
- **Duración**: 15 minutos desde que el primer usuario se conecta
- **Persistencia**: Sobrevive a reinicios del bot
- **Archivo**: `voice-support-data.json`
- **Funcionalidad**:
  1. Guarda tiempo de inicio cuando usuario se conecta
  2. Al reiniciar bot, calcula tiempo restante
  3. Programa timer con tiempo restante
  4. Si ya pasaron 15 min, elimina inmediatamente

#### Auto-Desconexión
Cuando el timer expira (15 minutos):
1. Desconecta a TODOS los usuarios del canal
2. Elimina el canal de voz
3. Actualiza el archivo de persistencia
4. Registra en logs de canales

#### Contador de Usos
- Muestra usos actuales: `📊 Usos: 1/2`
- Impide crear más de 2 canales por ticket
- Mensaje efímero al alcanzar límite

#### Manejo de Canales Vacíos
- Si el canal queda vacío (sin usuarios)
- Se elimina automáticamente
- No cuenta contra el límite de 2 usos
- Actualiza archivo de persistencia

---

## 📋 Sistema de Gestión de Tareas

### Descripción General
Sistema ultra-simple de gestión de tareas con categorización automática por IA, actualización dinámica de embeds, completado por copiar/pegar y 12 categorías con colores distintivos.

### Filosofía del Sistema
**"Extremadamente simple y visualmente limpio"** - Diseñado para que cualquier administrador pueda crear, organizar y completar tareas sin leer documentación ni recordar comandos complejos.

### Comandos Disponibles

#### `/tareas`
Crea o agrega tareas con categorización automática por IA.
- **Permisos requeridos**: Administrador
- **Parámetros**:
  - `lista` (requerido): Lista de tareas enumeradas
  - `categoria` (opcional): Categoría manual para todas las tareas
- **Formatos soportados**:
  - `1. Tarea` (números con punto)
  - `- Tarea` (viñetas)
  - `• Tarea` (bullets)
  - `1. A 2. B 3. C` (inline multi-tarea)
- **Funcionalidad**:
  1. Parser inteligente detecta formato automáticamente
  2. IA (GPT-4o-mini) categoriza cada tarea
  3. Elimina embeds antiguos si existen
  4. Envía embeds actualizados con todas las tareas (nuevas + viejas)
  5. Cada categoría tiene su propio embed con color distintivo

**Ejemplo básico:**
```
/tareas lista: 1. Configurar tickets 2. Eliminar bots 3. Leer un libro
```

**Ejemplo con categoría manual:**
```
/tareas lista: 1. Revisar staff 2. Actualizar reglas categoria: Administración
```

#### `/ver-tareas`
Muestra todas las tareas actuales organizadas por categoría.
- **Permisos requeridos**: Administrador
- **Funcionalidad**:
  - Muestra progreso total (X/Y completadas)
  - Embeds separados por categoría con colores
  - Tareas completadas aparecen ~~tachadas~~
  - Contador individual por categoría

#### `/limpiar-tareas`
Elimina TODAS las tareas del servidor.
- **Permisos requeridos**: Administrador
- **Confirmación**: Requiere confirmación con botones
- **Funcionalidad**:
  - Elimina todas las tareas de la base de datos
  - Confirmación de seguridad antes de ejecutar
  - Útil para empezar de cero

### Sistema de Categorización con IA

#### Categorías Disponibles (12)
Cada categoría tiene color distintivo y emoji identificador:

| Categoría | Color | Hex | Emoji | Uso |
|-----------|-------|-----|-------|-----|
| **Discord** | Azul Discord | #5865F2 | 💬 | Gestión de Discord, bots, roles |
| **Scripts GTA** | Cyan | #00D9FF | 🎮 | Scripts GTA RP, configuraciones |
| **Desarrollo** | Verde | #57F287 | 💻 | Código, features, actualizaciones |
| **Moderación** | Rojo | #ED4245 | 🛡️ | Reportes, baneos, staff |
| **Configuración** | Amarillo | #FEE75C | ⚙️ | Configurar canales, permisos |
| **Eventos** | Rosa | #EB459E | 🎉 | Torneos, eventos, sorteos |
| **Marketing** | Coral | #FF6B6B | 📢 | Redes sociales, promoción |
| **Soporte** | Azul claro | #5DADEC | 🎫 | Tickets, atención usuarios |
| **Bugs** | Naranja | #FF5733 | 🐛 | Errores, fallos técnicos |
| **Contenido** | Púrpura | #9B59B6 | 📝 | Documentación, anuncios |
| **Administración** | Dorado | #FFD700 | 👑 | Gestión staff, estadísticas |
| **General** | Gris | #95A5A6 | 📋 | Todo lo demás |

#### Funcionamiento de la IA
- **Modelo**: GPT-4o-mini (OpenAI)
- **Velocidad**: ~1-2 segundos para 10 tareas
- **Precisión**: ~95% de acierto
- **Proceso**:
  1. Analiza el texto de cada tarea
  2. Entiende el contexto y objetivo
  3. Asigna la categoría más apropiada
  4. Responde en formato JSON estructurado

**Ejemplo de categorización:**
```
Tareas enviadas:
1. Eliminar bots innecesarios
2. Configurar admin menu
3. Leer un libro

IA categoriza como:
1. Discord (Eliminar bots)
2. Scripts GTA (Configurar admin menu)
3. General (Leer un libro)
```

### Sistema de Completado por Copiar/Pegar

#### Flujo de Completado
1. Usuario ve las tareas en los embeds
2. Copia el texto exacto de la tarea completada
3. Pega el texto en el chat del servidor
4. **Bot automáticamente**:
   - Detecta que el texto coincide con una tarea
   - Elimina el mensaje del usuario (interfaz limpia)
   - Marca la tarea como completada
   - Tacha la tarea en el embed (~~texto~~)
   - Actualiza el contador (1/3 → 2/3)
   - Todo silencioso (sin notificaciones)

#### Detección Inteligente
**Búsqueda EXACTA primero:**
```sql
SELECT * FROM simple_tasks 
WHERE LOWER(task_text) = LOWER('texto_pegado')
AND completed = FALSE
```

**Búsqueda PARCIAL si no hay exacta:**
```sql
SELECT * FROM simple_tasks 
WHERE LOWER(task_text) LIKE '%texto_pegado%'
AND completed = FALSE
```

**Previene:** Marcar múltiples tareas accidentalmente con límite de 1 resultado.

### Sistema de Actualización Automática de Embeds

#### Proceso de Actualización
Cuando el usuario ejecuta `/tareas` por segunda vez:

1. **Eliminar embeds antiguos**:
   - Busca IDs de mensajes guardados en la base de datos
   - Elimina todos los embeds previos del canal
   - Limpia la interfaz para evitar duplicados

2. **Obtener todas las tareas**:
   - Consulta base de datos por todas las tareas del servidor
   - Agrupa por categoría
   - Incluye tanto tareas viejas como nuevas

3. **Generar embeds actualizados**:
   - Crea embeds con todas las tareas consolidadas
   - Aplica colores por categoría
   - Numera las tareas (1, 2, 3...)
   - Tacha las completadas

4. **Enviar nuevos embeds**:
   - Envía embeds actualizados (hasta 10 por mensaje)
   - Guarda nuevos IDs de mensajes en DB
   - Resultado: Siempre una lista única y consolidada

**Ventaja:** Nunca hay embeds duplicados, siempre se ve una lista actualizada con todas las tareas.

### Visualización de Embeds

#### Formato de Embed
```
[COLOR DISTINTIVO POR CATEGORÍA]

💻 Desarrollo
1. ~~Arreglar bug en tickets~~
2. Añadir nueva feature de logs
3. Actualizar documentación del bot

1/3 completadas • Copia y pega la tarea en el chat para tacharla
```

**Elementos del embed:**
- **Color de borde**: Color distintivo de la categoría
- **Título**: Emoji + Nombre de categoría
- **Lista numerada**: 1, 2, 3, etc.
- **Tachado**: ~~Para tareas completadas~~
- **Footer**: Progreso (X/Y) + instrucciones

#### Múltiples Embeds
- Máximo 10 embeds por mensaje (limitación de Discord)
- Si hay más de 10 categorías, se envían mensajes adicionales
- Todos los IDs se guardan en DB para actualización

### Base de Datos PostgreSQL

#### Tabla: `simple_tasks`
```sql
CREATE TABLE simple_tasks (
    id SERIAL PRIMARY KEY,
    guild_id VARCHAR(32) NOT NULL,
    channel_id VARCHAR(32),
    message_id TEXT,              -- IDs separados por coma
    category VARCHAR(100) NOT NULL,
    task_text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);
```

**Características:**
- `message_id` tipo TEXT para almacenar múltiples IDs: `"123,456,789"`
- Persistencia permanente (sobrevive reinicios)
- Búsqueda eficiente por texto
- Historial completo de tareas

#### Consultas Comunes
```sql
-- Ver todas las tareas
SELECT * FROM simple_tasks WHERE guild_id = 'XXXXXXXXX';

-- Ver solo pendientes
SELECT * FROM simple_tasks WHERE guild_id = 'XXX' AND completed = FALSE;

-- Ver por categoría
SELECT * FROM simple_tasks WHERE guild_id = 'XXX' AND category = 'Desarrollo';

-- Progreso total
SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completadas
FROM simple_tasks WHERE guild_id = 'XXX';
```

### Parser de Listas Flexible

#### Formatos Soportados
El sistema detecta automáticamente múltiples formatos:

**Números con punto:**
```
1. Primera tarea
2. Segunda tarea
3. Tercera tarea
```

**Números con paréntesis:**
```
1) Primera tarea
2) Segunda tarea
```

**Viñetas:**
```
- Tarea A
- Tarea B
- Tarea C
```

**Bullets:**
```
• Tarea X
• Tarea Y
```

**Inline (múltiples en una línea):**
```
1. Tarea A 2. Tarea B 3. Tarea C
```

#### Regex de Detección
```javascript
// Multi-línea
/^\s*(?:[-•*]|\d+[\.)]\s+)(.+)/gm

// Inline
/(\d+)\.\s+([^0-9]+?)(?=\s+\d+\.|$)/g
```

### Características Únicas

#### 1. Interfaz Super Limpia
- ✅ Sin mensajes de confirmación molestos
- ✅ Sin notificaciones spam
- ✅ Auto-eliminación de mensajes de usuario
- ✅ Solo embeds visuales y limpios

#### 2. Actualización Inteligente
- ✅ Elimina embeds antiguos automáticamente
- ✅ Siempre muestra lista consolidada
- ✅ Nunca embeds duplicados
- ✅ Sistema de refresh transparente

#### 3. Categorización Automática
- ✅ 12 categorías con colores distintivos
- ✅ Detección inteligente con IA
- ✅ Opción de categoría manual
- ✅ Precisión del 95%

#### 4. Completado Intuitivo
- ✅ Copiar/pegar = completar
- ✅ Detección exacta y parcial
- ✅ Sin comandos complicados
- ✅ Auto-limpieza de mensajes

#### 5. Numeración Clara
- ✅ Listas numeradas (1, 2, 3)
- ✅ Fácil de referenciar
- ✅ Tachado visual para completadas
- ✅ Sin checkboxes confusos

#### 6. Persistencia Total
- ✅ PostgreSQL robusto
- ✅ Sobrevive reinicios
- ✅ Historial completo
- ✅ Actualización de embeds persistente

### Casos de Uso

#### Caso 1: To-Do Diario del Admin
```
/tareas lista:
1. Revisar mensajes de la noche
2. Responder tickets pendientes
3. Actualizar anuncio semanal
4. Planear evento del viernes
```
**IA categoriza:** General, Soporte, Contenido, Eventos

#### Caso 2: Checklist de Configuración (GTA RP)
```
/tareas lista:
1. Configurar el origen police
2. Configurar admin menu
3. Eliminar bots innecesarios
categoria: Scripts GTA
```
**Todo en Scripts GTA (Cyan)**

#### Caso 3: Lista de Bugs
```
/tareas lista:
- Comando de tickets no funciona
- Script de police crashea
- Admin menu no se abre
categoria: Bugs
```
**Todo en Bugs (Naranja)**

#### Caso 4: Actualización Continua
**Lunes:**
```
/tareas lista: 1. Revisar apps 2. Actualizar reglas
```

**Martes (agregar más):**
```
/tareas lista: 3. Configurar evento 4. Responder tickets
```
**Resultado:** Embeds muestran las 4 tareas consolidadas (elimina embeds viejos, envía nuevos).

### Estructura de Archivos

```
src/
├── systems/tasks/
│   └── simple-tasks-system.js    # Sistema principal
├── commands/tasks/
│   ├── tareas.js                 # /tareas
│   ├── ver-tareas.js             # /ver-tareas
│   └── limpiar-tareas.js         # /limpiar-tareas
└── handlers/events/
    └── message-create.js         # Detección de copiar/pegar
```

### Documentación Detallada

Para guía completa paso a paso, consultar:
- **SISTEMA-TAREAS.md** - Documentación extensa con ejemplos y troubleshooting

---

## 📊 Sistema de Logs

### Descripción General
Sistema completo de registro de actividades del servidor con 9 categorías diferentes.

### Canales de Logs Configurables

#### 1. Log de Mensajes (`messages`)
**Eventos registrados:**
- **Mensajes eliminados**:
  - Autor, contenido, canal
  - Archivos adjuntos
  - Embeds
  - Timestamp
- **Mensajes editados**:
  - Contenido anterior y nuevo
  - Autor, canal
  - Diferencias resaltadas

#### 2. Log de Miembros (`members`)
**Eventos registrados:**
- **Usuario se une**:
  - Nombre y tag
  - ID de usuario
  - Fecha de creación de cuenta
  - Timestamp de entrada
- **Usuario sale**:
  - Nombre y tag
  - Roles que tenía
  - Tiempo en el servidor
  - Timestamp de salida
- **Usuario actualiza perfil**:
  - Cambio de nickname
  - Cambio de avatar
  - Antes y después

#### 3. Log de Roles (`roles`)
**Eventos registrados:**
- **Roles añadidos a usuario**:
  - Usuario afectado
  - Rol añadido
  - Quién lo añadió (si disponible)
- **Roles removidos de usuario**:
  - Usuario afectado
  - Rol removido
  - Quién lo removió (si disponible)

#### 4. Log de Canales (`channels`)
**Eventos registrados:**
- **Canal creado**:
  - Nombre, tipo, categoría
  - Permisos configurados
  - Creador (si disponible)
- **Canal eliminado**:
  - Nombre, tipo
  - Última categoría
- **Canal actualizado**:
  - Cambios en nombre
  - Cambios en permisos
  - Cambios en configuración

#### 5. Log de Servidor (`server`)
**Eventos registrados:**
- **Configuración del servidor modificada**:
  - Nombre del servidor
  - Icono del servidor
  - Banner, splash
  - Región de voz
  - Nivel de verificación
- **Emojis añadidos/eliminados**
- **Stickers añadidos/eliminados**

#### 6. Log de Voz (`voice`)
**Eventos registrados:**
- **Usuario se conecta a voz**:
  - Usuario, canal
  - Timestamp
- **Usuario se desconecta de voz**:
  - Usuario, canal anterior
  - Duración de la sesión
- **Usuario cambia de canal**:
  - Canal anterior y nuevo
  - Timestamp

#### 7. Log de Moderación (`moderation`)
**Eventos registrados:**
- **Baneos**:
  - Usuario baneado
  - Moderador
  - Razón
  - Timestamp
- **Expulsiones**:
  - Usuario expulsado
  - Moderador
  - Razón
- **Timeouts**:
  - Usuario, duración
  - Moderador, razón
- **Advertencias** (del sistema de moderación IA)

#### 8. Log de Tickets (`tickets`)
**Eventos registrados:**
- **Ticket creado**:
  - Número de ticket
  - Categoría
  - Creador
  - Canal creado
- **Ticket cerrado**:
  - Número de ticket
  - Quién lo cerró
  - Transcripción guardada
  - Duración del ticket
- **Canal de voz creado en ticket**:
  - Número de ticket
  - Canal de voz creado
  - Usos restantes

#### 9. Log de Invitaciones (`invitations`)
**Eventos registrados:**
- **Usuario se une con invitación**:
  - Quién invitó
  - Código de invitación usado
  - Total de invitaciones del invitador
  - Cuenta nueva vs cuenta antigua
- **Invitación creada**:
  - Código, creador
  - Usos máximos, expiración
- **Invitación eliminada**:
  - Código, quién la eliminó

### Sistema de Caché de Invitaciones
- Archivo: `invitations-cache.json`
- Carga invitaciones al iniciar
- Compara para detectar cuál se usó
- Actualiza automáticamente

---

## 🛡️ Sistema de Moderación con IA

### Descripción General
Sistema de moderación automática usando IA (OpenAI GPT-4o-mini) para detectar contenido inapropiado y tomar acciones automáticas.

### Configuración
```json
"moderation": {
  "enabled": true,
  "logChannelId": "ID_DEL_CANAL",
  "model": "gpt-4o-mini",
  "thresholds": {
    "warning": 0.3,
    "delete": 0.6,
    "timeout": 0.8
  }
}
```

### Tipos de Contenido Detectado
1. **NSFW** (contenido sexual explícito)
2. **Gore/Violencia gráfica**
3. **Discurso de odio**
4. **Acoso o bullying**
5. **Spam excesivo**
6. **Contenido ilegal**

### Niveles de Acción Automática

#### Nivel 1: Advertencia (0.3 - 0.6)
- Envía advertencia al usuario
- Registra en logs de moderación
- No elimina el mensaje

#### Nivel 2: Eliminación (0.6 - 0.8)
- Elimina el mensaje automáticamente
- Envía notificación al usuario
- Registra en logs con evidencia
- Embed con detalles del contenido detectado

#### Nivel 3: Timeout (0.8+)
- Elimina el mensaje
- Aplica timeout de 10 minutos
- Notifica al usuario
- Alerta a moderadores
- Log completo del incidente

### Detección de Imágenes NSFW/Gore
- Analiza todas las imágenes enviadas
- Usa OpenAI Vision API
- Detecta:
  - Contenido sexual explícito
  - Gore o violencia gráfica
  - Contenido perturbador
- Acción automática según nivel de confianza

### Logs de Moderación
Cada acción incluye:
- Usuario afectado
- Tipo de contenido detectado
- Nivel de confianza (0-1)
- Acción tomada
- Contenido del mensaje
- URL de imágenes (si aplica)
- Timestamp

### Exenciones
- Staff (rol configurado) está exento
- Canales específicos pueden ser excluidos
- Administradores pueden desactivar globalmente

---

## ✅ Sistema de Verificación

### Descripción General
Sistema de verificación mediante botón para acceder al servidor.

### Configuración
```json
"verification": {
  "enabled": true,
  "channelId": "ID_CANAL_VERIFICACION",
  "messageId": "ID_MENSAJE_BOTON",
  "roleId": "ID_ROL_VERIFICADO",
  "welcomeChannelId": "ID_CANAL_BIENVENIDA"
}
```

### Comando Disponible

#### `/setup-verification`
Configura el sistema de verificación.
- **Permisos requeridos**: Administrador
- **Funcionalidad**:
  - Crea mensaje con botón de verificación
  - Configura rol a otorgar
  - Configura canal de bienvenida

### Flujo de Verificación

1. **Usuario entra al servidor**:
   - Solo puede ver canal de verificación
   - Ve mensaje con botón "✅ Verificar"

2. **Usuario presiona botón**:
   - Recibe el rol configurado
   - Obtiene acceso al resto del servidor
   - Mensaje de bienvenida en canal configurado

3. **Mensaje de bienvenida**:
   - Menciona al usuario
   - Embed personalizable
   - Timestamp de entrada

### Persistencia
- Guarda `messageId` en `config.json`
- Al reiniciar, busca el mensaje
- Añade el botón si no existe
- No crea mensajes duplicados

---

## 📨 Sistema de Invitaciones

### Descripción General
Sistema de tracking de invitaciones para saber quién invitó a cada usuario.

### Funcionalidad Automática

#### Caché de Invitaciones
- Se carga al iniciar el bot
- Archivo: `invitations-cache.json`
- Actualiza automáticamente al detectar cambios

#### Detección de Invitaciones
Cuando un usuario se une:
1. Compara invitaciones actuales con caché
2. Detecta cuál aumentó en usos
3. Identifica quién invitó
4. Registra en logs de invitaciones

#### Información Registrada
- **Invitador**: Quién generó la invitación
- **Código usado**: Código de invitación específico
- **Total de invitaciones**: Contador del invitador
- **Tipo de cuenta**:
  - 🆕 Cuenta nueva (< 7 días)
  - ✅ Cuenta establecida (> 7 días)

### Logs de Invitaciones
Cada entrada incluye:
- Usuario que se unió
- Quién lo invitó
- Código de invitación
- Total de invitaciones del invitador
- Edad de la cuenta
- Timestamp

### Comandos de Invitaciones

#### `/invitaciones [usuario]`
Muestra estadísticas de invitaciones.
- **Parámetros**: 
  - `usuario` (opcional): Ver invitaciones de otro usuario
- **Información mostrada**:
  - Total de invitaciones
  - Invitaciones activas
  - Usuarios que se fueron
  - Lista de invitados

---

## 🤖 Sistema Q&A con IA

### Descripción General
Sistema de preguntas y respuestas automáticas usando IA entrenada con información del servidor.

### Configuración
```json
"qaSystem": {
  "enabled": true,
  "infoChannelId": "CANAL_INFORMACION",
  "questionsChannelId": "CANAL_PREGUNTAS",
  "responseModel": "gpt-4o-mini",
  "maxKnowledgeMessages": 100,
  "threadAutoArchiveDuration": 60
}
```

### Funcionamiento

#### Base de Conocimiento
- Lee mensajes del canal de información configurado
- Máximo 100 mensajes (configurable)
- Incluye:
  - Contenido de mensajes
  - Embeds
  - Enlaces
  - Información estructurada

#### Sistema de Respuesta
Cuando un usuario pregunta en el canal de preguntas:
1. Crea un hilo automáticamente
2. Título: Primera parte de la pregunta
3. Analiza la pregunta con GPT-4o-mini
4. Busca respuesta en base de conocimiento
5. Genera respuesta contextual
6. Responde en el hilo
7. Auto-archiva después de 60 minutos

#### Características de las Respuestas
- **Contextuales**: Basadas en info del servidor
- **Precisas**: Solo responde si tiene información
- **Amigables**: Tono profesional y útil
- **Con fuentes**: Puede citar mensajes de referencia

### Limitaciones
- Solo responde en canal configurado
- Requiere base de conocimiento en canal info
- Máximo 100 mensajes de referencia
- No responde preguntas fuera de contexto

---

## 📝 Panel de Embeds Anónimos

### Descripción General
Sistema **100% privado y completamente anónimo** para crear embeds sin dejar rastros.

### Comando Principal

#### `/panel-embed`
Crea un panel privado para crear embeds personalizados de forma anónima.
- **Permisos**: Gestionar Mensajes (o rol configurado)
- **Parámetros**:
  - `canal`: Canal donde enviar el embed (opcional, por defecto: canal actual)

### Panel Completamente Privado (Efímero)

#### Privacidad Máxima
1. **Solo tú ves el panel**: El comando usa `ephemeral: true`
2. **El botón es privado**: Solo el usuario que ejecutó el comando puede ver y usar el botón
3. **Nadie más lo ve**: Ni siquiera aparece en el chat para otros usuarios
4. **Máxima discreción**: Imposible que alguien sepa que estás creando un embed

#### Modal de Creación
Al hacer clic en el botón "✨ Crear Embed", se abre un modal con:
- **Título**: Título del embed (máx. 256 caracteres)
- **Descripción**: Descripción del embed (máx. 4000 caracteres)
- **Color**: Color en hexadecimal (ej: ff0000)
- **Imagen**: URL de imagen (opcional)
- **Miniatura**: URL de miniatura (opcional)
- **Footer**: Texto del footer (opcional)

### Características de Anonimato

#### Eliminación Total de Rastros
1. Panel completamente efímero (solo lo ve quien ejecuta el comando)
2. Embed se envía sin autor
3. No aparece "Bot enviado por..."
4. No hay registro visible de quién lo creó
5. Logs de Discord no muestran conexión
6. El botón también es privado

#### Validaciones
- Color debe ser hexadecimal válido
- URLs de imágenes deben ser válidas
- Límites de caracteres respetados
- Permisos verificados

### Configuración Opcional
```json
"embed": {
  "defaultColor": "0099ff",
  "allowedRoleId": "ROL_ESPECIFICO",
  "allowedChannelId": "CANAL_ESPECIFICO",
  "maxTitleLength": 256,
  "maxDescriptionLength": 4000
}
```

### Casos de Uso
- Anuncios oficiales sin firma
- Información importante
- Comunicados del staff
- Mensajes de reglas
- Eventos y actualizaciones

---

## ⚙️ Sistema de Comandos Personalizados

### Descripción General
Sistema para crear comandos personalizados con triggers (prefijo `!`) que se borran automáticamente.

### Configuración
```json
"customCommands": {
  "staffRoleId": "ID_DEL_ROL_STAFF"
}
```
- Si `staffRoleId` está vacío: Requiere permiso de **Gestionar Mensajes**
- Si `staffRoleId` está configurado: Solo usuarios con ese rol pueden gestionar comandos

### Comandos de Gestión

#### `/crear-comando nuevo`
Crea un nuevo comando personalizado.
- **Permisos**: Rol configurado en `staffRoleId` (o Gestionar Mensajes si no hay rol)
- **Funcionalidad**: Abre un panel interactivo para crear el comando

#### `/crear-comando editar`
Modifica un comando existente.
- **Permisos**: Rol configurado en `staffRoleId` (o Gestionar Mensajes si no hay rol)
- **Parámetros**:
  - `comando`: Nombre del comando a editar

#### `/crear-comando eliminar`
Elimina un comando personalizado.
- **Permisos**: Rol configurado en `staffRoleId` (o Gestionar Mensajes si no hay rol)
- **Parámetros**:
  - `comando`: Nombre del comando a eliminar

#### `/crear-comando listar`
Muestra todos los comandos personalizados.
- **Permisos**: Rol configurado en `staffRoleId` (o Gestionar Mensajes si no hay rol)
- **Información mostrada**:
  - Lista completa de comandos
  - Estado (activo/inactivo)
  - Estadísticas de uso

### Funcionamiento

#### Uso de Comandos
Usuario escribe: `!normativa`
1. Bot detecta el trigger
2. Elimina el mensaje del usuario automáticamente
3. Envía el embed con la respuesta configurada
4. Chat queda limpio

#### Estructura de los Comandos
Cada comando personalizado incluye:
- **Título del embed**: Encabezado principal
- **Descripción**: Contenido principal del mensaje
- **Color**: Color personalizado en hexadecimal
- **Campos personalizados**: Campos adicionales con información
- **Footer**: Texto en la parte inferior
- **Imagen**: URL de imagen grande (opcional)
- **Thumbnail**: URL de miniatura (opcional)
- **Estadísticas de uso**: Contador automático de usos

### Persistencia
- Archivo: `custom-commands.json`
- Se guarda automáticamente al crear/editar/eliminar
- Carga al iniciar el bot
- Sobrevive a reinicios

### Sistema de Permisos
- **Rol personalizado**: Configura `staffRoleId` para dar acceso solo a ese rol
- **Permiso por defecto**: Si no hay rol configurado, usa el permiso "Gestionar Mensajes"
- **Verificación automática**: El bot verifica permisos antes de permitir gestionar comandos

### Limitaciones
- Solo funciona con prefijo `!`
- Panel interactivo con formularios modales
- Solo usuarios con el rol configurado (o permiso) pueden gestionar

### Casos de Uso
- `!normativa` - Enlace a reglas
- `!discord` - Link del Discord
- `!whitelist` - Info sobre whitelist
- `!donaciones` - Info de donaciones
- `!staff` - Lista del staff

---

## 🔗 Sistema de Vinculación de Redes Sociales

### Descripción General
Sistema para vincular cuentas de redes sociales de usuarios del servidor.

### Comando Principal

#### `/vincular-redes`
Vincula redes sociales a tu perfil.
- **Parámetros**:
  - `instagram`: Usuario de Instagram (opcional)
  - `twitter`: Usuario de Twitter (opcional)
  - `tiktok`: Usuario de TikTok (opcional)
  - `youtube`: Canal de YouTube (opcional)
  - `twitch`: Canal de Twitch (opcional)

### Funcionamiento

#### Vinculación
1. Usuario ejecuta comando con sus redes
2. Sistema guarda en `social-links.json`
3. Confirmación efímera
4. Datos quedan vinculados al ID del usuario

#### Consulta de Redes
Comando: `/redes [usuario]`
- Sin parámetro: Muestra tus redes
- Con parámetro: Muestra redes de otro usuario
- Formato: Embed con iconos y enlaces

### Formato de Datos
```json
{
  "userId": "123456789",
  "username": "Usuario#0000",
  "links": {
    "instagram": "usuario_ig",
    "twitter": "usuario_tw",
    "tiktok": "@usuario_tt",
    "youtube": "canal_yt",
    "twitch": "usuario_twitch"
  },
  "updatedAt": "2025-11-06T..."
}
```

### Características
- **Actualizable**: Se puede volver a ejecutar para cambiar
- **Opcional**: No todos los campos son obligatorios
- **Persistente**: Sobrevive a reinicios
- **Privado**: Solo se muestra cuando se consulta

### Validaciones
- Verifica formato de usuarios
- Elimina caracteres especiales
- Valida longitud
- Previene inyecciones

---

## 🚫 Sistema de Anti-Spam

### Descripción General
Sistema automático de detección y prevención de spam con **timeout fijo de 2 minutos**, eliminación de mensajes recientes, notificación por DM al usuario y alerta completa al staff.

### Configuración
```json
"antiSpam": {
  "enabled": true,
  "maxMessages": 15,
  "maxDuplicates": 3,
  "timeWindow": 120,
  "minMessageLength": 3,
  "maxWarnings": 3,
  "applyTimeout": true,
  "timeoutDurationMinutes": 15
}
```

### Detección de Spam

#### Límites Configurables
- **maxMessages**: Máximo 15 mensajes permitidos en la ventana de tiempo
- **maxDuplicates**: Máximo 3 mensajes duplicados (mismo contenido)
- **timeWindow**: Ventana de tiempo de 120 segundos (2 minutos)
- **minMessageLength**: Mensajes menores a 3 caracteres se ignoran
- **maxWarnings**: Máximo 3 advertencias antes de acciones más severas

#### Tipos de Spam Detectados
1. **Flood**: 15+ mensajes en 2 minutos
2. **Mensajes duplicados**: Mismo contenido repetido 3+ veces
3. **Spam de caracteres**: Mensajes muy cortos repetitivos

### Acciones Automáticas (Cada Infracción)

Cuando se detecta spam, el bot ejecuta **automáticamente**:

#### 1. Eliminación de Mensajes Recientes
- Elimina **TODOS los mensajes** del usuario de los **últimos 2 minutos**
- Limpia el canal automáticamente
- Registra cada mensaje eliminado

#### 2. Timeout Fijo de 2 Minutos
- Aplica timeout de **exactamente 2 minutos** (120 segundos)
- El usuario **NO puede escribir** durante ese tiempo
- Cooldown obligatorio antes de participar nuevamente

#### 3. Notificación Privada por DM al Usuario
Se envía un embed privado al usuario con:
- ⚠️ **Título**: "Timeout Aplicado - Spam Detectado"
- 📊 **Contador de advertencias**: `X/3`
- 🔒 **Servidor**: Nombre del servidor
- ⏰ **Duración del timeout**: 2 minutos
- 🕐 **Cuándo podrá volver a escribir**: Timestamp relativo
- 💡 **Mensaje educativo** sobre las normas

#### 4. Alerta Completa al Canal de Staff
Se envía un embed detallado al canal de logs de staff con:
- 👤 **Usuario afectado** (con avatar y tag)
- 🆔 **ID del usuario**
- ⚠️ **Contador de advertencias**: `X/3`
- 📝 **Mensajes detectados**: Cantidad
- 📍 **Canal donde ocurrió**
- 🕐 **Hora exacta** del incidente
- ⏰ **Timeout aplicado**: 2 minutos
- 🔓 **Cuándo podrá escribir**: Timestamp relativo
- 💬 **Ejemplo de contenido**: Muestra del spam
- ✅ **Resumen de acciones tomadas**:
  - Timeout de 2 minutos aplicado
  - Mensajes de los últimos 2 minutos eliminados
  - Notificación enviada al usuario por DM

### Sistema de Tracking
- Rastrea mensajes por usuario en tiempo real
- Ventana de tiempo deslizante de 2 minutos
- Contador de advertencias persistente
- Se resetea automáticamente después del timeout

### Persistencia
- El historial de mensajes se mantiene en memoria
- Los contadores de advertencias persisten durante la sesión
- Se limpia automáticamente tras resolver infracciones

### Exenciones
- Canales específicos pueden excluirse (`excludedChannels`)
- Mensajes muy cortos (<3 caracteres) se ignoran automáticamente

---

## 🤬 Sistema Anti-Profanidad

### Descripción General
Sistema de filtrado automático de palabras prohibidas y lenguaje inapropiado.

### Configuración
```json
"antiProfanity": {
  "enabled": true,
  "action": "delete",
  "warnUser": true,
  "logChannelId": "ID_CANAL_LOGS",
  "customWords": []
}
```

### Palabras Filtradas

#### Lista Base (Español)
- Groserías comunes
- Insultos
- Lenguaje ofensivo
- Términos despectivos

#### Palabras Personalizadas
Añadir en `customWords`:
```json
"customWords": ["palabra1", "palabra2", "palabra3"]
```

### Detección Inteligente

#### Variaciones Detectadas
- Espacios entre letras: `p a l a b r a`
- Números como letras: `p4l4br4`
- Caracteres especiales: `p@l@br@`
- Mayúsculas/minúsculas: `PaLaBrA`

#### Contexto
- Detecta palabras completas
- Ignora palabras que contienen el término
- Evita falsos positivos

### Acciones Configurables

#### `delete` (Eliminar)
1. Elimina el mensaje automáticamente
2. Envía advertencia efímera al usuario
3. Registra en logs

#### `warn` (Advertir)
1. Deja el mensaje
2. Envía advertencia pública
3. Registra en logs

#### `timeout` (Timeout)
1. Elimina el mensaje
2. Aplica timeout al usuario
3. Notifica al usuario y moderadores
4. Registro completo

### Logs de Profanidad
Cada detección incluye:
- Usuario infractor
- Palabra detectada
- Contenido del mensaje
- Acción tomada
- Canal donde ocurrió
- Timestamp

### Exenciones
- Staff exento por defecto
- Configuración por canal
- Lista de usuarios exentos

---

## ⏰ Sistema de Uptime 24/7

### Descripción General
Sistema de monitoreo y auto-reinicio (watchdog) para mantener el bot en línea 24/7.

### Archivo Principal
`watchdog.js` - Proceso supervisor del bot

### Funcionamiento

#### Health Check
- **Frecuencia**: Cada 60 segundos
- **Verificación**: 
  - Bot está en línea
  - Bot responde a eventos
  - Conexión WebSocket activa
  - Memoria dentro de límites

#### Auto-Reinicio

**Cuando se reinicia:**
1. Bot no responde a health check
2. Bot se desconecta inesperadamente
3. Error fatal no capturado
4. Memoria excede límites
5. Crash del proceso

**Proceso de reinicio:**
1. Detecta fallo
2. Mata proceso anterior
3. Espera cooldown (12 minutos)
4. Inicia nuevo proceso
5. Verifica que inició correctamente
6. Continúa monitoring

#### Límites de Seguridad

**Máximo reinicios por hora**: 5
- Previene loop infinito de crashes
- Si excede, espera más tiempo
- Alerta en consola

**Cooldown entre reinicios**: 720 segundos (12 minutos)
- Evita reinicios muy seguidos
- Da tiempo a estabilizarse
- Previene sobrecarga

### Logs del Watchdog
```
👁️ Watchdog iniciado
   - Health check cada 60s
   - Máximo 5 reinicios por hora
   - Cooldown de 720s entre reinicios
✅ Health check: Bot activo
⚠️ Bot no responde, reiniciando...
🔄 Reiniciando bot...
✅ Bot reiniciado exitosamente
```

### Manejo de Errores

#### Errores Capturados
1. **Errores de conexión**: Reconecta automáticamente
2. **Errores de API**: Retry con backoff
3. **Errores de comandos**: Log sin crash
4. **Errores de base de datos**: Intenta recuperar

#### Errores que Causan Reinicio
1. WebSocket cerrado permanentemente
2. Proceso terminado inesperadamente
3. Memoria excedida
4. Error fatal no capturado

### Persistencia de Datos

Antes de cada reinicio:
1. Guarda todos los datos en archivos JSON
2. Cierra conexiones limpiamente
3. Libera recursos
4. Inicia proceso limpio

Al reiniciar:
1. Carga datos de archivos
2. Reconecta a Discord
3. Restaura estado (timers, contadores, etc.)
4. Continúa operación normal

### Monitoring
- Estado del bot en consola
- Timestamps de health checks
- Historial de reinicios
- Razones de fallos
- Uso de memoria
- Uptime total

---

## 📌 Notas Importantes

### Archivos de Persistencia
Todos estos archivos se guardan automáticamente y sobreviven a reinicios:
- `ticket-counters.json` - Contadores de tickets
- `custom-commands.json` - Comandos personalizados
- `social-links.json` - Vínculos de redes sociales
- `invitations-cache.json` - Caché de invitaciones
- `voice-support-data.json` - Estado de canales de voz y timers

### Seguridad
- Todas las secrets en variables de entorno
- No se exponen tokens en código
- Logs no incluyen información sensible
- Permisos verificados en cada comando

### Rendimiento
- Caché en memoria para datos frecuentes
- Archivos JSON para persistencia
- Escritura asíncrona de archivos
- Manejo eficiente de eventos

### Privacidad
- Bot NO comparte información entre servidores
- Cada servidor tiene datos independientes
- Verificación de `guildId` en todas las operaciones
- Respuestas efímeras para comandos sensibles

### Configuración
Todo configurable en `config.json`:
- IDs de canales
- IDs de roles
- Umbrales de moderación
- Límites de spam
- Palabras filtradas
- Colores y textos

---

## 🆘 Soporte y Documentación Adicional

### Archivos de Documentación
- `README.md` - Guía general
- `TICKETS-CONFIG-GUIDE.md` - Guía de configuración de tickets
- `CUSTOM-COMMANDS-README.md` - Guía de comandos personalizados
- `replit.md` - Información del proyecto y preferencias

### Configuración Inicial
1. Configurar `allowedGuildId` en config.json
2. Configurar todos los canales de logs
3. Configurar rol de staff
4. Ejecutar `/setup-ticket-panel`
5. Ejecutar `/setup-verification`
6. Configurar categorías de tickets
7. Añadir palabras al filtro anti-profanidad si es necesario

### Mantenimiento
- Revisar logs regularmente
- Actualizar base de conocimiento Q&A
- Limpiar archivos JSON antiguos si es necesario
- Monitorear uso de memoria
- Verificar que todos los canales existen

---

## 🚀 Deployment en Oracle Cloud VPS

### Descripción General
Guía para configurar el bot en Oracle Cloud VPS (Always Free Tier) y mantenerlo activo 24/7 de forma gratuita.

### Ventajas de Oracle Cloud VPS

#### Características del Always Free Tier
- ✅ **100% Gratis para siempre** (no es trial)
- ✅ **VPS con 1GB RAM / 1 vCPU**
- ✅ **Uptime 24/7 real** sin limitaciones
- ✅ **47GB de almacenamiento**
- ✅ **Ubuntu 22.04 LTS**
- ✅ **IP pública estática**
- ✅ **PostgreSQL propio**

#### Comparación con Otras Opciones

| Plataforma | Costo | Uptime | Facilidad |
|------------|-------|--------|-----------|
| **Oracle Cloud** | Gratis | 100% | ⭐⭐⭐ |
| **Replit Reserved VM** | $20/mes | 100% | ⭐⭐⭐⭐⭐ |
| **Railway** | Gratis | ~67% | ⭐⭐⭐⭐⭐ |
| **Hosting Propio** | Gratis* | 100% | ⭐⭐ |

### Requisitos Previos

**Para crear la cuenta:**
- Correo electrónico
- Tarjeta de crédito/débito (solo verificación, NO se cobra)
- Código del bot en GitHub

**Herramientas en tu PC:**
- **Windows**: PuTTY o Windows Terminal
- **Mac/Linux**: Terminal (incluido)
- **Opcional**: FileZilla (transferencia de archivos)

### Proceso de Configuración (Resumen)

#### 1. Crear Cuenta en Oracle Cloud
```
https://www.oracle.com/cloud/free/
```
- Registro gratuito
- Verificación con tarjeta (cargo de $1 devuelto)
- Always Free Tier activado

#### 2. Crear VPS (Compute Instance)
- **Nombre**: discord-bot-vps
- **Image**: Ubuntu 22.04
- **Shape**: VM.Standard.E2.1.Micro (Always Free)
- **SSH Keys**: Generar y descargar claves
- **Network**: Public IP habilitado

#### 3. Conectarse por SSH
**Windows (PuTTY):**
```
1. Convertir clave SSH a .ppk con PuTTYgen
2. Conectar: ubuntu@TU_IP_PUBLICA
3. Puerto 22
```

**Mac/Linux:**
```bash
ssh -i ~/ruta/clave.key ubuntu@TU_IP_PUBLICA
```

#### 4. Configurar Sistema
```bash
# Actualizar Ubuntu
sudo apt update && sudo apt upgrade -y

# Instalar herramientas
sudo apt install -y curl wget git nano ufw

# Zona horaria (opcional)
sudo timedatectl set-timezone America/Mexico_City
```

#### 5. Instalar Node.js 20
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar
node --version  # v20.x.x
npm --version   # 10.x.x
```

#### 6. Instalar PostgreSQL
```bash
# Instalar
sudo apt install -y postgresql postgresql-contrib

# Iniciar servicio
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Crear base de datos y usuario
sudo -u postgres psql

CREATE DATABASE discord_bot;
CREATE USER botuser WITH PASSWORD 'tu_password_seguro';
GRANT ALL PRIVILEGES ON DATABASE discord_bot TO botuser;
\q

# Configurar autenticación
sudo nano /etc/postgresql/14/main/pg_hba.conf
# Cambiar "peer" a "md5" en la línea local

# Reiniciar
sudo systemctl restart postgresql
```

#### 7. Subir Código del Bot
**Opción A - Desde GitHub (Recomendado):**
```bash
cd ~
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd TU_REPO
npm install
```

**Opción B - FileZilla:**
- Conectar por SFTP
- Subir archivos manualmente
- Ejecutar `npm install` en SSH

#### 8. Configurar Variables de Entorno
```bash
cd ~/TU_REPO
nano .env
```

**Contenido del .env:**
```env
# Discord
DISCORD_BOT_TOKEN=tu_token_aqui

# PostgreSQL
DATABASE_URL=postgresql://botuser:tu_password@localhost:5432/discord_bot
PGHOST=localhost
PGPORT=5432
PGUSER=botuser
PGPASSWORD=tu_password
PGDATABASE=discord_bot

# OpenAI (para tareas IA)
OPENAI_API_KEY=sk-proj-...

# Gemini (si lo usas)
GEMINI_API_KEY=AIzaSy...

# Otros
SESSION_SECRET=secreto_aleatorio_123
```

Guardar: `Ctrl+O`, Enter, `Ctrl+X`

#### 9. Instalar PM2 (Gestor de Procesos)
```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar bot
cd ~/TU_REPO
pm2 start watchdog.js --name discord-bot

# Verificar estado
pm2 status

# Ver logs
pm2 logs discord-bot

# Configurar auto-inicio al reiniciar VPS
pm2 startup
# Copiar y ejecutar el comando que muestra
pm2 save

# Probar reinicio
sudo reboot
# Esperar 2 minutos, reconectar y verificar:
pm2 status
```

#### 10. Configurar Firewall
```bash
# Ubuntu Firewall (UFW)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw enable

# Verificar
sudo ufw status
```

**Oracle Cloud Firewall:**
1. Dashboard → Compute → Instances → Tu instancia
2. Primary VNIC → Subnet → Default Security List
3. Verificar que puerto 22 (SSH) esté permitido

### Comandos Útiles para Gestión

#### PM2 (Gestor del Bot)
```bash
pm2 status                      # Ver estado
pm2 logs discord-bot            # Logs en tiempo real
pm2 restart discord-bot         # Reiniciar bot
pm2 stop discord-bot            # Detener bot
pm2 monit                       # Monitor de recursos
```

#### Actualizar Código
```bash
cd ~/TU_REPO
git pull                        # Descargar cambios
npm install                     # Instalar dependencias
pm2 restart discord-bot         # Reiniciar bot
pm2 logs discord-bot --lines 50 # Ver logs
```

#### PostgreSQL
```bash
# Acceder a base de datos
psql -U botuser -d discord_bot -h localhost

# Backup
pg_dump -U botuser -d discord_bot -h localhost > backup_$(date +%Y%m%d).sql

# Ver tareas
psql -U botuser -d discord_bot -h localhost -c "SELECT * FROM simple_tasks;"
```

#### Mantenimiento del VPS
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Reiniciar VPS
sudo reboot

# Ver espacio en disco
df -h

# Ver uso de RAM
free -h

# Monitorear recursos
htop
```

### Solución de Problemas Comunes

#### Bot offline en Discord
```bash
# Verificar estado
pm2 status

# Ver logs
pm2 logs discord-bot --lines 50

# Reiniciar
pm2 restart discord-bot
```

#### Error "Cannot find module"
```bash
cd ~/TU_REPO
npm install
pm2 restart discord-bot
```

#### Base de datos no conecta
```bash
# Verificar PostgreSQL
sudo systemctl status postgresql

# Reiniciar PostgreSQL
sudo systemctl restart postgresql

# Verificar .env
cat .env | grep DATABASE_URL
```

#### VPS sin espacio
```bash
# Ver espacio
df -h

# Limpiar logs de PM2
pm2 flush

# Limpiar logs del sistema
sudo journalctl --vacuum-time=7d

# Limpiar paquetes
sudo apt autoremove -y
sudo apt clean
```

### Mantenimiento Recomendado

**Diario (Opcional):**
```bash
pm2 status
```

**Semanal:**
```bash
pm2 logs discord-bot --lines 100
```

**Mensual:**
```bash
sudo apt update && sudo apt upgrade -y
sudo reboot
# Esperar 2 minutos
pm2 status
```

### Documentación Completa

Para guía paso a paso detallada con capturas y troubleshooting completo:
- **ORACLE-CLOUD-SETUP.md** - Guía completa de configuración (70+ pasos)
- **COMANDOS-RAPIDOS-VPS.md** - Referencia rápida de comandos

### Ventajas del Sistema

#### Uptime 24/7 Real
- ✅ Bot siempre online
- ✅ PM2 reinicia automáticamente si se cae
- ✅ Auto-inicio al reiniciar VPS
- ✅ Sin limitaciones de horas

#### Control Total
- ✅ Acceso completo por SSH
- ✅ Configuración personalizada
- ✅ PostgreSQL propio
- ✅ Logs completos

#### Costo Cero
- ✅ Gratis para siempre (Always Free Tier)
- ✅ Sin cargos ocultos
- ✅ Sin límites de tiempo
- ✅ IP pública incluida

#### Rendimiento
- ✅ 1GB RAM dedicada
- ✅ 1 vCPU dedicada
- ✅ 47GB almacenamiento
- ✅ Latencia baja

---

**Última actualización**: 6 de noviembre de 2025
**Versión del bot**: 1.0.0
**Estado**: Producción ✅
