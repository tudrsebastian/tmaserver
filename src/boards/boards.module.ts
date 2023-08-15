import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  controllers: [BoardsController],
  providers: [BoardsService],
  imports: [PrismaModule],
})
export class BoardsModule {}
