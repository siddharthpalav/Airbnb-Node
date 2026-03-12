import { NotificationDTO } from '../dto/notification.dto';
import { mailerQueue } from '../queues/email.queue';

export const MAILER_PAYLOAD = 'payload-mail';

export const addEmailToQueue = async (payload: NotificationDTO) => {
	await mailerQueue.add(MAILER_PAYLOAD, JSON.stringify(payload));
	console.log(`Email added to queue for ${JSON.stringify(payload)}`);
};
