#!/bin/bash
# E2E Test Database Setup Script
# Ensures the database is seeded with test data

echo "🔧 Setting up E2E test database..."

# Check if database is accessible
echo "📡 Checking database connection..."
npx prisma db execute --stdin <<< "SELECT 1;" > /dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "✅ Database connection successful"
  
  # Seed test data
  echo "🌱 Seeding test data..."
  npx prisma db seed
  
  echo "✅ E2E test database setup complete!"
  echo ""
  echo "Run E2E tests with: npm run test:e2e"
else
  echo "❌ Cannot connect to database"
  echo ""
  echo "Please check:"
  echo "  1. DATABASE_URL is set in .env or .env.test"
  echo "  2. Database server is accessible"
  echo "  3. Network connection is stable"
  exit 1
fi
