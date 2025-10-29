import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { BotService } from '@/bot/bot.service';
import { PaymentDto } from './dto/payment-dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly botService: BotService,
  ) {}

  public async payTicket(dto: PaymentDto) {
    if (!dto.code) {
      throw new BadRequestException('Code не должен быть пустым');
    }
    const ticket = await this.prisma.ticket.findUnique({
      where: { code: dto.code },
    });

    if (!ticket) {
      throw new NotFoundException(`Билет с кодом "${dto.code}" не найден`);
    }

    const payment = await this.prisma.payment.create({
      data: {
        ticketId: ticket.id,
        telegramUser: dto.telegramUser,
        amount: dto.amount,
      },
    });

    await this.botService.sendTicketPurchased(ticket, dto);

    return payment;
  }
}
