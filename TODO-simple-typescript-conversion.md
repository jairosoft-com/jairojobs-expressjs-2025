# TODO: Simple TypeScript Conversion

## Simple Plan: TypeScript Conversion

### **Step 1: Install TypeScript Dependencies**
- [ ] Install TypeScript and type definitions
```bash
npm install --save-dev typescript @types/node @types/express @types/pg @types/cors @types/body-parser
```

### **Step 2: Create TypeScript Configuration**
- [ ] Initialize TypeScript configuration
```bash
npx tsc --init
```

### **Step 3: Update tsconfig.json**
- [ ] Configure TypeScript compiler options
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### **Step 4: Create Source Directory Structure**
- [ ] Create src directory and organize files
```
src/
├── 📄 index.ts              # Main application entry point
├── 📄 database.ts            # Database operations
├── 📄 config.ts              # Configuration
├── 📄 types.ts               # Type definitions
└── 📁 models/
    └── 📄 Job.ts             # Job model interface
```

### **Step 5: Create Type Definitions**

#### Create `src/types.ts`:
- [ ] Define TypeScript interfaces
```typescript
export interface Job {
  id?: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface DatabaseConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export interface ServerConfig {
  port: number;
  nodeEnv: string;
}

export interface AppConfig {
  database: DatabaseConfig;
  server: ServerConfig;
}
```

### **Step 6: Convert Files to TypeScript**

#### Convert `config.js` to `src/config.ts`:
- [ ] Convert configuration file with types
```typescript
import dotenv from 'dotenv';
import { AppConfig } from './types';

dotenv.config();

function validateEnvVars(requiredVars: string[]): void {
  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(`Environment variable ${varName} is required but not defined.`);
    }
  });
}

validateEnvVars(['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD']);

const config: AppConfig = {
  database: {
    user: process.env.DB_USER!,
    host: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    password: process.env.DB_PASSWORD!,
    port: parseInt(process.env.DB_PORT || '5432', 10),
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  }
};

export default config;
```

#### Convert `database.js` to `src/database.ts`:
- [ ] Convert database operations with types
```typescript
import { Pool, PoolClient } from 'pg';
import { Request, Response } from 'express';
import config from './config';
import { Job } from './types';

const pool = new Pool(config.database);

export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM jobs');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const addJob = async (req: Request, res: Response): Promise<void> => {
  const { title, description, company, location, salary }: Job = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO jobs (title, description, company, location, salary) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, company, location, salary]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [parseInt(id, 10)]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateJobById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, company, location, salary }: Job = req.body;
  try {
    const result = await pool.query(
      'UPDATE jobs SET title = $1, description = $2, company = $3, location = $4, salary = $5 WHERE id = $6 RETURNING *',
      [title, description, company, location, salary, parseInt(id, 10)]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const deleteJobById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [parseInt(id, 10)]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
```

#### Convert `index.js` to `src/index.ts`:
- [ ] Convert main application file with types
```typescript
import dotenv from 'dotenv';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import config from './config';
import * as db from './database';

dotenv.config();

const app: Application = express();
const PORT: number = config.server.port;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Load OpenAPI spec
const openApiSpec = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../jairojobs.json'), 'utf8')
);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Routes
app.get('/jobs', db.getAllJobs);
app.post('/jobs', db.addJob);
app.get('/jobs/:id', db.getJobById);
app.put('/jobs/:id', db.updateJobById);
app.delete('/jobs/:id', db.deleteJobById);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### **Step 7: Update package.json Scripts**
- [ ] Add TypeScript build and development scripts
```json
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "watch": "tsc --watch"
  }
}
```

### **Step 8: Install Development Dependencies**
- [ ] Install TypeScript development tools
```bash
npm install --save-dev ts-node nodemon
```

### **Step 9: Update nodemon Configuration**
- [ ] Create nodemon configuration for TypeScript
Create `nodemon.json`:
```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

### **Step 10: Test TypeScript Conversion**
- [ ] Build and test the TypeScript application
```bash
npm run build
npm run dev
```

---

## **Files to Create/Modify:**

### **Create:**
- [ ] `src/` directory
- [ ] `tsconfig.json` - TypeScript configuration
- [ ] `nodemon.json` - Nodemon configuration
- [ ] `src/types.ts` - Type definitions
- [ ] `src/config.ts` - Converted configuration
- [ ] `src/database.ts` - Converted database operations
- [ ] `src/index.ts` - Converted main application

### **Modify:**
- [ ] `package.json` - Add TypeScript scripts and dependencies

### **Install:**
- [ ] TypeScript and type definition packages
- [ ] Development tools (ts-node, nodemon)

---

## **Benefits:**
- ✅ **Type Safety** - Catch errors at compile time
- ✅ **Better IDE Support** - Enhanced autocomplete and refactoring
- ✅ **Improved Maintainability** - Clear interfaces and types
- ✅ **Better Documentation** - Types serve as documentation
- ✅ **Enhanced Developer Experience** - Better tooling support
- ✅ **Future-Proof** - TypeScript is the future of JavaScript development

---

## **Priority: MEDIUM**
This should be implemented after core security and error handling features are complete.

---

## **Current Status:**
- ✅ Environment configuration completed
- ✅ Variable naming inconsistencies fixed
- ✅ File renamed from `db_queries.js` to `database.js`
- 🔄 TypeScript conversion pending

## **Notes:**
- This conversion will improve code quality and developer experience
- Should be implemented after core functionality is stable
- Will require updating all existing JavaScript files to TypeScript
- Consider implementing this before adding complex features 