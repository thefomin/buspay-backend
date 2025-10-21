import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':code')
  public async payTicket(
    @Param('code') code: string,
    @Body() body: { telegramUser: string; chatId: number },
  ) {
    return this.paymentService.payTicket(code, body.telegramUser, body.chatId);
  }
}
