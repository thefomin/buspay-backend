import { PrismaService } from '../../infra/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TicketService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getById(code: string) {
    const ticket = await this.prismaService.ticket.findUnique({
      where: { code },
    });

    if (!ticket) {
      throw new NotFoundException(`Билет с кодом "${code}" не найден`);
    }

    return ticket;
  }

  public async validateTicket(code: string) {
    const ticket = await this.prismaService.ticket.findUnique({
      where: { code },
    });
    if (!ticket) {
      throw new NotFoundException(`Билет с кодом "${code}" не найден`);
    }

    return true;
  }

  public async createTicket(data: {
    code: string;
    carrier: string;
    busNumber: string;
    route: string;
    regNumber: string;
    price: number;
  }) {
    return this.prismaService.ticket.create({ data });
  }
}
