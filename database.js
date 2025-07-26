// PostgreSQL connection setup
const Pool = require('pg').Pool;
const config = require('./config');

const pool = new Pool(config.database);

// Routes
const getAllJobs = async (request, response) => {
  try {
    const result = await pool.query('SELECT * FROM jobs');
    response.json(result.rows);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

const addJob = async (request, response) => {
  const { title, description, company, location, salary } = request.body;
  try {
    const result = await pool.query(
      'INSERT INTO jobs (title, description, company, location, salary) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, company, location, salary]
    );
    response.status(201).json(result.rows[0]);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

const getJobById = async (request, response) => {
  const { id } = request.params;
  try {
    const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [parseInt(id, 10)]);
    if (result.rows.length === 0) {
      return response.status(404).json({ error: 'Job not found' });
    }
    response.json(result.rows[0]);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

const updateJobById = async (request, response) => {
  const { id } = request.params;
  const { title, description, company, location, salary } = request.body;
  try {
    const result = await pool.query(
      'UPDATE jobs SET title = $1, description = $2, company = $3, location = $4, salary = $5 WHERE id = $6 RETURNING *',
      [title, description, company, location, salary, parseInt(id, 10)]
    );
    if (result.rows.length === 0) {
      return response.status(404).json({ error: 'Job not found' });
    }
    response.json(result.rows[0]);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

const deleteJobById = async (request, response) => {
  const { id } = request.params;
  try {
    const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING *', [parseInt(id, 10)]);
    if (result.rows.length === 0) {
      return response.status(404).json({ error: 'Job not found' });
    }
    response.status(204).send();
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllJobs,
  addJob,
  getJobById,
  updateJobById,
  deleteJobById,
};
