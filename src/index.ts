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