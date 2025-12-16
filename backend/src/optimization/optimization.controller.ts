import { Controller, Post, Body } from '@nestjs/common';
import { OptimizeDto } from './dto/optimize.dto';
import { OptimizationService } from './optimization.service';

@Controller('optimization')
export class OptimizationController {
  constructor(private readonly optimizationService: OptimizationService) {}

  // Tarea 4: Algoritmo básico de optimización
  @Post('fastest')
  async getFastestPath(@Body() dto: OptimizeDto) {
    return this.optimizationService.generateFastestPath(dto);
  }
}