import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateCiudadDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    nombre: string;
}



