import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'generated/prisma';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nombreUsu: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  rol?: Role;
}
