import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';
export class CreateTicketDto {
  @ApiProperty()
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
  position?: number;
  @ApiProperty()
  @IsNotEmpty()
  boardID: number;
  @ApiProperty()
  @IsString()
  columnID: string;
}
