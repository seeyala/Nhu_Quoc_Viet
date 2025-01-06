# ExpressJS CRUD Application with Prisma and SQLite

This is a simple ExpressJS backend application built with TypeScript, Prisma ORM, and SQLite to manage resources. It supports CRUD operations for resources and is connected to a local SQLite database.

## Prerequisites

Make sure you have the following installed:

- Node.js (>= v16)
- npm (>= v7)
- SQLite (for local database)
- Prisma CLI (optional but recommended)

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/seeyala/Nhu_Quoc_Viet.git
cd src/problem5
```

### 2. Install dependencies

```bash
npm init -y
npm install express body-parser cors dotenv prisma @prisma/client
npm install --save-dev typescript ts-node nodemon @types/express @types/node
```

### 3. Prisma setup

```bash
npx prisma init
npx prisma generate
```

## 5. Start the server

```bash
npx ts-node src/server.ts
```

## API Endpoints
The following API endpoints are available in the application:

GET /api/resources: List all resources. Supports basic filtering by name query parameter.
POST /api/resources: Create a new resource. Requires name and description in the request body.
GET /api/resources/:id: Get details of a resource by ID.
PUT /api/resources/:id: Update an existing resource by ID. Requires name and description in the request body.
DELETE /api/resources/:id: Delete a resource by ID.