import { Queue } from 'bullmq';
import { getRedisConnectionObject } from '../config/redis.config';
import { NotificationDTO } from '../dto/notification.dto';

export const MAILER_QUEUE = 'queue-mailer';

export const mailerQueue: Queue<string, NotificationDTO> = new Queue(
	MAILER_QUEUE,
	{
		connection: getRedisConnectionObject() as any
	}
);
