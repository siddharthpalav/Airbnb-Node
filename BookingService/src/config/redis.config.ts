import IORedis, { Redis } from 'ioredis';
import Redlock from 'redlock';
import { serverConfig } from '.';

export const redisClient: IORedis = new IORedis(serverConfig.REDIS_SERVER_URL);

export function connectToRedis() {
	try {
		let connection: Redis;

		return () => {
			if (!connection) {
				connection = new IORedis(serverConfig.REDIS_SERVER_URL);
				return connection;
			}

			return connection;
		};
	} catch (error) {
		console.error('Error connecting to Redis:', error);
		throw error;
	}
}

export const getRedisConnectionObject = connectToRedis();

export const redlock = new Redlock([getRedisConnectionObject()], {
	driftFactor: 0.01, // time in ms
	retryCount: 10,
	retryDelay: 200, // time in ms
	retryJitter: 200 // time in ms
});
