import { IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

export class RemovePlatillosDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  idPlatillos: number[];
}
