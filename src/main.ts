import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MachineModule } from './modules/machine/machine.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3500);

  const config = new DocumentBuilder()
    .setTitle('Dynamic Incubator')
    .setDescription(
      'Dynamic Incubator is a flexible and configurable incubation and automation system framework TypeScript starter repository.',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const docs = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, CompaniesModule, MachineModule, UsersModule],
  });
  SwaggerModule.setup('api/docs', app, docs);

  await app.listen(port);
}
bootstrap();
