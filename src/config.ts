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

// Validate required environment variables
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