import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ProjectionService } from './projection.service';
import { CreateProjectionDto } from './dto/create-projection';

@Controller('projection')
export class ProjectionController {
  constructor(private readonly projectionService: ProjectionService) {}

  @Post('automatic')
  createProjection(@Body() dto: CreateProjectionDto) {
    return this.projectionService.createAutomaticProjection(dto);
  }

  @Post('save')
    save(@Body() body: any) {
    return this.projectionService.saveProjection(body);
    }

  @Get('student/:rut')
    findAll(@Param('rut') rut: string) {
    return this.projectionService.findAllByStudent(rut);
    }
}