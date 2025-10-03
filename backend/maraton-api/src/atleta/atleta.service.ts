import { ConflictException, Injectable } from '@nestjs/common';
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
    return this.atletaRepo.find();
  }

  findOne(id: number) : Promise<Atleta | null> {
    return this.atletaRepo.findOneBy({ id });
  }

  update(id: number, updateAtletaDto: UpdateAtletaDto) {
    return `This action updates a #${id} atleta`;
  }

  remove(id: number) {
    return this.atletaRepo.delete(id),`Se elimino el atleta id : ${id}`;
  }

  async create (atleta: Partial<CreateAtletaDto>): Promise<Atleta | null> {
    const existe = await this.atletaRepo.findOneBy({ dni: atleta.dni });
    if (existe)
      throw new ConflictException('El atleta ya existe');
    const nuevo = this.atletaRepo.create(atleta);
    return this.atletaRepo.save(nuevo);
  }
}
