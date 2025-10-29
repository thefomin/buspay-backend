import { TicketService } from './ticket.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('tickets')
export class TicketController {
  public constructor(private readonly ticketService: TicketService) {}

  @Get(':codeId')
  public async getById(@Param('codeId') code: string) {
    return this.ticketService.getById(code);
  }

  @Post()
  public async createTicket(
    @Body()
    data: {
      code: string;
      carrier: string;
      busNumber: string;
      route: string;
      regNumber: string;
      price: number;
    },
  ) {
    return this.ticketService.createTicket(data);
  }
}
