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