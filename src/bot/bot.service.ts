import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

import type { Payment, Ticket } from '../../prisma/generated';
import { PaymentDto } from '@/api/payment/dto/payment-dto';

@Injectable()
export class BotService {
  constructor(@InjectBot() private readonly bot: Telegraf) {}

  public async sendTicketPurchased(
    payment: Payment,
    ticket: Ticket,
    dto: PaymentDto,
  ) {
    const message =
      `🎟 <b>Билет успешно оплачен!</b>\n\n` +
      `🚌 Перевозчик: <b>${ticket.carrier}</b>\n` +
      `🚍 Автобус: <b>${ticket.busNumber}</b>\n` +
      `🛣 Маршрут: <b>${ticket.route}</b>\n` +
      `🚘 Гос. номер: <b>${ticket.regNumber}</b>\n` +
      `💰 Сумма: <b>${dto.amount.toFixed(2)} ₽</b>\n`;

    await this.bot.telegram.sendMessage(dto.chatId, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🧾 Посмотреть билет',
              web_app: {
                url: `https://buspay-app.vercel.app/receipt/${payment.id}`,
              },
            },
          ],
        ],
      },
    });
  }
}
