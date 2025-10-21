import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

import type { Ticket, Payment } from '@prisma/generated';

@Injectable()
export class BotService {
  constructor(@InjectBot() private readonly bot: Telegraf) {}

  public async sendTicketPurchased(
    ticket: Ticket,
    payment: Payment,
    chatId: number,
  ) {
    const message =
      `🎟 <b>Билет успешно оплачен!</b>\n\n` +
      `🚌 Перевозчик: <b>${ticket.carrier}</b>\n` +
      `🚍 Автобус: <b>${ticket.busNumber}</b>\n` +
      `🛣 Маршрут: <b>${ticket.route}</b>\n` +
      `🚘 Гос. номер: <b>${ticket.regNumber}</b>\n` +
      `💰 Сумма: <b>${ticket.price} ₽</b>\n` +
      `📅 ${new Date(payment.paidAt).toLocaleString()}`;

    await this.bot.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
    });
  }
}
