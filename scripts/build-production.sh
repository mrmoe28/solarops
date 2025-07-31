#!/bin/bash

# Production build script for SolarOps
set -e

echo "🚀 Starting SolarOps production build..."

# Function to handle errors
handle_error() {
    echo "❌ Build failed at line $1"
    exit 1
}

# Set error handler
trap 'handle_error $LINENO' ERR

echo "📦 Installing dependencies..."
pnpm install --shamefully-hoist --frozen-lockfile

echo "🔨 Building shared package..."
pnpm --filter shared build

echo "🎨 Building UI package..."
pnpm --filter ui build

echo "🌐 Building frontend..."
pnpm --filter frontend build

echo "✅ Build completed successfully!"
echo "📊 Build summary:"
echo "   - Shared package: ✅ Built"
echo "   - UI package: ✅ Built"
echo "   - Frontend: ✅ Built" 