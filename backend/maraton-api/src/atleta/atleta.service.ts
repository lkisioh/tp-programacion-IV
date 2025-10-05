import { Injectable, ConflictException, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAtletaDto } from './dto/create-atleta.dto';
import { UpdateAtletaDto } from './dto/update-atleta.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Atleta } from './entities/atleta.entity';


@Injectable()
export class AtletaService {
  constructor(
    @InjectRepository(Atleta, 'atletasConnection')
  private atletaRepo: Repository<Atleta>,
  ) {}
  
  findAll() : Promise<Atleta[]> {
    return this.atletaRepo.find({ order: { posicion: 'ASC' } });
  }

  async findOne(id: number) : Promise<Atleta> {
     {
    const atletaExiste = await this.atletaRepo.findOneBy({ id });
    if (!atletaExiste)
      throw new ConflictException(`El atleta con id: ${id} no existe`);
    return atletaExiste;
  }
  }

    async update(id: number, atletaDto: Partial<UpdateAtletaDto>): Promise<Atleta> {
    
    const atletaExistente = await this.atletaRepo.findOneBy({ id });
    if (!atletaExistente) {
      throw new NotFoundException(`No se encontró el atleta con id ${id}`);
    }
  
    Object.assign(atletaExistente, atletaDto);
    
    try {
      const guardado = await this.atletaRepo.save(atletaExistente);
      if (typeof this.recalcularPosiciones === 'function') {
        await this.recalcularPosiciones();
      }
      return guardado;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo actualizar el atleta: '+error);
    }
  }


  async remove(id: number)  {
    const atletaExiste = this.atletaRepo.findOneBy({ id });
    if (!atletaExiste)
      throw new ConflictException('El atleta no existe');

    await this.atletaRepo.delete(id);
    await this.recalcularPosiciones();

    return `Atleta eliminado correctamente`;
  }

 async create(atletaDto: Partial<CreateAtletaDto>): Promise<Atleta> {
    
    const existe = await this.atletaRepo.findOneBy({ dni: atletaDto.dni });
    if (existe) {
      throw new ConflictException('El atleta ya existe');
    }

    try {
      const nuevoAtleta = this.atletaRepo.create(atletaDto);
      nuevoAtleta.posicion=0;
      const guardado = await this.atletaRepo.save(nuevoAtleta);

      
      if (typeof this.recalcularPosiciones === 'function') {
        await this.recalcularPosiciones();
      }

      return guardado;

    } catch (error) {

      throw new InternalServerErrorException('Error al guardar atleta '+error);
    }
  }

private convertirASegundos(tiempo: string): number {
    const regex = /(?:(\d+)h)?\s*(?:(\d+)m)?\s*(?:(\d+)s)?/;
    const match = tiempo.match(regex);
    if (!match) return 0;

    const horas = parseInt(match[1]) || 0;
    const minutos = parseInt(match[2]) || 0;
    const segundos = parseInt(match[3]) || 0;

    return horas * 3600 + minutos * 60 + segundos;
  }

private async recalcularPosiciones() {
     const atletas = await this.atletaRepo.find();

    // Ordenamos por tiempo convertido a segundos
    atletas.sort(
      (a, b) => this.convertirASegundos(a.tiempo) - this.convertirASegundos(b.tiempo),
    );

    // Asignamos posiciones y guardamos solo si cambia
    for (let i = 0; i < atletas.length; i++) {
      const nuevaPos = i + 1;
      if (atletas[i].posicion !== nuevaPos) {
        atletas[i].posicion = nuevaPos;
        await this.atletaRepo.save(atletas[i]);
      }
    }
  }
}



