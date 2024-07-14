import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { SendEmailService } from '../send-email.service';

@Processor('SEND_EMAIL_QUEUE')
export class SendEmailConsumerService {
  constructor(private sendEmailService: SendEmailService) {}

  @Process('SEND_EMAIL_QUEUE')
  async execute({ data }: Job<SendEmailHandler>) {
    await this.sendEmailService.sendWelcomeEmail({
      ...data,
    });
  }

  @OnQueueActive()
  onActive(job: Job<SendEmailHandler>) {
    console.log('onActive: ', job.id);
  }

  @OnQueueFailed()
  async onFailed(job: Job<SendEmailHandler>, err: Error) {
    console.log('Failed: ', job.id, err);
}

  @OnQueueCompleted()
  onComplet(job: Job<SendEmailHandler>) {
    console.log('Complete: ', job.id);
  }
}
