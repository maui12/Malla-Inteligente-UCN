import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  findByEmail(email: string) {
    return this.studentRepo.findOne({ where: { email } });
  }

  create(data: Partial<Student>) {
    const student = this.studentRepo.create(data);
    return this.studentRepo.save(student);
  }

  async upsertFromUCN(email: string, rut: string, carreras: any[]) {
  let student = await this.findByEmail(email);
  
  if (!student) {
      // Si no existe, lo creamos
      student = this.studentRepo.create({
        email,
        rut,
        carreras,
        name: email.split('@')[0], // Nombre temporal
        passwordHash: 'EXTERNAL_AUTH', //no usamos bcrypt
        careerCode: carreras[0]?.codigo || '',
        yearOfAdmission: 0,
        curriculumCatalogYear: 0
      });
    } else {
      student.rut = rut;
      student.carreras = carreras;
    }
    
    return await this.studentRepo.save(student);
  }
}
