#!/usr/bin/env pwsh

Write-Host "🚀 Starting Todo Application with Docker..." -ForegroundColor Blue
Write-Host ""

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR: Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host ""
    Write-Host "Please edit .env file if needed, then run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 0
}

Write-Host "🏗️ Building and starting containers..." -ForegroundColor Blue
docker-compose up --build -d

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Success! Application is starting..." -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Frontend: http://localhost" -ForegroundColor Cyan
    Write-Host "🔧 Backend API: http://localhost:3000" -ForegroundColor Cyan  
    Write-Host "🗄️ Database: localhost:5432" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Yellow
    Write-Host "Run database migrations:"
    Write-Host "  docker-compose exec backend npx prisma migrate deploy" -ForegroundColor Gray
    Write-Host ""
    Write-Host "View logs:"
    Write-Host "  docker-compose logs -f" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Stop application:"
    Write-Host "  docker-compose down" -ForegroundColor Gray
} else {
    Write-Host ""
    Write-Host "❌ Failed to start containers. Check the logs above." -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to exit"