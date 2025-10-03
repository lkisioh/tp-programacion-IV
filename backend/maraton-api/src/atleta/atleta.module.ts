
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atleta } from './entities/atleta.entity';
import { AtletaService } from './atleta.service';
import { AtletaController } from './atleta.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Atleta], 'atletasConnection')],
  providers: [AtletaService],
  controllers: [AtletaController],
})
export class AtletaModule {}
