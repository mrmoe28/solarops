#!/bin/bash

echo "🚀 SolarOps Development Setup"
echo "============================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
    echo "After installing Docker, run this script again."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm@8.15.1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Start Docker containers
echo "🐳 Starting Docker containers..."
docker compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Run database migrations
echo "🗄️  Running database migrations..."
cd apps/backend
pnpm prisma generate
pnpm prisma migrate dev --name init
cd ../..

# Build packages
echo "🔨 Building packages..."
pnpm build

echo "✅ Setup complete!"
echo ""
echo "To start the development servers, run:"
echo "  pnpm dev"
echo ""
echo "Services:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend:  http://localhost:4000/graphql"
echo "  - Database: postgresql://localhost:5432/solarops"
echo "  - Redis:    redis://localhost:6379"