import { Pool } from 'pg';
import { Request, Response } from 'express';
import config from './config';
import { Job } from './types';

const pool = new Pool(config.database);

export const getAllJobs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query<Job>('SELECT * FROM jobs');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const addJob = async (req: Request, res: Response): Promise<void> => {
  const { title, description, company, location, salary }: Job = req.body;
  try {
    const result = await pool.query<Job>(
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
    const result = await pool.query<Job>('SELECT * FROM jobs WHERE id = $1', [parseInt(id, 10)]);
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
    const result = await pool.query<Job>(
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
    const result = await pool.query<Job>('DELETE FROM jobs WHERE id = $1 RETURNING *', [parseInt(id, 10)]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};