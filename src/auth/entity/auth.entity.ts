//src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}
