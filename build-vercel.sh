#!/bin/bash

# Vercel build script for SolarOps frontend
set -e

echo "Installing dependencies..."
pnpm install --shamefully-hoist

echo "Building shared package first..."
pnpm --filter shared build

echo "Building UI package..."
pnpm --filter ui build

echo "Building frontend..."
pnpm --filter frontend build

echo "Build completed successfully!" 