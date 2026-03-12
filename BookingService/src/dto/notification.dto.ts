export interface NotificationDTO {
	to: string;
	subject: string;
	message: string;
	params: Record<string, any>;
}
