// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';
import path from 'path';

type ServerConfig = {
	PORT: number;
};

export function loadEnv() {
	// dotenv.config({ path: './src/.env' });
	dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });
	console.log(process.env.DATABASE_URL);
	console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
	PORT: Number(process.env.PORT) || 3001
};
