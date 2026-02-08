#!/bin/bash

# Complete setup script for Hakathon_1

echo "🚀 Setting up Physical AI & Humanoid Robotics Docusaurus..."
echo ""

# Check Node.js version
echo "📍 Checking Node.js installation..."
if command -v node &> /dev/null; then
  NODE_VERSION=$(node -v)
  echo "✅ Node.js $NODE_VERSION found"
else
  echo "❌ Node.js not found. Please install Node.js 18+"
  exit 1
fi

echo ""
echo "📍 Checking npm..."
if command -v npm &> /dev/null; then
  NPM_VERSION=$(npm -v)
  echo "✅ npm $NPM_VERSION found"
else
  echo "❌ npm not found"
  exit 1
fi

echo ""
echo "📍 Installing dependencies..."
npm install

echo ""
echo "📍 Setting up fonts..."
chmod +x scripts/setup-fonts.sh
bash scripts/setup-fonts.sh

echo ""
echo "📍 TypeScript type check..."
npm run typecheck

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "  npm start       - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run serve   - Serve production build"
echo ""
echo "📖 Documentation: https://docusaurus.io/"
echo "🤖 Project: https://github.com/masoomtariq/Hakathon_1"
