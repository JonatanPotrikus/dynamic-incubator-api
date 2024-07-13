import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });

    const handlebarOptions = this.getHandlebarOptions();

    this.transporter.use('compile', hbs(handlebarOptions));
  }

  async sendWelcomeEmail(
    to: string,
    name: string,
    subject: string,
    text: string,
  ) {
    const companyName = this.configService.get(
      'COMPANY_NAME',
      'Hélice Tecnologia',
    );
    const info = await this.transporter.sendMail({
      from: `${companyName} <contato@helice.com>`, // endereço do remetente
      to, // destinatário(s)
      subject, // assunto do e-mail
      text, // corpo do e-mail em texto simples
      template: 'welcome', // nome do arquivo de template
      context: {
        name,
        email: to,
        token: '12345',
        app_url: this.configService.get('APP_URL', 'localhost:3001'),
      },
    });

    console.group('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    console.groupEnd();
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
