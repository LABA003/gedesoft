import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../../../generated/prisma';

export class CreateUsuarioDto {
  @IsString()
  nombreUsuario: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  rol: Role;
}
