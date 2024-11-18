# Docs

---

## **Prerequisites**

Ensure the following dependencies are installed on your system:

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (v9.10.0 or later)
- [Docker](https://www.docker.com/) (for containerized environments)
- PostgreSQL (if not using Docker)
- Redis (if not using Docker)

---

## **Environment Setup**

### 1. Clone the Repository

```bash
git clone git@github.com:nathan2slime/nbun.git
cd nbun
```

### 2. Configure Environment Variables

Create a `.env` file based on the provided `.env.example` template:

```bash
cp .env.example .env
```

#### Production Environment with Docker

If deploying with Docker, create a `.env.production` file:

```bash
cp .env.example .env.production
```

Update the `.env.production` file to match your production environment requirements.

### 3. Install Dependencies

Install all project dependencies using `pnpm`:

```bash
pnpm install
```

---

## **Available Scripts**

### Development

1. **Start the Development Server**

   ```bash
   pnpm dev
   ```

2. **Access Prisma Studio**

   ```bash
   pnpm studio
   ```

3. **Run Database Migrations**

   ```bash
   pnpm db:migrate:dev
   ```

4. **Reset Database Migrations**
   ```bash
   pnpm db:migrate:reset
   ```

---

### Production with Docker

#### 1. Build and Start the Service

Ensure your `.env.production` file is properly configured. Then build and start the Docker containers:

```bash
docker-compose up --build
```

#### 2. Apply Database Migrations

Once the containers are running, apply migrations to the production database by accessing the main application container:

```bash
docker exec -it <container_name> sh
pnpm db:migrate:deploy
```

---

### Code Formatting and Commit Standards

1. **Format Code**
   Format the codebase using Prettier:

   ```bash
   pnpm format
   ```

2. **Conventional Commits**
   Use the following command to make commits that adhere to the conventional changelog standards:

   ```bash
   pnpm commit
   ```

---

## **Environment Configuration**

### Variables in `.env` or `.env.production`

Below are the required environment variables and their purposes:

```plaintext
# Application
NODE_ENV="development"          # Environment mode: "development" or "production"
SESSION_KEY=""                   # Key for session management
APP_URL="http://localhost:3000"  # Base application URL
NEXT_PUBLIC_API_SERVER_URL="http://localhost:5400" # Server API URL
NEXT_PUBLIC_API_CLIENT_URL="http://localhost:5400" # Client API URL

# PostgreSQL
POSTGRES_USER="postgres"         # PostgreSQL username
POSTGRES_PASSWORD="root"         # PostgreSQL password
POSTGRES_DB="root"               # PostgreSQL database name
POSTGRES_HOST="localhost"        # PostgreSQL host
POSTGRES_PORT="5432"             # PostgreSQL port
DATABASE_URL="postgresql://postgres:root@postgres:5432/root?schema=public" # Prisma database URL

# Redis
DATABASE_REDIS_URL="redis://localhost:6379" # Redis connection URL

# Tokens
ACCESS_TOKEN_EXPIRES_IN="24h"    # Access token expiration
REFRESH_TOKEN_EXPIRES_IN="1d"    # Refresh token expiration
AUTH_COOKIE="@nbun/auth"         # Authentication cookie name
```

Ensure the database and Redis services are properly configured and reachable via the provided URLs.

---

## **Deployment**

### PostgreSQL

Ensure the PostgreSQL database is initialized with the schema and migrations. Run the following commands if not already applied:

```bash
pnpm db:migrate:deploy
```

### Redis

Ensure the Redis service is running and accessible at the specified `DATABASE_REDIS_URL`.

### Application

Start the application in the production environment:

```bash
NODE_ENV=production pnpm start
```

Access the application using the URL specified in `APP_URL`.
