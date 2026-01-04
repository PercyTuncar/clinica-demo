# 🦷Sistema Completo de Gestión de Clínica Dental
## Especificación Técnica y Funcional Detallada

---

## 📋 ÍNDICE DE CONTENIDOS
1. Visión General del Sistema
2. Arquitectura y Stack Tecnológico
3. Sistema de Autenticación y Roles
4. Módulos del Sistema por Rol
5. Flujos de Usuario Detallados
6. Lógica de Negocio y Reglas
7. Gestión de Estado y Persistencia
8. Diseño y Experiencia de Usuario
9. Casos de Uso Específicos
10. Validaciones y Reglas de Consistencia

---

## 1. VISIÓN GENERAL DEL SISTEMA

### 1.1 Propósito
Crear un sistema de gestión integral para clínicas dentales que permita:
- A pacientes: Agendar citas de forma autónoma 24/7
- A recepcionistas: Gestionar agenda, pacientes y pagos
- A doctores: Ver su agenda personal y gestionar tratamientos
- A administradores: Supervisar operaciones, finanzas y reportes

### 1.2 Alcance Funcional
El sistema debe simular completamente las operaciones de una clínica dental real, incluyendo:
- Gestión de citas con disponibilidad en tiempo real
- Historial clínico de pacientes
- Control de tratamientos y seguimientos
- Gestión financiera (facturación, pagos, pendientes)
- Sistema de notificaciones (WhatsApp simulado, emails)
- Reportes y analytics
- Gestión de inventario básico

---

## 2. ARQUITECTURA Y STACK TECNOLÓGICO

### 2.1 Frontend Framework
- **Next.js 16+ con App Router**
- Rendering: Mix de Server Components y Client Components
- Route Groups para organizar: (public), (admin), (doctor), (reception)

### 2.2 Gestión de Estado
- **Zustand** como store global principal
- Stores separados por dominio:
  - `useAuthStore`: Autenticación y sesión actual
  - `useAppointmentStore`: Citas y disponibilidad
  - `usePatientStore`: Pacientes e historiales
  - `useFinanceStore`: Transacciones y reportes
  - `useDoctorStore`: Doctores y especialidades
  - `useServiceStore`: Servicios y precios

### 2.3 Persistencia de Datos
**CRÍTICO**: Usar React State + Variables de JavaScript, NO localStorage

```javascript
// Estructura en memoria
const mockDatabase = {
  users: [...], // Usuarios del sistema
  patients: [...], // Pacientes registrados
  appointments: [...], // Todas las citas
  services: [...], // Servicios ofrecidos
  doctors: [...], // Doctores y sus horarios
  payments: [...], // Registro de pagos
  treatments: [...], // Tratamientos en curso
  medicalRecords: [...] // Historiales clínicos
}
```

### 2.4 Diseño Visual
- **Tailwind CSS** con configuración personalizada
- Componentes base de **shadcn/ui**
- **Lucide React** para iconografía
- **Recharts** para gráficos y analytics
- Paleta de colores:
  - Primary: `#14B8A6` (Teal-500) - Confianza médica
  - Secondary: `#6366F1` (Indigo-500) - Acción
  - Success: `#10B981` (Emerald-500)
  - Warning: `#F59E0B` (Amber-500)
  - Danger: `#EF4444` (Red-500)
  - Neutral: `#64748B` (Slate-500)

---

## 3. SISTEMA DE AUTENTICACIÓN Y ROLES

### 3.1 Roles del Sistema

#### 3.1.1 PACIENTE (Sin Login Requerido - Vista Pública)
**Credenciales**: No requiere
**Acceso**: Página pública de agendamiento

**Funcionalidades**:
- Ver servicios disponibles y precios
- Ver equipo médico (doctores)
- Leer testimonios de pacientes
- Agendar citas (sin necesidad de cuenta)
- Recibir confirmación por WhatsApp/Email (simulado)
- Ver políticas de cancelación y términos

**Limitaciones**:
- No puede ver historial de citas previas
- No puede cancelar/reagendar sin código de confirmación
- No accede a historial médico

---

#### 3.1.2 RECEPCIONISTA
**Credenciales de Acceso**:
```
Email: recepcion@clinicadental.com
Password: Recep2024!
```

**Credenciales Alternativas** (para demo de múltiples usuarios):
```
Email: maria.gomez@clinicadental.com
Password: Maria2024!
---
Email: carlos.ruiz@clinicadental.com
Password: Carlos2024!
```

**Panel de Acceso**: `/dashboard/reception`

**Funcionalidades Completas**:

1. **Gestión de Agenda**:
   - Ver calendario completo de todos los doctores
   - Crear citas manualmente para cualquier doctor
   - Confirmar citas pendientes (cambiar estado: Pending → Confirmed)
   - Cancelar citas (con motivo obligatorio)
   - Reagendar citas (buscar nueva disponibilidad)
   - Enviar recordatorios manuales vía WhatsApp/SMS
   - Bloquear horarios específicos (ej: "Doctor en conferencia")
   - Ver lista de espera para citas canceladas

2. **Gestión de Pacientes**:
   - Registrar nuevos pacientes (datos completos)
   - Buscar pacientes existentes (por nombre, teléfono, ID)
   - Ver historial completo de citas de un paciente
   - Actualizar datos de contacto
   - Agregar notas administrativas (ej: "Paciente llega tarde habitualmente")
   - Ver alertas médicas (alergias, condiciones especiales)
   - Exportar lista de pacientes

3. **Gestión de Pagos**:
   - Registrar pagos en efectivo/tarjeta/transferencia
   - Generar facturas
   - Ver pagos pendientes
   - Aplicar descuentos con autorización
   - Registrar abonos (pagos parciales)
   - Imprimir recibos
   - Ver reporte diario de caja

4. **Comunicación**:
   - Enviar mensajes de WhatsApp masivos (recordatorios)
   - Confirmar citas por teléfono y actualizar sistema
   - Ver bandeja de mensajes recibidos (simulado)
   - Acceder a plantillas de mensajes predefinidas

5. **Reportes Básicos**:
   - Citas del día (por doctor)
   - Ingresos del día
   - Pacientes atendidos
   - Citas canceladas

**Limitaciones**:
- No puede modificar precios de servicios
- No puede eliminar pacientes (solo desactivar)
- No puede acceder a historiales médicos detallados
- No puede modificar horarios de doctores
- No puede ver reportes financieros avanzados

---

#### 3.1.3 DOCTOR/ODONTÓLOGO
**Credenciales de Acceso**:
```
Doctor 1:
Email: dra.sofia.martinez@clinicadental.com
Password: Sofia2024!
Especialidad: Ortodoncia

Doctor 2:
Email: dr.alejandro.torres@clinicadental.com
Password: Alejandro2024!
Especialidad: Endodoncia

Doctor 3:
Email: dra.valentina.lopez@clinicadental.com
Password: Valentina2024!
Especialidad: Implantología

Doctor 4:
Email: dr.diego.fernandez@clinicadental.com
Password: Diego2024!
Especialidad: Odontología General
```

**Panel de Acceso**: `/dashboard/doctor`

**Funcionalidades Completas**:

1. **Mi Agenda Personal**:
   - Ver SOLO sus propias citas del día/semana/mes
   - Ver detalles del paciente antes de la cita
   - Marcar llegada del paciente
   - Iniciar consulta (timer automático)
   - Finalizar consulta
   - Solicitar bloqueo de horarios (vacaciones, capacitaciones)
   - Ver tiempo promedio por consulta

