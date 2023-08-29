import { Boards } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
export class BoardEntity implements Boards {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false, type: () => [UserEntity] }) // Use an array to represent multiple members
  members: UserEntity[] | null; // Use an array to represent multiple members

  constructor({ members, ...data }: Partial<BoardEntity>) {
    Object.assign(this, data);
    if (members) {
      this.members = members.map((memberData) => new UserEntity(memberData));
    }
  }
}
