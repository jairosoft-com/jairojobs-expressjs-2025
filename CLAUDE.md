# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Start production server
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

This is a Node.js/Express.js REST API microservice with the following structure:

- **index.js**: Main application entry point that sets up Express server, middleware (CORS, body-parser), routes, and Swagger UI documentation at `/api-docs`
- **database.js**: Database layer containing all PostgreSQL operations using parameterized queries for CRUD operations on the jobs table
- **API Design**: RESTful endpoints following standard conventions (`/jobs` for collection, `/jobs/:id` for individual resources)
- **OpenAPI Spec**: API documentation in `jairojobs.json` and `jairojobs.yaml` following OpenAPI 3.0.3 standard

## Critical Implementation Notes

### Security Vulnerabilities (HIGH PRIORITY)
The database credentials are currently hardcoded in `database.js:4-8`. This is a critical security issue. The TODO-simple-env-config-setup.md file contains the complete plan to implement environment variables using dotenv.

### Database Connection
- Uses PostgreSQL with the `pg` library
- Connection pool is created in `database.js` 
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
- ❌ Environment configuration (critical security issue)
- ❌ Comprehensive error handling middleware
- ❌ Input validation
- ❌ Authentication/Authorization
- ❌ Request logging
- ❌ Tests

### Development Priorities
1. **IMMEDIATE**: Implement environment configuration (see TODO-simple-env-config-setup.md)
2. **HIGH**: Add error handling middleware and input validation
3. **MEDIUM**: Implement authentication, logging, and rate limiting
4. **LOW**: TypeScript migration, monitoring, advanced features