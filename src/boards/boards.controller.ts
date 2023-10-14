import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BoardEntity } from './entities/board.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('boards')
@ApiTags('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BoardEntity })
  async create(@Body() createBoardDto: CreateBoardDto, @Req() request: any) {
    // Access the user ID from the request headers
    const userId = request.user.id; // Assuming your user ID is stored in request.user

    try {
      const createdBoard = await this.boardsService.create(
        createBoardDto,
        userId,
      );
      return new BoardEntity(createdBoard);
    } catch (error) {
      // Handle any errors here
      console.error('Error creating board:', error);
      throw error;
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BoardEntity, isArray: true })
  async findAll() {
    const boards = await this.boardsService.findAll();
    return boards.map((board) => new BoardEntity(board));
  }
  // @Get('drafts')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: BoardEntity, isArray: true })
  // async findDrafts() {
  //   const drafts = await this.boardsService.findDrafts();
  //   return drafts.map((draft) => new BoardEntity(draft));
  // }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BoardEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const board = new BoardEntity(await this.boardsService.findOne(id));
    if (!board) {
      throw new NotFoundException(`Board #${id} not found`);
    }
    return board;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: BoardEntity })
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return new BoardEntity(
      await this.boardsService.update(+id, updateBoardDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: BoardEntity })
  async remove(@Param('id', ParseIntPipe) id: string) {
    return new BoardEntity(await this.boardsService.remove(+id));
  }
}
// src/articles/articles.controller.ts
// src/articles/articles.controller.ts
