#!/bin/bash

# Setup Atlas Wealth Auto-Start with PM2
echo "🚀 Setting up Atlas Wealth to run automatically..."

# Install PM2 globally
echo "📦 Installing PM2..."
npm install -g pm2 > /dev/null 2>&1

# Go to project directory
cd "/Users/ahmeda/Cowork Playground/Portfolio"

# Start the dev server with PM2
echo "⚙️  Starting dev server..."
pm2 start "npm run dev" --name "atlas-wealth" > /dev/null 2>&1

# Make PM2 restart on system reboot
echo "🔄 Setting up auto-restart on system reboot..."
pm2 startup > /dev/null 2>&1
pm2 save > /dev/null 2>&1

# Done
echo "✅ Complete! Your Atlas Wealth dashboard is now set up to run automatically."
echo ""
echo "📍 Access your dashboard at:"
echo "   http://localhost:3000/dashboard"
echo ""
echo "💾 Bookmark this link for easy access!"
echo ""
echo "Useful commands:"
echo "   pm2 restart atlas-wealth   (to restart)"
echo "   pm2 stop atlas-wealth      (to stop)"
echo "   pm2 logs atlas-wealth      (to see logs)"
