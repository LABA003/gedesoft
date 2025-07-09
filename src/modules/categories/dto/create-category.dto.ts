import { IsEnum } from 'class-validator';
import { TipoCategoria } from 'generated/prisma';

export class CreateCategoryDto {
  @IsEnum(TipoCategoria, {
    message: `El nombre debe ser uno de: ${Object.values(TipoCategoria).join(', ')}`,
  })
  nombre: TipoCategoria;
}
