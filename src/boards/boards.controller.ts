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
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BoardEntity } from './entities/board.entity';

@Controller('boards')
@ApiTags('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @ApiCreatedResponse({ type: BoardEntity })
  async create(@Body() createBoardDto: CreateBoardDto) {
    return new BoardEntity(await this.boardsService.create(createBoardDto));
  }

  @Get()
  @ApiOkResponse({ type: BoardEntity, isArray: true })
  async findAll() {
    const boards = await this.boardsService.findAll();
    return boards.map((board) => new BoardEntity(board));
  }
  @Get('drafts')
  @ApiOkResponse({ type: BoardEntity, isArray: true })
  async findDrafts() {
    const drafts = await this.boardsService.findDrafts();
    return drafts.map((draft) => new BoardEntity(draft));
  }
  @Get(':id')
  @ApiOkResponse({ type: BoardEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const board = new BoardEntity(await this.boardsService.findOne(id));
    if (!board) {
      throw new NotFoundException(`Board #${id} not found`);
    }
    return board;
  }

  @Patch(':id')
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
  @ApiOkResponse({ type: BoardEntity })
  async remove(@Param('id', ParseIntPipe) id: string) {
    return new BoardEntity(await this.boardsService.remove(+id));
  }
}
// src/articles/articles.controller.ts
// src/articles/articles.controller.ts