2. **Historial Clínico**:
   - Ver historial completo del paciente actual
   - Agregar notas de consulta (odontograma digital)
   - Registrar diagnósticos
   - Prescribir tratamientos
   - Subir imágenes (Rayos X, fotos intraorales)
   - Firmar digitalmente notas médicas
   - Ver tratamientos previos de otros doctores

3. **Gestión de Tratamientos**:
   - Crear planes de tratamiento multi-sesión
   - Programar citas de seguimiento
   - Ver evolución de tratamientos (% completado)
   - Marcar procedimientos realizados
   - Adjuntar consentimientos informados
   - Registrar materiales utilizados

4. **Pacientes Asignados**:
   - Ver lista de "mis pacientes" (ha atendido previamente)
   - Acceder rápidamente a su historial
   - Ver próximas citas con cada uno
   - Agregar recordatorios personales

5. **Comunicación**:
   - Enviar mensajes directos a recepción
   - Solicitar materiales/insumos
   - Ver notificaciones de citas canceladas
   - Acceder a chat interno con otros doctores (consultas)

**Limitaciones**:
- No puede ver agenda de otros doctores
- No puede acceder a información financiera
- No puede modificar datos administrativos de pacientes
- No puede eliminar registros médicos
- No puede ver reportes de la clínica

---

#### 3.1.4 ADMINISTRADOR/GERENTE
**Credenciales de Acceso**:
```
Email: admin@clinicadental.com
Password: Admin2024!
```

**Credencial Secundaria** (Gerente Operativo):
```
Email: gerencia@clinicadental.com
Password: Gerente2024!
```

**Panel de Acceso**: `/dashboard/admin`

**Funcionalidades Completas**:

1. **Dashboard Ejecutivo**:
   - KPIs en tiempo real:
     - Ingresos del día/mes/año
     - Número de pacientes atendidos
     - Tasa de ocupación por doctor
     - Citas pendientes de confirmación
     - Pagos pendientes totales
     - Nuevos pacientes vs recurrentes
   - Gráficos de tendencias:
     - Ingresos mensuales (últimos 12 meses)
     - Servicios más solicitados
     - Horarios pico de demanda
     - Tasa de cancelación

2. **Gestión de Personal**:
   - Ver lista completa de empleados
   - Agregar/editar doctores (foto, especialidad, horarios)
   - Agregar/editar recepcionistas
   - Configurar horarios laborales por doctor
   - Configurar días no laborables
   - Ver productividad por doctor (pacientes/día, ingresos generados)
   - Asignar permisos y roles

3. **Gestión de Servicios**:
   - Crear nuevos servicios
   - Modificar precios
   - Activar/desactivar servicios
   - Configurar duración estándar
   - Asignar doctores capacitados por servicio
   - Ver rentabilidad por servicio

4. **Configuración de Horarios**:
   - Definir horario general de la clínica (ej: 8:00 AM - 8:00 PM)
   - Configurar intervalos de citas (15, 30, 45, 60 minutos)
   - Bloquear días festivos globalmente
   - Configurar tiempo de buffer entre citas

5. **Reportes Avanzados**:
   - Reporte financiero detallado:
     - Ingresos por servicio
     - Ingresos por doctor
     - Métodos de pago utilizados
     - Descuentos aplicados
   - Reporte de pacientes:
     - Nuevos pacientes por mes
     - Pacientes activos vs inactivos
     - Tasa de retención
     - Pacientes con pagos pendientes
   - Reporte operativo:
     - Tasa de cancelación (motivos)
     - Citas por rango horario
     - Tiempo promedio de consulta
     - Lista de espera activa

6. **Gestión Financiera**:
   - Ver todas las transacciones
   - Conciliar caja diaria
   - Generar corte de caja
   - Ver cuentas por cobrar
   - Aplicar descuentos especiales (requiere justificación)
   - Configurar planes de pago
   - Exportar reportes contables

7. **Configuración del Sistema**:
   - Personalizar datos de la clínica
   - Configurar plantillas de mensajes
   - Configurar políticas de cancelación
   - Gestionar catálogo de materiales/inventario
   - Configurar respaldos automáticos
   - Ver logs de auditoría (quién hizo qué y cuándo)

**Limitaciones**:
- No puede acceder a historiales clínicos completos (privacidad médica)
- No puede modificar notas médicas de doctores
- Algunos reportes tienen delay de 24h (simulación de procesos batch)

---

## 4. MÓDULOS DEL SISTEMA POR ROL

### 4.1 VISTA PÚBLICA (Landing Page)

#### 4.1.1 Secciones de la Página

**A. Hero Section**:
- Imagen de fondo: Clínica moderna o paciente sonriendo
- Headline: "Tu Sonrisa, Nuestra Pasión"
- Subheadline: "Agenda tu cita en menos de 2 minutos"
- CTA Principal: Botón grande "Agendar Cita Ahora" (abre modal de booking)
- CTA Secundario: "Llamar Ahora" (simula click-to-call)

**B. Beneficios Clave** (3-4 cards):
- "Agenda 24/7 sin llamadas"
- "Doctores certificados"
- "Tecnología de punta"
- "Financiamiento disponible"

**C. Grid de Servicios**:
Cada servicio debe mostrar:
- Icono representativo
- Nombre del servicio
- Descripción breve (1 línea)
- Precio (ej: "Desde $50.000")
- Duración estimada (ej: "45 minutos")
- Badge si tiene descuento (ej: "-20% Primera Consulta")
- Botón "Agendar" (filtra wizard por este servicio)

Servicios de ejemplo:
1. Limpieza Dental Profunda - $45.000 - 45 min
2. Ortodoncia (Evaluación) - $30.000 - 30 min
3. Blanqueamiento Dental - $120.000 - 60 min
4. Implantes Dentales - Consultar - 90 min
5. Endodoncia - $150.000 - 60 min
6. Diseño de Sonrisa - Consultar - 90 min
7. Extracción Simple - $40.000 - 30 min
8. Prótesis Dental - Consultar - 45 min

**D. Equipo Médico** (Cards de Doctores):
Para cada doctor mostrar:
- Foto profesional
- Nombre completo con título (Dra./Dr.)
- Especialidad principal
- Años de experiencia
- Badge de certificaciones
- Botón "Agendar con este doctor"

**E. Testimonios**:
- Carousel deslizable
- Mínimo 6 testimonios
- Cada testimonio: Foto, nombre, tratamiento recibido, comentario, 5 estrellas
- Debe ser convincente y variado (diferentes tratamientos)

**F. Preguntas Frecuentes**:
- Acordeón expandible
- Mínimo 8 preguntas:
  - ¿Cómo cancelo mi cita?
  - ¿Aceptan seguros?
  - ¿Qué pasa si llego tarde?
  - ¿Tienen estacionamiento?
  - ¿Atienden urgencias?
  - ¿Ofrecen financiamiento?
  - ¿Cómo accedo a mi historial?
  - ¿Qué medidas de bioseguridad tienen?

**G. Footer**:
- Datos de contacto (dirección, teléfono, email)
- Horarios de atención
- Enlaces legales (Términos, Privacidad)
- Redes sociales
- Mapa de ubicación (iframe de Google Maps simulado)

**H. Elementos Flotantes**:
- WhatsApp FAB (fixed bottom-right): Al hacer clic, simula abrir WhatsApp con mensaje pre-llenado
- Botón "Volver Arriba" (aparece al hacer scroll)

