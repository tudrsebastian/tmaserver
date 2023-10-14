import { Ticket } from '@prisma/client';

export class TicketEntity implements Ticket {
  id: string;
  title: string;
  description: string;
  position: number;
  boardID: number;
  columnID: string;
}
