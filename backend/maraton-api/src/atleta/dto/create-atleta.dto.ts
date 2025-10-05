
import { IsString, IsNotEmpty, IsNumber, MaxLength} from 'class-validator';

export class CreateAtletaDto {
  
  @IsNumber()
  @IsNotEmpty()
  dni: number;

  @IsString()
   @IsNotEmpty()
   @MaxLength(20)
  nombre: string;

    @IsString()
  @IsNotEmpty()
  tiempo: string;

  @IsNumber()
  @IsNotEmpty()
  ciudadId: number;
}