---

### 4.2 MÓDULO DE AGENDAMIENTO (Booking Wizard)

Este es el componente más crítico del sistema. Debe ser una experiencia fluida de 5 pasos.

#### Paso 1: Selección de Servicio

**Interfaz**:
- Grid de cards (2 columnas en mobile, 3-4 en desktop)
- Cada card muestra: Icono, Nombre, Precio, Duración
- Card debe tener hover effect
- Card seleccionada: border azul, check icon

**Lógica**:
- Al seleccionar un servicio, filtrar automáticamente doctores que lo ofrecen
- Mostrar badge si el servicio tiene promoción activa
- Validación: No se puede avanzar sin seleccionar

**Ejemplo de Interacción**:
- Usuario hace clic en "Ortodoncia"
- Sistema marca el servicio
- Botón "Siguiente" se habilita
- Al hacer clic en "Siguiente", avanza a Paso 2 mostrando SOLO doctores especializados en Ortodoncia

---

#### Paso 2: Selección de Profesional

**Interfaz**:
- Lista de doctores filtrados
- Cada doctor muestra:
  - Avatar circular
  - Nombre + Título
  - Especialidad
  - Rating (ej: 4.9/5 ⭐ - 234 pacientes)
  - Próxima disponibilidad (ej: "Disponible hoy 3:00 PM")
- Opción "Sin preferencia" (sistema asigna el más disponible)

**Lógica**:
- Filtrar doctores por servicio seleccionado
- Ordenar por disponibilidad (más cercana primero)
- Mostrar "Muy solicitado" badge si tiene alta demanda
- Al seleccionar, prefiltrar calendario con horarios de ESE doctor

**Ejemplo de Interacción**:
- Usuario selecciona "Dra. Sofia Martínez"
- Sistema carga calendario mostrando SOLO los horarios donde ella está disponible
- Botón "Siguiente" se habilita

---

#### Paso 3: Selección de Fecha y Hora (El más complejo)

**Interfaz**:
- Calendario mensual (estilo Google Calendar)
- Al seleccionar una fecha, mostrar slots de tiempo disponibles abajo
- Slots deben ser botones (ej: "9:00 AM", "9:30 AM", "10:00 AM")
- Mostrar días deshabilitados (fines de semana, festivos, sin disponibilidad)

**Lógica Crítica de Disponibilidad**:

```
Reglas de disponibilidad:
1. Horario de la clínica: Lunes a Viernes 8:00 AM - 8:00 PM, Sábados 9:00 AM - 2:00 PM
2. Duración del servicio: Determina el bloqueo (ej: Ortodoncia = 30 min)
3. Citas existentes: Bloquear slots ocupados
4. Buffer time: 15 minutos entre citas del mismo doctor
5. Día actual: No mostrar horarios pasados
```

**Algoritmo de Generación de Slots**:
1. Obtener horario laboral del doctor seleccionado (ej: 9:00 AM - 6:00 PM)
2. Dividir en intervalos de 30 minutos
3. Para cada slot, verificar:
   - ¿El doctor tiene una cita en ese horario?
   - ¿La cita anterior termina a tiempo? (considerar duración + buffer)
   - ¿Es un horario futuro? (no mostrar horas pasadas del día actual)
4. Marcar slots como:
   - Disponible (verde claro)
   - Ocupado (gris, disabled)
   - Recomendado (azul, horarios óptimos: 10 AM - 12 PM, 3 PM - 5 PM)

**Ejemplo de Interacción**:
- Usuario selecciona "Viernes 10 de Enero, 2026"
- Sistema muestra: "9:00 AM" (disponible), "9:30 AM" (ocupado), "10:00 AM" (disponible), ...
- Usuario selecciona "10:00 AM"
- Sistema guarda: Fecha + Hora + Doctor + Servicio
- Botón "Siguiente" se habilita

**Casos Especiales**:
- Si no hay disponibilidad en 7 días: Mostrar mensaje "Este doctor está muy solicitado. Disponibilidad más cercana: 15 de Enero"
- Opción "Ver otros doctores" para cambiar de profesional
- Opción "Lista de espera" (agregar a waitlist si todos los horarios están llenos)

---

#### Paso 4: Información del Paciente

**Interfaz**:
- Formulario limpio y claro
- Campos:
  - Nombre Completo* (required)
  - RUT/DNI* (required, con formato automático)
  - Teléfono* (required, validar formato +56 9 XXXX XXXX)
  - Email* (required)
  - ¿Primera vez en la clínica?* (radio: Sí/No)
  - ¿Cómo nos conociste? (select: Redes sociales, Recomendación, Google, Otro)
  - Notas adicionales (textarea, opcional)

**Lógica**:
- Validación en tiempo real (mostrar checks verdes)
- Si el RUT/Email ya existe: "¡Bienvenido de vuelta! Encontramos tu historial"
- Autocompletar datos si paciente existe
- Al llenar todos los campos requeridos, habilitar botón "Confirmar Cita"

**Ejemplo de Interacción**:
- Usuario ingresa "Juan Pérez", "12.345.678-9", "+56 9 8765 4321", "juan@email.com"
- Sistema busca en pacientes existentes
- Si no existe: Crea nuevo paciente
- Si existe: Vincula cita al paciente existente
- Botón "Confirmar Cita" se habilita

---

#### Paso 5: Confirmación y Resumen

**Interfaz**:
- Card de confirmación estilo "ticket"
- Mostrar resumen completo:
  - ✅ Cita Confirmada (con animación de confetti o check animado)
  - Servicio: "Ortodoncia"
  - Profesional: "Dra. Sofia Martínez"
  - Fecha: "Viernes 10 de Enero, 2026"
  - Hora: "10:00 AM"
  - Duración: "30 minutos"
  - Precio: "$30.000"
  - Código de confirmación: "APPT-20260110-001"
- Botones de acción:
  - "Agregar a Google Calendar" (genera .ics)
  - "Enviar por WhatsApp" (simula compartir)
  - "Imprimir Comprobante"
- Información adicional:
  - "Recibirás un recordatorio 24 horas antes"
  - "Política de cancelación: Hasta 12 horas antes sin cargo"
  - Botón "Volver al Inicio"

**Lógica**:
```
Al confirmar:
1. Crear objeto appointment:
   {
     id: "APPT-" + timestamp,
     service: selectedService,
     doctor: selectedDoctor,
     patient: patientData,
     date: selectedDate,
     time: selectedTime,
     status: "pending", // Inicia como pendiente
     createdAt: new Date(),
     source: "web", // vs "phone" o "walk-in"
     price: service.price,
     paid: false
   }

2. Agregar al appointmentStore

3. Actualizar disponibilidad del doctor (bloquear ese slot)

4. Si paciente es nuevo, agregar a patientStore

5. Generar código QR con detalles de la cita

6. Simular envío de confirmación:
   - Email: "Cita confirmada en Clínica Dental..."
   - SMS: "Tu cita es el 10/01 a las 10:00 AM..."
```

**Ejemplo de Interacción**:
- Usuario ve pantalla de éxito
- Hace clic en "Agregar a Google Calendar"
- Sistema descarga archivo appointment.ics
- Usuario puede cerrar el modal o volver al inicio

---

## 5. FLUJOS DE USUARIO DETALLADOS

### Flujo 1: Paciente Agenda Primera Cita

