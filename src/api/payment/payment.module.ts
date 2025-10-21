import { Module } from '@nestjs/common';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { BotModule } from '@/bot/bot.module';

@Module({
  imports: [BotModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
