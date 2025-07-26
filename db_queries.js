// PostgreSQL connection setup
const pool = new Pool({
  user: 'jairo',
  host: 'localhost',
  database: 'jairojobs',
  password: 'jajnav5@',
  port: 5432,
});

// Routes
app.get('/jobs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM jobs');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/jobs', async (req, res) => {
  const { title, description, company, location, salary } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO jobs (title, description, company, location, salary) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, company, location, salary]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [parseInt(id, 10)]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const updateUser = async (request, response) => {
  const { id } = request.params;
  const { title, description, company, location, salary } = request.body;
  try {
    const result = await pool.query(
      'UPDATE jobs SET title = $1, description = $2, company = $3, location = $4, salary = $5 WHERE id = $6 RETURNING *',
      [title, description, company, location, salary, parseInt(id, 10)]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    response.json(result.rows[0]);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

const deleteUser = async (request, response) => {
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