**Contexto**: María, 32 años, busca limpiezadental. Nunca ha ido a esta clínica.

**Pasos**:
1. María ingresa a www.clinicadental.com
2. Ve el Hero con "Agenda tu Cita Ahora"
3. Hace clic en el botón principal
4. Se abre el Booking Wizard en un modal

**En el Wizard**:
5. Paso 1: Ve grid de servicios, selecciona "Limpieza Dental Profunda ($45.000)"
6. Clic en "Siguiente"
7. Paso 2: Ve 4 doctores disponibles, selecciona "Dr. Diego Fernández" (Odontología General)
8. Clic en "Siguiente"
9. Paso 3: Calendario muestra el mes actual (Enero 2026)
   - Ve que hay días con puntos verdes (disponibilidad)
   - Selecciona "Martes 7 de Enero"
   - Abajo aparecen slots: 9:00 AM, 10:00 AM, 11:00 AM, 2:00 PM, 3:00 PM, 4:00 PM
   - Selecciona "10:00 AM"
10. Clic en "Siguiente"
11. Paso 4: Llena formulario:
    - Nombre: "María González"
    - RUT: "18.765.432-1"
    - Teléfono: "+56 9 8765 4321"
    - Email: "maria.gonzalez@email.com"
    - Primera vez: "Sí"
    - Cómo nos conoció: "Instagram"
    - Notas: "Tengo sensibilidad dental"
12. Clic en "Confirmar Cita"
13. Paso 5: Ve confirmación:
    - "✅ ¡Cita Confirmada!"
    - Código: "APPT-20260107-024"
    - Resumen completo
    - Recibe mensaje simulado: "WhatsApp enviado a +56 9 8765 4321"

**Resultado en el Sistema**:
- Nueva cita creada con status "pending"
- Nuevo paciente creado en la base de datos
- Slot "Martes 7 Enero 10:00 AM" bloqueado para Dr. Diego
- Recepción verá esta cita en su panel como "Pendiente de confirmar"

---

### Flujo 2: Recepcionista Confirma Cita y Registra Pago

**Contexto**: Al día siguiente (Lunes 6 Enero), la recepcionista revisa citas pendientes.

**Pasos**:
1. Recepcionista inicia sesión (recepcion@clinicadental.com / Recep2024!)
2. Dashboard de Recepción carga
3. Ve widget "Citas Pendientes de Confirmar" mostrando:
   - "María González - Limpieza - 07/01 10:00 AM - Dr. Diego"
   - Badge rojo "Pendiente"
4. Hace clic en la cita
5. Se abre un Drawer lateral derecho mostrando:
   - Datos del paciente
   - Teléfono con botón "Llamar" (simula click-to-call)
   - Notas: "Tengo sensibilidad dental"
6. Recepcionista hace clic en "Llamar"
7. Sistema simula llamada (muestra modal "Llamando a +56 9 8765 4321...")
8. Recepcionista confirma verbalmente con María
9. Hace clic en botón "Confirmar Cita"
10. Aparece dropdown: "¿Enviar confirmación por?"
    - WhatsApp ✅ (seleccionado)
    - SMS
    - Email ✅ (seleccionado)
11. Clic en "Confirmar y Enviar"
12. Status cambia de "pending" → "confirmed"
13. Badge cambia a verde "Confirmada"
14. Sistema simula envío: "✅ WhatsApp y Email enviados"

**Día de la Cita (Martes 7 Enero)**:
15. María llega a las 9:55 AM
16. Recepcionista busca en el sistema: "María González"
17. Ve su cita de 10:00 AM
18. Hace clic en "Registrar Llegada"
19. Status cambia a "checked-in"
20. Notificación automática al Dr. Diego: "Paciente en sala de espera"

**Después de la Consulta**:
21. A las 10:40 AM, Dr. Diego finaliza
22. María regresa a recepción
23. Recepcionista abre la cita
24. Hace clic en "Registrar Pago"
25. Modal de pago:
    - Servicio: Limpieza Dental - $45.000
    - Método de pago: (Selecciona "Tarjeta de Débito")
    - Monto: $45.000 (puede modificar si hay descuento)
    - Clic en "Procesar Pago"
26. Sistema genera factura digital
27. Opción "Imprimir" o "Enviar por Email"
28. Status de cita cambia a "completed" + "paid"

**Resultado en el Sistema**:
- Cita actualizada con todos los status changes
- Pago registrado en financeStore
- Ingresos del día actualizados (+$45.000)
- Paciente ahora es "recurrente" en el sistema

---

### Flujo 3: Doctor Atiende Paciente y Crea Plan de Tratamiento

**Contexto**: Dr. Diego atiende a María y detecta necesidad de endodoncia.

**Pasos**:
1. Dr. Diego inicia sesión (dr.diego.fernandez@clinicadental.com / Diego2024!)
2. Dashboard de Doctor carga
3. Ve "Mi Agenda del Día":
   - 10:00 AM - María González - Limpieza
   - Status: "Checked-in" (en sala de espera)
4. Hace clic en la cita
5. Ve resumen:
   - Datos del paciente
   - "Primera visita"
   - Notas: "Sensibilidad dental"
   - Botón "Iniciar Consulta"
6. Clic en "Iniciar Consulta"
7. Se abre el Historial Clínico del paciente (vacío, primera vez)
8. Timer automático empieza a correr
9. Durante la consulta, Dr. Diego:
   - Hace clic en "Odontograma" (diagrama dental interactivo)
   - Marca diente #16 con color rojo (problema detectado)
   - Hace clic en "Agregar Nota"
   - Escribe: "Caries profunda en molar superior derecho (16). Requiere endodoncia."
   - Adjunta Rx periapical (sube imagen simulada)
10. Clic en "Crear Plan de Tratamiento"
11. Modal de nuevo tratamiento:
    - Nombre: "Endodoncia Molar #16"
    - Descripción: "Tratamiento de conducto en pieza 16"
    - Servicio asociado: (Selecciona "Endodoncia" - $150.000)
    - Número de sesiones: 3
    - Sesión 1: Apertura y limpieza
    - Sesión 2: Medicación y sellado
    - Sesión 3: Obturación final
    - Urgencia: "Media"
12. Clic en "Guardar Plan"
13. Sistema pregunta: "¿Agendar primera sesión ahora?"
14. Dr. Diego selecciona "Sí"
15. Calendario simplificado muestra su disponibilidad
16. Selecciona "Viernes 17 Enero - 11:00 AM"
17. Sistema reserva el slot automáticamente
18. Dr. Diego finaliza: Clic en "Terminar Consulta"
19. Timer se detiene (duración: 38 minutos)
20. Sistema pregunta: "¿Alguna prescripción?"
21. Dr. Diego agrega:
    - Ibuprofeno 400mg - Cada 8 horas por 3 días
    - Amoxicilina 500mg - Cada 8 horas por 7 días
22. Sistema genera receta digital con firma electrónica
23. Clic en "Finalizar y Notificar Recepción"

**Resultado en el Sistema**:
- Historial clínico de María actualizado
- Plan de tratamiento creado (3 sesiones)
- Primera sesión agendada automáticamente (status: "pending")
- Receta médica guardada y disponible para imprimir
- Recepción recibe notificación: "Paciente listo, requiere agendar 2 sesiones más"
- Dr. Diego puede ver en su dashboard: "Tratamientos activos: 1"

---

