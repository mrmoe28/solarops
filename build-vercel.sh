#!/bin/bash

# Vercel build script for SolarOps frontend
set -e

echo "🚀 Starting SolarOps Vercel build..."

# Function to handle errors
handle_error() {
    echo "❌ Build failed at line $1"
    exit 1
}

# Set error handler
trap 'handle_error $LINENO' ERR

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🔨 Building shared package first..."
pnpm --filter @solarops/shared build

echo "🎨 Building UI package..."
pnpm --filter @solarops/ui build

echo "🌐 Building frontend..."
pnpm --filter @solarops/frontend build

echo "✅ Build completed successfully!" 