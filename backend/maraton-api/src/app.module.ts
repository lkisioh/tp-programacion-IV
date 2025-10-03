
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CiudadModule } from './ciudad/ciudad.module';
import { Ciudad } from './ciudad/entities/ciudad.entity';

import { AtletaModule } from './atleta/atleta.module';
import { Atleta } from './atleta/entities/atleta.entity';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexión Ciudades
    TypeOrmModule.forRootAsync({
      name: 'ciudadesConnection', 
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        
        type: 'sqlite',
        database: config.get<string>('DB_NAME_CIUDADES') ?? 'ciudades.sqlite',
        entities: [Ciudad],
        synchronize: true,
      }),
    }),

    // Conexión Atletas
    TypeOrmModule.forRootAsync({
      name: 'atletasConnection', 
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DB_NAME_ATLETAS') ?? 'atletas.sqlite',
        entities: [Atleta],
        synchronize: true,
      }),
    }),

    CiudadModule,
    AtletaModule,
  ],
})
export class AppModule {}