import { TicketService } from './ticket.service';

export class TicketController {
  public constructor(private readonly ticketService: TicketService) {}

  public async ticket() {}
}
