import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsUUID,
  IsOptional,
} from 'class-validator';
export class CreateTicketDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(25)
  @MaxLength(255)
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  position: number;
  @ApiProperty()
  @IsOptional()
  boardID: number;
  @ApiProperty()
  columnID: string;
}
