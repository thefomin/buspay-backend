import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';

@Module({
  imports: [],
  controllers: [TicketController],
  providers: [],
})
export class TicketModule {}