### Flujo 4: Administrador Genera Reporte Mensual

**Contexto**: Fin de mes, el administrador necesita reporte financiero.

**Pasos**:
1. Admin inicia sesión (admin@clinicadental.com / Admin2024!)
2. Dashboard Admin carga con KPIs:
   - Ingresos Enero: $4.850.000
   - Pacientes atendidos: 87
   - Tasa ocupación: 76%
   - Pagos pendientes: $320.000
3. Hace clic en menú lateral "Reportes"
4. Selecciona "Reporte Financiero"
5. Configuración del reporte:
   - Período: "Enero 2026"
   - Tipo: "Completo"
   - Incluir: (checkboxes)
     - ✅ Desglose por servicio
     - ✅ Desglose por doctor
     - ✅ Métodos de pago
     - ✅ Comparativa mes anterior
6. Clic en "Generar Reporte"
7. Sistema procesa (loading 2-3 segundos)
8. Muestra dashboard de reporte:

**Sección 1: Resumen Ejecutivo**
- Total Ingresos: $4.850.000 (+15% vs Diciembre)
- Total Citas: 87 (+8 vs Diciembre)
- Ticket Promedio: $55.747
- Tasa de cancelación: 8% (-2% vs Diciembre)

**Sección 2: Ingresos por Servicio** (Gráfico de barras)
- Limpieza Dental: $765.000 (17 citas)
- Ortodoncia: $1.240.000 (8 tratamientos iniciados)
- Endodoncia: $900.000 (6 procedimientos)
- Blanqueamiento: $480.000 (4 citas)
- Implantes: $1.200.000 (2 casos)
- Otros: $265.000

**Sección 3: Productividad por Doctor** (Tabla)
- Dra. Sofia: $1.850.000 (34 pacientes, 82% ocupación)
- Dr. Alejandro: $1.420.000 (26 pacientes, 75% ocupación)
- Dra. Valentina: $980.000 (15 pacientes, 65% ocupación)
- Dr. Diego: $600.000 (12 pacientes, 58% ocupación)

**Sección 4: Métodos de Pago** (Gráfico de pie)
- Tarjeta de Débito: 45%
- Tarjeta de Crédito: 30%
- Efectivo: 18%
- Transferencia: 7%

**Sección 5: Pagos Pendientes**
- Lista de 8 pacientes con saldo pendiente
- Total: $320.000
- Promedio de días de atraso: 12 días

9. Admin hace clic en "Exportar a Excel"
10. Sistema descarga archivo "Reporte_Enero_2026.xlsx"
11. Admin hace clic en "Enviar por Email"
12. Modal: "¿A quién enviar?"
    - Destinatarios: (pre-llenado con gerencia@clinicadental.com)
    - Mensaje: (opcional)
    - Clic en "Enviar"
13. Sistema simula envío: "✅ Reporte enviado exitosamente"

**Acciones Adicionales del Admin**:
14. Hace clic en "Ver Detalles" en "Pagos Pendientes"
15. Ve lista con opción de "Enviar Recordatorio"
16. Selecciona 3 pacientes con mayor deuda
17. Clic en "Enviar Recordatorio Masivo"
18. Sistema simula envío de WhatsApp: "Estimado paciente, recordamos que..."

---

## 6. LÓGICA DE NEGOCIO Y REGLAS

### 6.1 Reglas de Disponibilidad

**Horario Base de la Clínica**:
```
Lunes a Viernes: 8:00 AM - 8:00 PM
Sábados: 9:00 AM - 2:00 PM
Domingos: Cerrado
Festivos: Cerrado (lista configurable por admin)
```

**Horario Individual por Doctor**:
```
Cada doctor puede tener horario diferente:
- Dra. Sofia: Lun-Vie 9:00 AM - 6:00 PM
- Dr. Alejandro: Lun-Sab 8:00 AM - 5:00 PM
- Dra. Valentina: Mar-Sab 10:00 AM - 7:00 PM
- Dr. Diego: Lun-Vie 8:00 AM - 8:00 PM
```

**Intervalos de Citas**:
```
Definido por duración del servicio:
- Limpieza: 45 min → Slots cada 45 min
- Consulta: 30 min → Slots cada 30 min
- Endodoncia: 60 min → Slots cada 60 min
- Implante: 90 min → Slots cada 90 min

Buffer automático: 15 minutos entre citas del mismo doctor
(para limpieza, preparación, registros)
```

**Reglas de Bloqueo**:
```
1. Slot se bloquea si:
   - Ya existe una cita confirmada
   - Doctor está en break (almuerzo: 1:00 PM - 2:00 PM)
   - Doctor marcó "No disponible" (vacaciones, capacitación)
   - Es un horario pasado

2. Slot se marca "Ocupado próximamente" si:
   - Cita anterior termina dentro de 15 minutos de este slot
   - (Considerando buffer time)

3. Slot se recomienda si:
   - Es horario preferencial (10 AM - 12 PM, 3 PM - 5 PM)
   - Doctor tiene baja ocupación ese día (fomenta distribución)
```

**Algoritmo Completo de Disponibilidad**:
```
Función: getAvailableSlots(doctorId, serviceId, date)

1. Obtener servicio.duration
2. Obtener doctor.workingHours para ese día
3. Obtener todas las citas del doctor en esa fecha
4. Generar slots base:
   startTime = doctor.workingHours.start
   endTime = doctor.workingHours.end
   interval = service.duration
   
   slots = []
   current = startTime
   while (current + interval <= endTime):
     slots.push({time: current, available: true})
     current += interval

5. Marcar slots ocupados:
   para cada cita en appointments:
     citaStart = cita.time
     citaEnd = cita.time + cita.service.duration + 15min (buffer)
     marcar slots entre citaStart y citaEnd como unavailable

6. Marcar breaks:
   si existe lunch break (1:00 PM - 2:00 PM):
     marcar slots en ese rango como unavailable

7. Filtrar horarios pasados:
   si date == today:
     slots = slots.filter(slot => slot.time > currentTime)

8. Retornar slots
```

### 6.2 Reglas de Cancelación

**Política de Cancelación**:
```
- Hasta 24 horas antes: Sin cargo
- Hasta 12 horas antes: 30% del valor
- Menos de 12 horas: 50% del valor
- No show: 100% del valor
```

**Proceso de Cancelación**:
```
1. Usuario llama o usa "Cancelar Cita" (con código)
2. Sistema calcula tiempo restante hasta la cita
3. Si > 24h: Cancela gratis, libera slot
4. Si 12h-24h: Cobra 30%, libera slot, mantiene registro
5. Si < 12h: Cobra 50%, libera slot, marca como "late cancellation"
6. Si no show: Marca como "no-show", puede bloquear futuras reservas
```

**Reagendamiento**:
```
- Considerado como cancelación + nueva reserva
- Aplican mismas reglas de tiempo
- Si reagenda dentro de 7 días: Sin cargo adicional
- Si reagenda fuera de 7 días: Puede haber recargo
```

### 6.3 Reglas Financieras

**Métodos de Pago**:
```
- Efectivo: Acepta cualquier monto
- Tarjeta de Débito: Sin recargo
- Tarjeta de Crédito: +3% por comisión bancaria
- Transferencia: Confirmación en 24h
```

**Descuentos**:
```
- Primera Consulta: -20% (aplica solo una vez por paciente)
- Pago en efectivo: -5%
- Paquetes: Ej: 3 limpiezas = -15%
- Referidos: Ambos reciben -10% en próxima consulta
```

