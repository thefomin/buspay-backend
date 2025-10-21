import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { PaymentModule } from './api/payment/payment.module';
import { TicketModule } from './api/ticket/ticket.module';
import { PrismaModule } from './infra/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    BotModule,
    PaymentModule,
    TicketModule,
  ],
})
export class AppModule {}
