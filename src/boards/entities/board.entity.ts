import { Boards } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
export class BoardEntity implements Boards {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  progress: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  authorId: number;
  @ApiProperty({ default: false })
  published = false;
  @ApiProperty({ required: false, type: UserEntity })
  createdBy: UserEntity | null;
  constructor({ createdBy, ...data }: Partial<BoardEntity>) {
    Object.assign(this, data);
    if (createdBy) {
      this.createdBy = new UserEntity(createdBy);
    }
  }
}
