import Redis from "ioredis";
import { serverConfig } from ".";

// Since we want to maintain a single connection to our Redis server, we can use a closure to create a singleton instance of the Redis client. This way, we can ensure that we are reusing the same connection throughout our application, which is more efficient and reduces the overhead of creating multiple connections.
// Singleton pattern for Redis connection
export function connectToRedis() {
  try {
    let connection: Redis;

    const redisConfig = {
      port: serverConfig.REDIS_PORT,
      host: serverConfig.REDIS_HOST,
      maxRetriesPerRequest: null, // Disable automatic retries to handle reconnection logic manually
    };

    return () => {
      if (!connection) {
        connection = new Redis(redisConfig);
        return connection;
      }

      return connection;
    };
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    throw error;
  }
}

export const getRedisConnectionObject = connectToRedis();
