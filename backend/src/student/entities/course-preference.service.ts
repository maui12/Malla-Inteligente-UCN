import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursePreference } from './course-preference.entity';
import { CreateCoursePreferenceDto } from '../dto/create-course-preference.dto';

@Injectable()
export class CoursePreferenceService {
  constructor(
    @InjectRepository(CoursePreference)
    private readonly repo: Repository<CoursePreference>,
  ) {}

  // CREATE
  async create(dto: CreateCoursePreferenceDto): Promise<CoursePreference> {
    const preference = this.repo.create(dto);
    return this.repo.save(preference);
  }

  // READ by student
  async listByStudent(studentId: string): Promise<CoursePreference[]> {
    return this.repo.find({
      where: { studentId },
      order: { year: 'ASC' },
    });
  }

  // DELETE
  async delete(prefId: string): Promise<void> {
    const result = await this.repo.delete(prefId);
    if (result.affected === 0) {
      throw new NotFoundException('Preferencia no encontrada');
    }
  }
}
