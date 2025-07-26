require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { Pool } = require('pg');

const app = express();
const config = require('./config');

const PORT = config.server.port;

var cors = require('cors');

// PostgreSQL connection setup
const db = require('./database');

// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

/* app.use((req, res, next) => {
    const error = new Error('Something went wrong');
    next(error);
}); */

// Error-handling Middleware
/* app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Internal Server Error');
}); */

// Load OpenAPI spec
const openApiSpec = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'jairojobs.json'), 'utf8')
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
