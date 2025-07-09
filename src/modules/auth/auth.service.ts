import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { Role } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.usuario.create({
      data: {
        nombreUsu: dto.name,
        email: dto.email,
        imagen: dto.imagen,
        password: hashedPassword,
        rol: dto.role ?? Role.MESERO,
      },
    });

    return this.signToken(user.idUsuario, user.email);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.usuario.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return this.signToken(user.idUsuario, user.email);
  }

  private signToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
