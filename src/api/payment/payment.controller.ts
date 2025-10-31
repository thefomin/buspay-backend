import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment-dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  public async payTicket(@Body() dto: PaymentDto) {
    return this.paymentService.payTicket(dto);
  }

  @Get('receipt/:receiptId')
  public async getById(@Param('receiptId') receiptId: string) {
    return this.paymentService.getById(receiptId);
  }
}