**Planes de Pago**:
```
Para tratamientos > $200.000:
- Opción 1: 3 cuotas sin interés
- Opción 2: 6 cuotas con 5% de interés

Requiere:
- Cheques o tarjeta de crédito
- Firma de pagaré digital
```

**Facturación**:
```
- Factura se genera al momento del pago
- Formato: FACT-20260107-001
- Incluye: RUT clínica, RUT paciente, detalle, IVA
- Se envía por email automáticamente
- Opción de re-envío en cualquier momento
```

### 6.4 Reglas de Notificaciones

**Recordatorios Automáticos**:
```
- 24 horas antes: WhatsApp + Email
  "Hola María, te recordamos tu cita mañana 10:00 AM con Dr. Diego"

- 2 horas antes: SMS
  "Tu cita es en 2 horas. Nos vemos a las 10:00 AM"

- Confirmación inmediata: Al agendar
  "✅ Cita confirmada. Código: APPT-20260107-024"
```

**Notificaciones por Cambio de Estado**:
```
Para Paciente:
- Cita confirmada: "✅ Tu cita ha sido confirmada"
- Cita reagendada: "📅 Tu cita se movió a [nueva fecha]"
- Cita cancelada: "❌ Tu cita fue cancelada. Razón: [motivo]"
- Recordatorio de pago: "💳 Tienes un saldo pendiente de $XX"

Para Doctor:
- Paciente en sala de espera: "🔔 María González ha llegado"
- Cita cancelada: "Cita de 10:00 AM cancelada"
- Nueva cita asignada: "Nueva cita programada para [fecha]"

Para Recepción:
- Nueva cita web: "🌐 Nueva reserva web: María González"
- Pago registrado: "💰 Pago recibido: $45.000"
```

### 6.5 Reglas de Prioridad y Listas de Espera

**Sistema de Lista de Espera**:
```
Cuando un horario popular está lleno:
1. Ofrecer opción "Agregar a Lista de Espera"
2. Si alguien cancela, notificar automáticamente a lista en orden:
   - Prioridad 1: Pacientes con tratamiento en curso
   - Prioridad 2: Pacientes recurrentes
   - Prioridad 3: Pacientes nuevos
3. Enviar notificación: "¡Disponibilidad! Tienes 2 horas para confirmar"
4. Si no confirma en 2h, pasar al siguiente
```

**Overbooking Controlado**:
```
Admin puede configurar:
- Permitir +1 cita extra en horarios pico
- Solo para servicios rápidos (< 30 min)
- Con nota para doctor: "Horario compactado"
```

---

## 7. GESTIÓN DE ESTADO Y PERSISTENCIA

### 7.1 Estructura de Stores (Zustand)

**authStore**:
```javascript
{
  user: {
    id: "USR-001",
    email: "recepcion@clinicadental.com",
    role: "reception", // "patient", "doctor", "admin"
    name: "María Gómez",
    avatar: "/avatars/maria.jpg",
    lastLogin: "2026-01-04T10:30:00Z"
  },
  isAuthenticated: true,
  login: (email, password) => {...},
  logout: () => {...}
}
```

**appointmentStore**:
```javascript
{
  appointments: [
    {
      id: "APPT-20260107-024",
      serviceId: "SVC-001",
      doctorId: "DOC-004",
      patientId: "PAT-123",
      date: "2026-01-07",
      time: "10:00",
      duration: 45, // minutos
      status: "confirmed", // pending, confirmed, checked-in, in-progress, completed, cancelled, no-show
      createdAt: "2026-01-04T14:22:00Z",
      source: "web", // web, phone, walk-in
      notes: "Sensibilidad dental",
      price: 45000,
      paid: false,
      paymentMethod: null,
      cancelReason: null,
      statusHistory: [
        {status: "pending", timestamp: "2026-01-04T14:22:00Z"},
        {status: "confirmed", timestamp: "2026-01-06T09:15:00Z", by: "USR-001"}
      ]
    }
  ],
  createAppointment: (data) => {...},
  updateStatus: (id, newStatus, reason) => {...},
  cancelAppointment: (id, reason) => {...},
  getByDoctor: (doctorId) => {...},
  getByPatient: (patientId) => {...},
  getByDate: (date) => {...}
}
```

**patientStore**:
```javascript
{
  patients: [
    {
      id: "PAT-123",
      rut: "18.765.432-1",
      firstName: "María",
      lastName: "González",
      email: "maria.gonzalez@email.com",
      phone: "+56987654321",
      dateOfBirth: "1994-03-15",
      address: "Av. Providencia 1234, Santiago",
      firstVisit: "2026-01-07",
      status: "active", // active, inactive
      source: "Instagram",
      emergencyContact: {
        name: "Pedro González",
        phone: "+56912345678"
      },
      medicalAlerts: [
        "Alergia a penicilina"
      ],
      notes: ["Llega tarde habitualmente"],
      totalAppointments: 1,
      completedAppointments: 0,
      cancelledAppointments: 0,
      totalSpent: 0,
      outstandingBalance: 0
    }
  ],
  createPatient: (data) => {...},
  updatePatient: (id, data) => {...},
  searchPatients: (query) => {...},
  getPatientHistory: (id) => {...}
}
```

**serviceStore**:
```javascript
{
  services: [
    {
      id: "SVC-001",
      name: "Limpieza Dental Profunda",
      description: "Remoción de sarro y placa bacteriana",
      price: 45000,
      duration: 45, // minutos
      category: "preventiva",
      active: true,
      icon: "Sparkles",
      requiresDoctor: ["DOC-004"], // Doctores capacitados
      discount: {
        type: "first-visit",
        percentage: 20
      }
    }
  ],
  createService: (data) => {...},
  updateService: (id, data) => {...},
  toggleActive: (id) => {...}
}
```

**doctorStore**:
```javascript
{
  doctors: [
    {
      id: "DOC-004",
      firstName: "Diego",
      lastName: "Fernández",
      title: "Dr.",
      specialty: "Odontología General",
      email: "dr.diego.fernandez@clinicadental.com",
      phone: "+56987654321",
      avatar: "/doctors/diego.jpg",
      licenseNumber: "12345",
      yearsOfExperience: 8,
      rating: 4.8,
      totalPatients: 245,
      workingHours: {
        monday: {start: "08:00", end: "20:00", break: "13:00-14:00"},
        tuesday: {start: "08:00", end: "20:00", break: "13:00-14:00"},
        wednesday: {start: "08:00", end: "20:00", break: "13:00-14:00"},
        thursday: {start: "08:00", end: "20:00", break: "13:00-14:00"},
        friday: {start: "08:00", end: "20:00", break: "13:00-14:00"},
        saturday: null,
        sunday: null
      },
      blockedDates: ["2026-01-20", "2026-01-21"], // Vacaciones
      servicesOffered: ["SVC-001", "SVC-007", "SVC-002"],
      active: true
    }
  ],
  updateDoctor: (id, data) => {...},
  blockDate: (id, date, reason) => {...}
}
```

