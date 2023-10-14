import { Boards } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
export class BoardEntity implements Boards {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false, type: () => [UserEntity] })
  members: UserEntity[] | null;

  @ApiProperty({ required: false, type: () => UserEntity })
  createdBy: UserEntity | null;
  @ApiProperty()
  userId: number;
  constructor({ members, createdBy, ...data }: Partial<BoardEntity>) {
    Object.assign(this, data);

    if (members) {
      this.members = members.map((memberData) => new UserEntity(memberData));
    }

    if (createdBy) {
      this.createdBy = new UserEntity(createdBy);
    }
  }
}
