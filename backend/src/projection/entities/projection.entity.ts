import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Projection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentRut: string;

  @Column()
  careerCode: string;

  @Column()
  name: string;

  @Column('jsonb') 
  data: any;

  @CreateDateColumn()
  createdAt: Date;
}