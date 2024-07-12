import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachineModule } from './modules/machine/machine.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompaniesModule } from './modules/companies/companies.module';

@Module({
  imports: [
    MachineModule,
    UsersModule,
    AuthModule,
    CompaniesModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
