import { Job, Worker } from "bullmq";
import { NotificationDTO } from "../dto/notification.dto";
import { getRedisConnectionObject } from "../config/redis.config";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { MAILER_PAYLOAD } from "../producers/email.producer";

export const setupMailWorker = () => {
  const emailProcessor: Worker<NotificationDTO> = new Worker<NotificationDTO>(
    MAILER_QUEUE,
    async (job: Job) => {
      if (job.name !== MAILER_PAYLOAD) {
        throw new Error("Invalid job name");
      }

      // call the service layer from here

      const payload = job.data;
      console.log(`Processing email for: ${JSON.stringify(payload)}`);
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
