import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  name: string;

  @Column()
  careerCode: string;

  //AÑO DE INGRESO
  @Column()
  yearOfAdmission: number;

  //VERSION DE LA MALLA CURRICULAR
  @Column()
  curriculumCatalogYear: number;
}
