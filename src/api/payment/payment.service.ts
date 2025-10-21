import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { BotService } from '@/bot/bot.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly botService: BotService,
  ) {}

  public async payTicket(code: string, telegramUser: string, chatId: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { code },
    });

    if (!ticket) {
      throw new NotFoundException(`Билет с кодом "${code}" не найден`);
    }

    const payment = await this.prisma.payment.create({
      data: {
        ticketId: ticket.id,
        telegramUser,
        amount: ticket.price,
      },
    });

    await this.botService.sendTicketPurchased(ticket, payment, chatId);

    return payment;
  }
}
