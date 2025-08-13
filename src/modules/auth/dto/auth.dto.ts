import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../../../../generated/prisma';

export class AuthDto {
  @IsString()
  nombreUsuario: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsString()
  @MinLength(10)
  password: string;

  @IsEnum(Role)
  rol?: Role;
}
