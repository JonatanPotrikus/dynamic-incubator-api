import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as hbs from 'nodemailer-express-handlebars';
import * as path from 'path';
import { SendEmailProvider } from 'src/modules/send-email/send-email.provider';

@Injectable()
export class SendEmailService {
  constructor(
    private configService: ConfigService,
    private sendEmailProvider: SendEmailProvider,
  ) {}

  async sendWelcomeEmail(sendEmail: SendEmailHandler) {
    const transporter = this.sendEmailProvider.getTranporter();
    const handlebarOptions = this.getHandlebarOptions();
    const companyName = this.configService.get(
      'COMPANY_NAME',
      'Hélice Tecnologia',
    );

    transporter.use('compile', hbs(handlebarOptions));

    const info = await transporter.sendMail({
      from: `${companyName} <contato@helice.com>`, // endereço do remetente
      to: sendEmail.to, // destinatário(s)
      subject: 'Hélice Tech | Welcome 👋🏼', // assunto do e-mail
      text: sendEmail.text, // corpo do e-mail em texto simples
      template: 'welcome', // nome do arquivo de template
      context: {
        name: sendEmail.name,
        email: sendEmail.to,
        token: '12345',
        app_url: this.configService.get('APP_URL', 'localhost:3001'),
      },
    });

    console.log('Message sent: %s', info.messageId);
  }

  getHandlebarOptions() {
    return {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./src/shared/templates/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/shared/templates/'),
      extName: '.handlebars',
    };
  }
}
