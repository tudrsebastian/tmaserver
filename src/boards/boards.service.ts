import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}
  create(createBoardDto: CreateBoardDto) {
    return this.prisma.boards.create({ data: createBoardDto });
  }

  findAll() {
    return this.prisma.boards.findMany();
  }

  findOne(id: number) {
    return this.prisma.boards.findUnique({
      where: { id },
      include: {
        members: true,
        Ticket: true,
        columns: { include: { Ticket: true } },
      },
    });
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return this.prisma.boards.update({
      where: { id },
      data: updateBoardDto,
    });
  }

  remove(id: number) {
    return this.prisma.boards.delete({ where: { id } });
  }
}
