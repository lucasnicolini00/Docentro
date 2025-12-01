# 🏥 Docentro

**Plataforma global que conecta clientes con profesionales**

Una aplicación web moderna y escalable construida con Next.js 15 que facilita la gestión de citas, horarios y administración de servicios profesionales a nivel mundial. Diseñada para cualquier tipo de servicio profesional: salud, educación, mantenimiento, bienestar y más.

🌐 **[Ver aplicación en vivo](https://docentro.vercel.app/)** - Disponible en https://docentro.vercel.app/

## 🚀 Características Principales

### 👨‍⚕️ Para Doctores

- **Gestión de Horarios**: Creación y administración de horarios por clínica
- **Plantillas de Horarios**: Templates predefinidos para configuración rápida
- **Dashboard Analítico**: Estadísticas de citas y disponibilidad
- **Gestión de Clínicas**: Administración de múltiples ubicaciones
- **Perfil Profesional**: Información detallada y especialidades

### 👥 Para Pacientes

- **Búsqueda de Doctores**: Filtrado por especialidad, ubicación y disponibilidad
- **Reserva de Citas**: Sistema intuitivo de booking en tiempo real
- **Gestión de Perfil**: Historial médico y datos personales
- **Dashboard Personal**: Vista consolidada de citas y información

### 🏢 Administración

- **Autenticación Segura**: Sistema basado en roles (Doctor/Paciente)
- **Gestión de Usuarios**: Registro y validación de profesionales
- **Analytics**: Métricas de uso y rendimiento del sistema

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 15.3.5** - Framework React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático y desarrollo seguro
- **Tailwind CSS 4** - Framework de estilos utilitarios
- **Lucide React** - Iconografía moderna y consistente

### Backend & Database

- **Next.js Server Actions** - API serverless integrada
- **Prisma ORM** - Gestión de base de datos type-safe
- **PostgreSQL** - Base de datos relacional robusta
- **Prisma Accelerate** - Connection pooling y performance

### Autenticación & Seguridad

- **NextAuth.js 4.24** - Autenticación completa
- **bcryptjs** - Hashing seguro de contraseñas
- **Middleware de protección** - Rutas protegidas por rol

### Herramientas de Desarrollo

- **Turbopack** - Bundler ultra-rápido para desarrollo
- **ESLint 9** - Linting y calidad de código
- **Prisma Studio** - Interface visual para base de datos

## 📁 Estructura del Proyecto

```
docentro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Dashboards específicos por rol
│   │   │   ├── doctor/         # Panel de control médico
│   │   │   └── patient/        # Panel de control paciente
│   │   ├── login/              # Autenticación
│   │   ├── register/           # Registro de usuarios
│   │   └── search/             # Búsqueda de doctores
│   ├── components/             # Componentes reutilizables
│   │   ├── ui/                 # Componentes base (botones, forms)
│   │   ├── features/           # Componentes de negocio
│   │   ├── sections/           # Secciones de página
│   │   └── providers/          # Providers React
│   ├── lib/
│   │   ├── actions/            # Server Actions (toda la lógica de negocio)
│   │   ├── auth.ts             # Configuración NextAuth
│   │   └── prisma.ts           # Cliente Prisma
│   └── hooks/                  # Custom React hooks
├── prisma/
│   ├── schema.prisma           # Esquema de base de datos
│   └── seed.ts                 # Datos de prueba
└── docs/                       # Documentación técnica
```

## 🚦 Instalación y Configuración

### Prerrequisitos

- **Node.js 18+**
- **PostgreSQL 14+**
- **pnpm/npm/yarn**

### 1. Clonar el Repositorio

```bash
git clone https://github.com/lucasnicolini00/docentro.git
cd docentro
```

### 2. Instalar Dependencias

```bash
npm install
# o
pnpm install
```

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env.local
```

Configurar las siguientes variables en `.env.local`:

```env
# Database
DATABASE_URL=""
DIRECT_URL=""

# NextAuth
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

# Prisma Accelerate (opcional)
PRISMA_ACCELERATE_URL=""
```

### 4. Configurar Base de Datos

```bash
# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:migrate

# Poblar con datos de prueba (opcional)
npm run db:seed
```

### 5. Iniciar Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📜 Scripts Disponibles

### Desarrollo

```bash
npm run dev          # Servidor de desarrollo con Turbopack
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Ejecutar ESLint
```

### Base de Datos

```bash
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Push schema sin migraciones
npm run db:migrate   # Crear y ejecutar migraciones
npm run db:seed      # Poblar base de datos
npm run db:studio    # Interface visual de BD
npm run db:reset     # Reset completo de BD
```

## 🏗️ Arquitectura y Patrones

### Patrón Server Actions

Todo la lógica de negocio utiliza **Server Actions** de Next.js 15:

```typescript
// src/lib/actions/appointments.ts
export async function createAppointment(
  data: AppointmentData
): Promise<ActionResult> {
  const validation = await validatePatient();
  // Lógica de negocio...
  return { success: true, data: appointment };
}
```

### Gestión de Estado

- **React Server Components** por defecto
- **Client Components** solo cuando necesario
- **useTransition** para operaciones asíncronas
- **Estado local** con useState/useReducer

### Autenticación

```typescript
// Protección de rutas en middleware.ts
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  // Validación por rol...
}
```

## 🔐 Seguridad

- **Validación server-side** en todas las operaciones
- **Sanitización** de inputs de usuario
- **Rate limiting** en endpoints críticos
- **Hashing** seguro de contraseñas con bcrypt
- **Validación de roles** en middleware
- **Escape de SQL injection** con Prisma

## 📊 Performance

### Optimizaciones Implementadas

- **Turbopack** para builds ultra-rápidos
- **Server Actions** para reduced JavaScript bundle
- **Prisma Accelerate** para connection pooling
- **Lazy loading** de componentes
- **Optimistic updates** en UI
- **Batch operations** para operaciones masivas

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Tests de integración con BD
npm run test:integration

# Tests E2E
npm run test:e2e
```

**Desarrollador Principal**: [Lucas Nicolini](https://github.com/lucasnicolini00)

---
