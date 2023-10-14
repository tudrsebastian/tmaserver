import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}
  async create(createBoardDto: CreateBoardDto, userId: number) {
    const createdBoard = await this.prisma.boards.create({
      data: {
        title: createBoardDto.title,
        createdBy: {
          connect: {
            id: userId, // Assuming userId represents the current user's ID
          },
        },
      },
    });

    // Step 2: Obtain the board's id
    const boardId = createdBoard.id;

    // Step 3: Create the default columns
    await this.prisma.column.createMany({
      data: [
        {
          name: 'Backlog',
          boardId: boardId,
        },
        {
          name: 'Todo',
          boardId: boardId,
        },
        {
          name: 'In Progress',
          boardId: boardId,
        },
        {
          name: 'Done',
          boardId: boardId,
        },
      ],
    });

    return createdBoard;
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
        columns: {
          include: {
            Ticket: {
              orderBy: { position: 'asc' }, // Sort by position in ascending order
            },
          },
        },
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
