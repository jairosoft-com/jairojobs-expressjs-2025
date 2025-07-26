# JairoJobs Express.js 2025

A Node.js/Express.js microservice for managing job portal functionalities with PostgreSQL database.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn
- TypeScript (installed as dev dependency)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd jairojobs-expressjs-2025

# Install dependencies
npm install

# Set up environment variables (see Environment Configuration section)
cp .env.example .env
# Edit .env file with your database credentials

# Start the development server
npm run dev
```

### Available Scripts
- `npm start` - Start production server (from compiled JavaScript)
- `npm run dev` - Start development server with hot reload (TypeScript)
- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch TypeScript files and recompile on changes

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/jobs`  | Get all jobs |
| POST   | `/jobs`  | Create a new job |
| GET    | `/jobs/:id` | Get job by ID |
| PUT    | `/jobs/:id` | Update job by ID |
| DELETE | `/jobs/:id` | Delete job by ID |

### API Documentation
- **Swagger UI**: Available at `/api-docs`
- **OpenAPI Spec**: `api-docs/jairojobs.json` and `api-docs/jairojobs.yaml`

## 🏗️ Project Structure

```
jairojobs-expressjs-2025/
├── 📁 src/                     # TypeScript source files
│   ├── 📄 index.ts            # Main application entry point
│   ├── 📄 database.ts         # Database operations
│   ├── 📄 config.ts           # Configuration module
│   └── 📄 types.ts            # Type definitions
├── 📁 api-docs/                # API documentation
│   ├── 📄 jairojobs.json      # OpenAPI specification
│   └── 📄 jairojobs.yaml      # OpenAPI specification YAML
├── 📁 dist/                    # Compiled JavaScript (gitignored)
├── 📁 todos-completed/         # Completed TODO files
├── 📄 tsconfig.json            # TypeScript configuration
├── 📄 nodemon.json             # Nodemon configuration
├── 📄 package.json             # Project configuration
├── 📄 README.md                # Project documentation
└── 📄 CLAUDE.md                # AI assistant guidance
```

## 🛠️ Technology Stack

### Core Technologies
- **TypeScript** - Type-safe JavaScript superset
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **pg** - PostgreSQL client

### Development Tools
- **Nodemon** - Development server with hot reload
- **ts-node** - TypeScript execution for development
- **Swagger UI** - API documentation
- **CORS** - Cross-origin resource sharing
- **Type Definitions** - Full TypeScript support for all dependencies

## 📊 Current Status

### ✅ Completed
- [x] Basic CRUD operations for jobs
- [x] API documentation with OpenAPI 3.0.3
- [x] Variable naming inconsistencies fixed
- [x] Database layer modularization
- [x] Swagger UI integration
- [x] Environment configuration implementation
- [x] TypeScript conversion

### 🔄 In Progress
- [ ] Security best practices implementation
- [ ] Error handling improvements
- [ ] Input validation

### ⚠️ Known Issues
- **High**: Missing error handling middleware
- **Medium**: No input validation
- **Medium**: Flat project structure

## 🎯 Development Plans

### High Priority (Immediate)
1. **Environment Configuration** - Move credentials to environment variables
2. **Error Handling** - Implement proper error handling middleware
3. **Input Validation** - Add request validation
4. **Security Headers** - Implement security middleware

### Medium Priority (Next Sprint)
1. **Authentication System** - JWT-based authentication
2. **Request Logging** - Structured logging implementation
3. **Rate Limiting** - API rate limiting
4. **Testing** - Unit and integration tests

### Low Priority (Future)
1. **TypeScript Migration** - Convert to TypeScript
2. **Advanced Authorization** - Role-based access control
3. **Data Encryption** - Sensitive data encryption
4. **Monitoring** - Application monitoring and alerting

## 🔧 Configuration

### Environment Variables
Create a `.env` file with the following variables:
```env
# Database Configuration
DB_USER=your_username
DB_HOST=localhost
DB_NAME=jairojobs
DB_PASSWORD=your_password
DB_PORT=5432

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Database Setup
1. Create a PostgreSQL database named `jairojobs`
2. Create a `jobs` table with the following schema:
```sql
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  company VARCHAR(255),
  location VARCHAR(255),
  salary DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📈 Code Quality Analysis

### Strengths
- ✅ Clean and readable code structure
- ✅ Proper separation of database operations
- ✅ Comprehensive API documentation
- ✅ SQL injection prevention (parameterized queries)
- ✅ CORS enabled for cross-origin requests
- ✅ Development-friendly setup with hot reload

### Areas for Improvement
- 🔧 **Security**: Implement environment variables for credentials
- 🔧 **Error Handling**: Add comprehensive error handling
- 🔧 **Validation**: Add input validation and sanitization
- 🔧 **Architecture**: Implement proper MVC structure
- 🔧 **Testing**: Add unit and integration tests
- 🔧 **Logging**: Implement structured logging
- 🔧 **Monitoring**: Add health checks and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🔗 References

- [Express.js CRUD REST API with PostgreSQL](https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/)
- [Express.js with TypeScript](https://blog.logrocket.com/express-typescript-node/)

## 📞 Support

For support and questions, please refer to the TODO files for implementation plans and current development status.