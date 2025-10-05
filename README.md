# 🐳 Simple Docker Setup - Todo Application

Basic Docker containerization for the Todo Application with minimal configuration.

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed
- Git (to clone the repository)

### 1. Build and Run

```bash
# Clone the repository
git clone <your-repo-url>
cd SOFTDEV3-FINAL-1

# Build and start all services
docker-compose up --build
```

### 2. Access the Application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **Database**: localhost:5432

## 📁 What's Included

### Services
1. **Frontend** - React app served by Nginx (Port 80)
2. **Backend** - Express.js API server (Port 3000)
3. **Database** - PostgreSQL database (Port 5432)

### Files
- `docker-compose.yml` - Main configuration
- `BE/my-express-app/Dockerfile` - Backend container
- `FE/my-react-app/Dockerfile` - Frontend container
- `.env` - Environment variables

## 🔧 Common Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Rebuild containers
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs

# View specific service logs
docker-compose logs backend

# Run database migrations
docker-compose exec backend npx prisma migrate deploy
```

## 🗄️ Database Setup

The database will be automatically created when you start the services. To set up the schema:

```bash
# Run Prisma migrations
docker-compose exec backend npx prisma migrate deploy

# Generate Prisma client (if needed)
docker-compose exec backend npx prisma generate
```

## 🔧 Configuration

Edit the `.env` file to change database credentials:

```env
POSTGRES_USER=todo_user
POSTGRES_PASSWORD=todo_password
POSTGRES_DB=todo_db
DATABASE_URL=postgresql://todo_user:todo_password@database:5432/todo_db?schema=public
PORT=3000
```

## 🔄 Development Workflow

1. Make changes to your code
2. Rebuild the specific service:
   ```bash
   docker-compose build backend  # For backend changes
   docker-compose build frontend # For frontend changes
   ```
3. Restart the service:
   ```bash
   docker-compose up -d backend
   ```

## 🐛 Troubleshooting

### Port Conflicts
If ports 80, 3000, or 5432 are already in use, edit `docker-compose.yml`:

```yaml
ports:
  - "8080:80"   # Frontend
  - "3001:3000" # Backend
  - "5433:5432" # Database
```

### Database Issues
```bash
# Reset database
docker-compose down -v
docker-compose up --build

# Check database logs
docker-compose logs database
```

### General Issues
```bash
# Clean up and restart
docker-compose down
docker system prune -f
docker-compose up --build
```

---

**That's it!** 🎉 Your Todo application is now running in Docker containers.
