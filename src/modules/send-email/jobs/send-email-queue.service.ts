import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class SendEmailQueueService {
  constructor(@InjectQueue('SEND_EMAIL_QUEUE') private sendEmailQueue: Queue) {}

  async execute(data: SendEmailHandler) {
    await this.sendEmailQueue.add('SEND_EMAIL_QUEUE', {
      ...data,
    });
  }
}
