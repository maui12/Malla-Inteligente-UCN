import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursePreference } from './entities/course-preference.entity';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { CoursePreferenceService } from './entities/course-preference.service';
import { CoursePreferenceController } from './entities/course-preference.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([CoursePreference,Student]),
  ],
  providers: [
    CoursePreferenceService,StudentService
  ],
  controllers: [
    CoursePreferenceController,StudentService
  ],
  exports: [
    CoursePreferenceService,StudentService
  ],
})
export class StudentModule {}



