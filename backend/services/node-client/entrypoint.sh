#!/bin/sh
set -e

echo "Applying Prisma migrations..."
npx prisma db push

echo "Starting app..."

npm run start:prod