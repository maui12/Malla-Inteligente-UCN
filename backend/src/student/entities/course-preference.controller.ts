import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CoursePreferenceService } from './course-preference.service';
import { CreateCoursePreferenceDto } from '../dto/create-course-preference.dto';

@Controller('preferences')
export class CoursePreferenceController {
  constructor(
    private readonly service: CoursePreferenceService,
  ) {}

  // POST /preferences
  @Post()
  create(@Body() dto: CreateCoursePreferenceDto) {
    return this.service.create(dto);
  }

  // GET /preferences/student/:id
  @Get('student/:id')
  listByStudent(@Param('id') studentId: string) {
    return this.service.listByStudent(studentId);
  }

  // DELETE /preferences/:prefId
  @Delete(':prefId')
  delete(@Param('prefId') prefId: string) {
    return this.service.delete(prefId);
  }
}
