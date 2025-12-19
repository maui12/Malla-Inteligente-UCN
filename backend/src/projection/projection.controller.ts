import { Body, Controller, Post } from '@nestjs/common';
import { ProjectionService } from './projection.service';
import { CreateProjectionDto } from './dto/create-projection';

@Controller('projection')
export class ProjectionController {
  constructor(private readonly projectionService: ProjectionService) {}

  @Post('automatic')
  createProjection(@Body() dto: CreateProjectionDto) {
    return this.projectionService.createAutomaticProjection(dto);
  }
}