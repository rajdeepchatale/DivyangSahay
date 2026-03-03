#!/bin/zsh
# ============================================
#  DivyangSahay — One-Click Website Launcher
# ============================================
# Double-click this file to start the website.
# It will open automatically in your browser.

# Change to project directory
cd "$(dirname "$0")"

# Set up Node.js path
export PATH="$HOME/.local/node-v20.11.0-darwin-arm64/bin:$PATH"

echo "🚀 Starting DivyangSahay..."
echo ""

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Please install Node.js first."
    echo "   Visit: https://nodejs.org"
    echo ""
    echo "Press any key to close..."
    read -k1
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (first time only)..."
    npm install
    echo ""
fi

# Open browser after a short delay (gives server time to start)
(sleep 3 && open "http://localhost:5173") &

echo "✅ Server starting on http://localhost:5173"
echo "   Your browser will open automatically."
echo ""
echo "⛔ To stop the server, close this window or press Ctrl+C"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the dev server
npm run dev
