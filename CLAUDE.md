# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload (TypeScript)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server (requires build)
npm start

# Run PostgreSQL commands (macOS/Linux)
psql -U jairo -d jairojobs

# Create the jobs table (if not exists)
psql -U jairo -d jairojobs -c "CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  company VARCHAR(255),
  location VARCHAR(255),
  salary DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);"
```

## Architecture Overview

This is a TypeScript Node.js/Express.js REST API microservice with the following structure:

- **src/index.ts**: Main application entry point that sets up Express server, middleware (CORS, body-parser), routes, and Swagger UI documentation at `/api-docs`
- **src/database.ts**: Database layer containing all PostgreSQL operations using parameterized queries for CRUD operations on the jobs table
- **src/config.ts**: Centralized configuration module that loads environment variables with validation
- **src/types.ts**: TypeScript interfaces defining Job, DatabaseConfig, ServerConfig, and AppConfig types
- **API Design**: RESTful endpoints following standard conventions (`/jobs` for collection, `/jobs/:id` for individual resources)
- **OpenAPI Spec**: API documentation in `jairojobs.json` and `jairojobs.yaml` following OpenAPI 3.0.3 standard

### TypeScript Configuration
- Strict mode enabled for maximum type safety
- Target ES2020 with CommonJS modules
- Source files in `src/`, compiled output in `dist/`
- Development uses ts-node for direct TypeScript execution

## Critical Implementation Notes

### Database Connection
- Uses PostgreSQL with the `pg` library
- Connection pool is created in `src/database.ts`
- Environment variables are properly configured via `src/config.ts` 
- All queries use parameterized statements to prevent SQL injection
- Error handling is implemented at the database operation level

### API Structure
All endpoints return JSON responses and handle errors with appropriate HTTP status codes:
- 200: Success
- 201: Created
- 204: No Content (delete success)
- 404: Not Found
- 500: Server Error

### Current Development Status
- ✅ Basic CRUD operations implemented
- ✅ Swagger UI integrated at `/api-docs`
- ✅ CORS enabled
- ✅ Database operations modularized
- ✅ Environment configuration implemented
- ✅ TypeScript conversion completed
- ❌ Comprehensive error handling middleware
- ❌ Input validation
- ❌ Authentication/Authorization
- ❌ Request logging
- ❌ Tests

### Development Priorities
1. **HIGH**: Add error handling middleware and input validation
2. **MEDIUM**: Implement authentication, logging, and rate limiting
3. **LOW**: Add tests, monitoring, advanced features