**financeStore**:
```javascript
{
  transactions: [
    {
      id: "TRX-001",
      type: "income", // income, expense, refund
      appointmentId: "APPT-20260107-024",
      patientId: "PAT-123",
      amount: 45000,
      method: "debit-card", // cash, debit-card, credit-card, transfer
      date: "2026-01-07",
      time: "10:45",
      processedBy: "USR-001",
      invoice: "FACT-20260107-001",
      status: "completed", // pending, completed, refunded
      notes: null
    }
  ],
  dailyStats: {
    date: "2026-01-07",
    totalIncome: 385000,
    totalTransactions: 9,
    cashIncome: 120000,
    cardIncome: 265000,
    pendingPayments: 85000
  },
  registerPayment: (data) => {...},
  generateInvoice: (transactionId) => {...},
  getDailyReport: (date) => {...},
  getMonthlyReport: (month, year) => {...}
}
```

### 7.2 Inicialización de Datos Mock

**Al cargar la aplicación por primera vez**:
```javascript
function seedMockData() {
  // Solo ejecutar si stores están vacíos
  
  // Seed Users
  authStore.setState({
    users: [
      {id: "USR-001", email: "recepcion@clinicadental.com", role: "reception", ...},
      {id: "USR-002", email: "admin@clinicadental.com", role: "admin", ...},
      {id: "DOC-001", email: "dra.sofia.martinez@clinicadental.com", role: "doctor", ...},
      // ... más usuarios
    ]
  });

  // Seed Doctors
  doctorStore.setState({
    doctors: [/* 4 doctores con perfiles completos */]
  });

  // Seed Services
  serviceStore.setState({
    services: [/* 8 servicios dentales */]
  });

  // Seed Patients (15-20 pacientes ficticios)
  patientStore.setState({
    patients: [/* Pacientes con datos realistas */]
  });

  // Seed Appointments (15 citas existentes)
  appointmentStore.setState({
    appointments: [
      // Mix de:
      // - 5 citas completadas (mes pasado)
      // - 3 citas confirmadas (próximos 7 días)
      // - 2 citas pendientes (requieren confirmación)
      // - 3 citas futuras (siguientes 2 semanas)
      // - 2 citas canceladas (historial)
    ]
  });

  // Seed Transactions
  financeStore.setState({
    transactions: [/* 20 transacciones del último mes */]
  });
}
```

### 7.3 Sincronización y Consistencia

**Reglas de Actualización**:
```javascript
// Ejemplo: Al confirmar una cita desde recepción

function confirmAppointment(appointmentId) {
  // 1. Actualizar appointmentStore
  appointmentStore.updateStatus(appointmentId, "confirmed", currentUser.id);
  
  // 2. Actualizar estadísticas del doctor
  const appointment = appointmentStore.getById(appointmentId);
  doctorStore.incrementConfirmedAppointments(appointment.doctorId);
  
  // 3. Actualizar paciente (última interacción)
  patientStore.updateLastContact(appointment.patientId, new Date());
  
  // 4. Simular notificación
  notificationService.send({
    to: appointment.patientId,
    type: "whatsapp",
    message: "Tu cita ha sido confirmada..."
  });
  
  // 5. Agregar a log de auditoría
  auditLog.push({
    action: "confirm_appointment",
    user: currentUser.id,
    timestamp: new Date(),
    target: appointmentId
  });
}
```

---

## 8. DISEÑO Y EXPERIENCIA DE USUARIO

### 8.1 Principios de Diseño

**Jerarquía Visual**:
- Títulos: font-bold text-3xl
- Subtítulos: font-semibold text-xl
- Cuerpo: font-normal text-base
- Etiquetas: font-medium text-sm text-gray-600

**Espaciado Consistente**:
- Secciones: space-y-8 o space-y-12
- Cards: p-6
- Botones: px-6 py-3
- Inputs: px-4 py-2

**Colores Semánticos**:
```css
/* Éxito */
.success { @apply bg-emerald-50 text-emerald-700 border-emerald-200; }

/* Advertencia */
.warning { @apply bg-amber-50 text-amber-700 border-amber-200; }

/* Error */
.error { @apply bg-red-50 text-red-700 border-red-200; }

/* Info */
.info { @apply bg-blue-50 text-blue-700 border-blue-200; }
```

### 8.2 Componentes Reutilizables

**Button Variants**:
```javascript
// Primary: Acciones principales
<Button variant="primary">Agendar Cita</Button>
// bg-teal-600 hover:bg-teal-700 text-white

// Secondary: Acciones secundarias
<Button variant="secondary">Cancelar</Button>
// bg-gray-200 hover:bg-gray-300 text-gray-800

// Outline: Acciones terciarias
<Button variant="outline">Ver Más</Button>
// border-2 border-teal-600 text-teal-600 hover:bg-teal-50

// Ghost: Acciones sutiles
<Button variant="ghost">Editar</Button>
// hover:bg-gray-100 text-gray-700
```

**Card Component**:
```javascript
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción opcional</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Contenido principal */}
  </CardContent>
  <CardFooter>
    {/* Acciones */}
  </CardFooter>
</Card>
```

### 8.3 Responsive Design

**Breakpoints**:
```javascript
// Mobile First
sm: '640px'  // Teléfonos grandes
md: '768px'  // Tablets
lg: '1024px' // Laptops
xl: '1280px' // Desktops
2xl: '1536px' // Pantallas grandes
```

**Layout Mobile**:
- Header sticky con logo centrado
- Menú hamburguesa (Sheet lateral)
- Cards en 1 columna
- Botones full-width
- Bottom navigation para apps internas

**Layout Desktop**:
- Sidebar persistente (admin/doctor)
- Grid de 2-3 columnas para contenido
- Modales centralizados
- Hover states visibles

### 8.4 Animaciones y Transiciones

**Micro-interacciones**:
```javascript
// Botón click
<Button className="active:scale-95 transition-transform">

// Card hover
<Card className="hover:shadow-lg hover:-translate-y-1 transition-all">

// Input focus
<Input className="focus:ring-2 focus:ring-teal-500 transition-all">

// Loading state
<Spinner className="animate-spin">
```

**Transiciones de Página**:
```javascript
// Fade in al cargar
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// Slide lateral (modals)
<Sheet side="right">
  <motion.div
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
  >
```

### 8.5 Accesibilidad

**Requisitos Mínimos**:
- Todos los elementos interactivos con `aria-label`
- Navegación completa por teclado (Tab, Enter, Esc)
- Contraste mínimo WCAG AA (4.5:1)
- Textos alternativos en imágenes
- Focus visible en todos los elementos
- Skip links para navegación rápida

---

## 9. CASOS DE USO ESPECÍFICOS

### Caso 1: Paciente Intenta Agendar en Horario No Disponible

**Escenario**: María quiere cita el Domingo (clínica cerrada)

**Comportamiento**:
1. María selecciona servicio y doctor
2. En el calendario, días domingos aparecen deshabilitados (gris, sin hover)
3. Tooltip al pasar mouse: "Cerrado los Domingos"
4. María intenta hacer clic → No pasa nada
5. Mensaje helper: "Horarios disponibles: Lun-Vie 8AM-8PM, Sáb 9AM-2PM"

---

### Caso 2: Conflicto de Horarios (Doble Reserva)

**Escenario**: Recepcionista intenta crear cita manual en horario ya ocupado

**Comportamiento**:
1. Recepcionista selecciona "Dr. Diego - Martes 10:00 AM"
2. Sistema valida en tiempo real
3. Detecta que ya existe "APPT-20260107-024" en ese horario
4. Muestra error: "❌ Horario no disponible. Dr. Diego tiene cita con María González a las 10:00 AM"
5. Ofrece alternativas:
   - "Próximo disponible: 11:00 AM"
   - "Ver otros doctores"
