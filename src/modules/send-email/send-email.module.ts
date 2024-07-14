import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { SendEmailProvider } from './send-email.provider';
import { SendEmailQueueService } from './jobs/send-email-queue.service';
import { SendEmailConsumerService } from './jobs/send-email-consumer.service';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'SEND_EMAIL_QUEUE' }),
    BullBoardModule.forFeature({
      name: 'SEND_EMAIL_QUEUE',
      adapter: BullMQAdapter, //or use BullAdapter if you're using bull instead of bullMQ
    }),
  ],
  providers: [
    SendEmailService,
    SendEmailProvider,
    SendEmailQueueService,
    SendEmailConsumerService,
  ],
  exports: [
    SendEmailProvider,
    SendEmailService,
    SendEmailQueueService,
    SendEmailConsumerService,
  ],
})
export class SendEmailModule {}
