# ClinicFlow - Arranque Local

Este archivo explica cómo levantar el proyecto en local sin tocar el `README.md`.

## Estructura general

- `client/`: frontend con Next.js.
- `server/`: backend con Express, MongoDB y Redis.
- `docker-compose.yml`: levanta toda la stack junto con Mongo y Redis.

## Requisitos

- Node.js 18 o superior.
- Docker Desktop.
- Git.

## Opcion recomendada: Docker

Esta es la forma mas simple porque levanta tambien MongoDB y Redis.

### 1. Clonar el repositorio

```bash
git clone https://github.com/StivenApolo/ClinicFlow_corrected.git
cd ClinicFlow_corrected
```

### 2. Crear o revisar la config de Docker

El proyecto usa `.env.docker` en la raiz. En este repo ya incluye:

```env
NODE_ENV=production
REDIS_URL=redis://redis:6379
MONGODB_URL=mongodb://mongo:27017
```

### 3. Levantar la stack

```bash
docker compose up -d --build
```

### 4. Verificar servicios

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- RedisInsight: `http://localhost:5540`

### 5. Detener todo

```bash
docker compose down
```

## Opcion manual: sin Docker

Si quieres correr cada parte por separado, necesitas tener MongoDB y Redis disponibles por tu cuenta.

### 1. Instalar dependencias

Desde la raiz del proyecto:

```bash
cd client
npm install
cd ../server
npm install
```

### 2. Configurar variables de entorno del backend

Crea `server/.env` con valores similares a estos:

```env
CORS_ORIGIN=http://localhost:3000
NEXT_APP_URL=http://localhost:3000
MONGODB_URL=mongodb://localhost:27017
REDIS_URL=redis://localhost:6379
TOKEN_SECRET=tu_secreto
TOKEN_EXPIRY=7d
REDIS_PREFIX=clinicFlow
REVALIDATE_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SENDER_EMAIL=
BREVO_API_KEY=
```

### 3. Configurar variables de entorno del frontend

Crea `client/.env.local` con:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_DOCKER_SERVER_URL=http://server:5000
REVALIDATE_SECRET=
```

### 4. Ejecutar backend

```bash
cd server
npm start
```

El backend queda en `http://localhost:5000`.

### 5. Ejecutar frontend

En otra terminal:

```bash
cd client
npm run dev
```

El frontend queda en `http://localhost:3000`.

## Notas importantes

- El backend no va a arrancar bien sin MongoDB y Redis.
- Si usas Docker, el frontend debe apuntar a `http://localhost:5000` desde el navegador.
- En el servidor se usa `npx nodemon -L index.js`, asi que los cambios se recargan automaticamente.

## Servicios que quedan activos con Docker

- `client`: Next.js en el puerto `3000`.
- `server`: API Express en el puerto `5000`.
- `mongo`: MongoDB en el puerto `27018` del host.
- `redis`: Redis en el puerto `6380` del host.
- `redisinsight`: interfaz de Redis en `5540`.
