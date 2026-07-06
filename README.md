# ClinicFlow Corrected

ClinicFlow Corrected is a maintained version of the original ClinicFlow project by `Foridul35962`, adapted by `StivenApolo` for local demo, seed data, and maintenance improvements.

## What is included

- Clinic departments catalog
- Doctors and appointments data flow
- Auth-related role structure
- Docker-based local environment
- Demo seed script for sample data
- Better empty states and startup guidance

## Tech Stack

- Frontend: Next.js + TypeScript
- Backend: Node.js + Express
- Database: MongoDB
- Cache: Redis
- Deployment: Docker and Docker Compose

## Project Structure

- `client/`: frontend application
- `server/`: backend API and scripts
- `docker-compose.yml`: local stack orchestration
- `.env.docker`: Docker environment variables
- `ARRANQUE_LOCAL.md`: local startup guide
- `CREDITS.md`: project attribution

## Requirements

- Node.js 18+
- Docker Desktop
- Git

## Run with Docker

1. Start the stack:

```bash
docker compose up -d --build
```

2. Seed demo data:

```bash
docker compose exec server npm run seed:demo
```

3. Open the app:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- RedisInsight: `http://localhost:5540`

4. Stop everything:

```bash
docker compose down
```

## Run Locally Without Docker

1. Install dependencies:

```bash
cd client
npm install
cd ../server
npm install
```

2. Configure environment variables:

- `server/.env`
- `client/.env.local`

3. Start the backend:

```bash
cd server
npm start
```

4. Start the frontend in another terminal:

```bash
cd client
npm run dev
```

## Demo Access

The demo seed creates sample users, departments, doctors, and appointments.

Default demo password:

```text
Clinic1234
```

## Credits

This repository is based on the original ClinicFlow project by `Foridul35962`.
See [`CREDITS.md`](./CREDITS.md) for the attribution details.
