import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}
  async create(createTicketDto: CreateTicketDto) {
    console.log(createTicketDto);
    return this.prisma.ticket.create({
      data: {
        title: createTicketDto.title,
        description: createTicketDto.description,
        position: createTicketDto.position,
        board: { connect: { id: createTicketDto.boardID } },
        column: { connect: { id: createTicketDto.columnID } },
      },
    });
    // try {
    //   const newTicket = await this.prisma.ticket.create({
    //     data: createTicketDto,
    //   });
    //   return newTicket;
    // } catch (err) {
    //   throw new BadRequestException('Could not create new ticket');
    // }
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: string) {
    return this.prisma.ticket.findUnique({
      where: { id },
    });
  }
  async update(id: string, updateTicketDto: UpdateTicketDto) {
    try {
      // Use Prisma to update the ticket by ID
      const updatedTicket = await this.prisma.ticket.update({
        where: { id }, // Specify the ticket to update by ID
        data: updateTicketDto, // Update with the provided data from the DTO
      });

      return updatedTicket; // Return the updated ticket
    } catch (error) {
      // Handle any errors, such as ticket not found
      throw new NotFoundException(`Ticket not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.ticket.delete({ where: { id } });
      return `Ticket deleted successfully!`;
    } catch (error) {
      throw new NotFoundException(`Ticket not found`);
    }
  }
}