6. Botón "Confirmar" permanece deshabilitado

---

### Caso 3: Doctor Solicita Vacaciones

**Escenario**: Dr. Diego necesita bloquear semana completa

**Comportamiento**:
1. Dr. Diego en su dashboard hace clic "Solicitar Bloqueo"
2. Selecciona rango de fechas: 15-19 Enero
3. Motivo: "Vacaciones"
4. Sistema verifica: Existen 2 citas confirmadas en ese rango
5. Alerta: "⚠️ Tienes 2 citas confirmadas. Debes reagendarlas primero"
6. Muestra lista de citas conflictivas
7. Dr. Diego hace clic "Reagendar Automáticamente"
8. Sistema busca próxima disponibilidad para cada paciente
9. Propone nuevos horarios
10. Dr. Diego confirma
11. Sistema envía notificaciones a pacientes
12. Bloquea las fechas solicitadas
13. Notifica a recepción y admin

---

### Caso 4: Pago Parcial con Plan de Cuotas

**Escenario**: Implante de $1.200.000, paciente paga 40% inicial

**Comportamiento**:
1. Paciente termina consulta de implante
2. Recepcionista abre "Registrar Pago"
3. Total: $1.200.000
4. Paciente dice "Solo puedo pagar $500.000 hoy"
5. Recepcionista selecciona "Pago Parcial"
6. Ingresa: $500.000
7. Sistema calcula: Saldo $700.000
8. Ofrece plan: "3 cuotas de $233.333" o "6 cuotas de $122.500 (+5%)"
9. Paciente elige 3 cuotas
10. Sistema genera:
    - Recibo por $500.000 (pagado)
    - Pagaré digital por $700.000 (3 cuotas)
    - Calendario de pagos: 7 Feb, 7 Mar, 7 Abr
11. Envía documentos por email
12. Marca en sistema: "Pago pendiente" con recordatorios automáticos

---

## 10. VALIDACIONES Y REGLAS DE CONSISTENCIA

### 10.1 Validaciones de Formularios

**Booking Wizard - Paso 4 (Datos del Paciente)**:
```javascript
Validaciones en tiempo real:

1. Nombre Completo:
   - Mínimo 2 palabras
   - Solo letras y espacios
   - Mínimo 3 caracteres
   - Error: "Ingresa nombre y apellido"

2. RUT/DNI:
   - Formato: XX.XXX.XXX-X
   - Validar dígito verificador
   - No duplicado (si ya existe, vincular)
   - Error: "RUT inválido"

3. Teléfono:
   - Formato: +56 9 XXXX XXXX
   - Autoformato mientras escribe
   - Validar que empiece con +56
   - Error: "Formato: +56 9 1234 5678"

4. Email:
   - Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   - Error: "Email inválido"

5. Notas:
   - Máximo 500 caracteres
   - Contador visible
```

### 10.2 Validaciones de Lógica de Negocio

**Al Crear Cita**:
```javascript
function validateAppointment(data) {
  const errors = [];

  // 1. Fecha no puede ser pasada
  if (isPast(data.date)) {
    errors.push("No puedes agendar en fechas pasadas");
  }

  // 2. Fecha no puede ser más de 3 meses adelante
  if (isAfter(data.date, addMonths(new Date(), 3))) {
    errors.push("Solo puedes agendar hasta 3 meses adelante");
  }

  // 3. Doctor debe estar disponible
  const doctorAvailable = checkDoctorAvailability(data.doctorId, data.date, data.time);
  if (!doctorAvailable) {
    errors.push("Doctor no disponible en ese horario");
  }

  // 4. Doctor debe ofrecer el servicio
  const doctorOffersService = checkDoctorService(data.doctorId, data.serviceId);
  if (!doctorOffersService) {
    errors.push("Este doctor no realiza este servicio");
  }

  // 5. Paciente no puede tener 2 citas el mismo día
  const patientHasAppointment = checkPatientAppointments(data.patientId, data.date);
  if (patientHasAppointment) {
    errors.push("Ya tienes una cita programada para este día");
  }

  return errors;
}
```

### 10.3 Integridad Referencial

**Reglas de Eliminación**:
```javascript
// No se puede eliminar un doctor con citas futuras
function deleteDoctor(doctorId) {
  const futureAppointments = appointmentStore.getByDoctor(doctorId)
    .filter(apt => isFuture(apt.date));
  
  if (futureAppointments.length > 0) {
    throw new Error("No puedes eliminar un doctor con citas programadas. Reasigna primero.");
  }
  
  // Marcar como inactive en vez de eliminar
  doctorStore.update(doctorId, { active: false });
}

// No se puede eliminar un paciente con pagos pendientes
function deletePatient(patientId) {
  const patient = patientStore.getById(patientId);
  
  if (patient.outstandingBalance > 0) {
    throw new Error("No puedes eliminar un paciente con pagos pendientes.");
  }
  
  // Marcar como inactive
  patientStore.update(patientId, { active: false });
}
```

---

## 11. RESUMEN FINAL Y CONSIDERACIONES

### 11.1 Stack Final
- **Next.js 16+** (App Router)
- **Tailwind CSS** (Diseño responsive)
- **shadcn/ui** (Componentes base)
- **Zustand** (Estado global)
- **React State** (NO localStorage - Persistencia en memoria)
- **Lucide React** (Iconos)
- **Recharts** (Gráficos)
- **React Hook Form** (Formularios)
- **Zod** (Validaciones)

### 11.2 Credenciales Completas

```
RECEPCIONISTA:
- recepcion@clinicadental.com / Recep2024!
- maria.gomez@clinicadental.com / Maria2024!

DOCTORES:
- dra.sofia.martinez@clinicadental.com / Sofia2024!
- dr.alejandro.torres@clinicadental.com / Alejandro2024!
- dra.valentina.lopez@clinicadental.com / Valentina2024!
- dr.diego.fernandez@clinicadental.com / Diego2024!

ADMINISTRADOR:
- admin@clinicadental.com / Admin2024!
- gerencia@clinicadental.com / Gerente2024!
```

### 11.3 Funcionalidades Core por Prioridad

**P0 - Críticas (MVP)**:
1. Booking Wizard público (5 pasos)
2. Dashboard recepción (confirmar/cancelar citas)
3. Calendario con disponibilidad real
4. Registro de pagos básico
5. Login multi-rol

**P1 - Importantes**:
6. Dashboard doctor (agenda personal + historial)
7. Dashboard admin (KPIs + reportes)
8. Gestión de pacientes
9. Sistema de notificaciones simuladas
10. Historial clínico básico

**P2 - Deseables**:
11. Planes de tratamiento multi-sesión
12. Lista de espera
13. Reportes avanzados con filtros
14. Configuración de horarios flexible
15. Auditoría de cambios

### 11.4 Puntos Críticos de Éxito

**El sistema DEBE**:
1. ✅ Mostrar disponibilidad real y actualizada
2. ✅ Prevenir dobles reservas
3. ✅ Sincronizar entre vista pública y admin en tiempo real
4. ✅ Validar todos los datos de entrada
5. ✅ Mantener consistencia entre stores
6. ✅ Ser 100% funcional sin backend
7. ✅ Verse profesional y confiable
8. ✅ Responder en < 1 segundo a interacciones
9. ✅ Ser intuitivo sin necesidad de tutorial
10. ✅ Funcionar perfectamente en mobile y desktop

---
 