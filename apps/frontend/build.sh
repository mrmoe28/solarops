#!/bin/bash

# Build script for Vercel deployment
# This script handles workspace dependencies in a monorepo

set -e

echo "Installing root dependencies..."
npm install

echo "Building shared packages..."
cd packages/shared
npm install
npm run build
cd ../ui
npm install
npm run build

echo "Building frontend..."
cd ../../apps/frontend
npm install
npm run build

echo "Build completed successfully!" 