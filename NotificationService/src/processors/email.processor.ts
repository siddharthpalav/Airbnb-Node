import { Job, Worker } from "bullmq";
import { NotificationDto } from "../dto/notification.dto";
import { getRedisConnectionObject } from "../config/redis.config";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../templates/templates.handler";
import { sendEmail } from "../services/mailer.service";
import logger from "../config/logger.config";

export const setupMailWorker = () => {
  const emailProcessor: Worker<NotificationDto> = new Worker<NotificationDto>(
    MAILER_QUEUE,
    async (job: Job) => {
      if (job.name !== MAILER_PAYLOAD) {
        throw new Error("Invalid job name");
      }

      // call the service layer from here

      const payload = JSON.parse(job.data) as NotificationDto;
      console.log(`Processing email for: ${JSON.stringify(payload)}`);

      const emailContent = await renderMailTemplate(
        payload.templateId,
        payload.params,
      );

      await sendEmail(payload.to, payload.subject, emailContent);

      logger.info(
        `Email sent to ${payload.to} with subject ${payload.subject}`,
      );
    },
    {
      connection: getRedisConnectionObject() as any,
    },
  );

  emailProcessor.on("failed", () => {
    console.error("Email processing failed");
  });

  emailProcessor.on("completed", () => {
    console.log("Email processing completed successfully");
  });
};
