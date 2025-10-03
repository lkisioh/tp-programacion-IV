import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['dni'])
export class Atleta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dni: number;

  @Column()
  nombre: string;

  @Column()
  tiempo: string;

  @Column()
  posicion: number;

  @Column()
  ciudadId: number;  
}
