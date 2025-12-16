import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress, CourseStatus } from './entities/progress.entity';
import { CurriculumService } from '../curriculum/curriculum.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

export interface AcademicHistory {
  approved: Set<string>;
  failed: Set<string>;
}

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepo: Repository<Progress>,
    private readonly curriculumService: CurriculumService,
  ) {}

  // 🔹 FUENTE DE VERDAD para Simulation y Optimization
  async getAcademicHistory(studentId: string): Promise<AcademicHistory> {
    const records = await this.progressRepo.find({
      where: { studentId },
    });

    return {
      approved: new Set(
        records.filter(r => r.status === CourseStatus.APPROVED).map(r => r.courseCode),
      ),
      failed: new Set(
        records.filter(r => r.status === CourseStatus.FAILED).map(r => r.courseCode),
      ),
    };
  }

  // 🔹 Cursos pendientes según malla
  async getPendingCourses(studentId: string, careerCode: string): Promise<string[]> {
    const history = await this.getAcademicHistory(studentId);
    const curriculum = await this.curriculumService.getCurriculum(careerCode);

    return Array.from(curriculum.courses.keys()).filter(
      code => !history.approved.has(code),
    );
  }

  // 🔹 Historial completo ordenado
  async getStudentProgress(studentId: string) {
    const records = await this.progressRepo.find({
      where: { studentId },
      order: { year: 'ASC' },
    });

    if (!records.length) {
      throw new NotFoundException('No hay registros de avance para este estudiante');
    }

    return records;
  }

  // 🔹 Registrar ramo cursado
  async createProgress(studentId: string, dto: CreateProgressDto) {
    const progress = this.progressRepo.create({
      studentId,
      ...dto,
    });

    return this.progressRepo.save(progress);
  }

  // 🔹 Actualizar registro
  async updateProgress(id: string, dto: UpdateProgressDto) {
    const existing = await this.progressRepo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Registro no encontrado');

    Object.assign(existing, dto);
    return this.progressRepo.save(existing);
  }

  // 🔹 (Opcional) Query segura
  async getProgressSecure(studentId: string) {
    return this.progressRepo
      .createQueryBuilder('p')
      .where('p.studentId = :id', { id: studentId })
      .getMany();
  }
}
