#!/bin/bash
# Setup and restart script for newsletter confirmation fix

# Check if we're in the right directory structure
if [ ! -d ./server ] || [ ! -d ./client ]; then
  echo "Error: Not in the project root directory. Please run from project root."
  exit 1
fi

# Check for DATABASE_URL in environment
if [ -z "$DATABASE_URL" ]; then
  echo "⚠️ WARNING: DATABASE_URL environment variable is not set."
  echo "Your email confirmation links will not work correctly without a database connection."
  echo "Please set this environment variable before continuing."
  
  # Ask user to continue anyway
  read -p "Do you want to continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborting restart."
    exit 1
  fi
  
  echo "Continuing without DATABASE_URL..."
else
  echo "✅ DATABASE_URL is set. Length: ${#DATABASE_URL}"
fi

# Install any dependencies if needed
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Restart the server
echo "Restarting server..."
if [ -f ./server.pid ]; then
  PID=$(cat ./server.pid)
  if ps -p $PID > /dev/null; then
    echo "Stopping existing server process: $PID"
    kill $PID
    sleep 2
  fi
fi

# Start the server in the background
echo "Starting server..."
npm start & echo $! > ./server.pid

echo ""
echo "Server has been restarted with confirmation page fixes."
echo "Please test your confirmation links now."
echo ""
echo "To check server logs, run: tail -f logs/server.log"
