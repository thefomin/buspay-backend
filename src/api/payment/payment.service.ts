import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { BotService } from '../../bot/bot.service';
import { PaymentDto } from './dto/payment-dto';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly botService: BotService,
  ) {}

  public async payTicket(dto: PaymentDto) {
    if (!dto.code) {
      throw new BadRequestException('Code не должен быть пустым');
    }
    const ticket = await this.prismaService.ticket.findUnique({
      where: { code: dto.code },
    });

    if (!ticket) {
      throw new NotFoundException(`Билет с кодом "${dto.code}" не найден`);
    }

    const payment = await this.prismaService.payment.create({
      data: {
        ticketId: ticket.id,
        telegramUser: dto.telegramUser,
        amount: dto.amount,
      },
    });

    await this.botService.sendTicketPurchased(payment, ticket, dto);

    return payment;
  }

  public async getById(receiptId: string) {
    const receipt = await this.prismaService.payment.findUnique({
      where: { id: receiptId },
      include: { ticket: true },
    });

    if (!receipt) {
      throw new NotFoundException(`Такой квинтации не существует`);
    }

    return receipt;
  }
}
