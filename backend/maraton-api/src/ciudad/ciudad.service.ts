import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';



@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad, 'ciudadesConnection')
    private ciudadRepo: Repository<Ciudad>,
  ) {}

  findAll(): Promise<Ciudad[]> {
    return this.ciudadRepo.find();
  }

  findOne(id: number): Promise<Ciudad | null> {
     const ciudadExiste = this.ciudadRepo.findOneBy({ id });
    if (!ciudadExiste)
      throw new ConflictException(`La ciudad con id: ${id} no existe`);
    return this.ciudadRepo.findOneBy({ id });
  }

  update(id: number, updateCiudadDto: UpdateCiudadDto)  {
    const ciudadExiste = this.ciudadRepo.findOneBy({ id });
    if (!ciudadExiste)
      throw new ConflictException('La ciudad no existe');
    return this.ciudadRepo.update(id, updateCiudadDto),`Se actualizo la ciudad id : ${id}`;
  }

  remove(id: number) {
        const ciudadExiste = this.ciudadRepo.findOneBy({ id });
    if (!ciudadExiste)
      throw new ConflictException('La ciudad no existe');
    return this.ciudadRepo.delete(id),`Se elimino la ciudad id : ${id}`;
  }

  async create (ciudad: Partial<CreateCiudadDto>): Promise<Ciudad | null> {
    const existe = await this.ciudadRepo.findOneBy({ nombre: ciudad.nombre });
    if (existe)
      throw new ConflictException('La ciudad ya existe');
    const nuevo = this.ciudadRepo.create(ciudad);
    return this.ciudadRepo.save(nuevo);
  }

    
}
