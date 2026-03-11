// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';
import path from 'path';

type ServerConfig = {
	PORT: number;
	REDIS_SERVER_URL?: string;
	LOCK_TTL: number;
};

export function loadEnv() {
	// dotenv.config({ path: './src/.env' });
	dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });
	console.log(process.env.DATABASE_URL);
	console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
	PORT: Number(process.env.PORT) || 3001,
	REDIS_SERVER_URL: process.env.REDIS_SERVER_URL || 'redis://localhost:6379',
	LOCK_TTL: Number(process.env.LOCK_TTL) || 5000 // Default TTL for locks in milliseconds
};
