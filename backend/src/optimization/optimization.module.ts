import { Module } from '@nestjs/common';
import { OptimizationController } from './optimization.controller';
import { OptimizationService } from './optimization.service';
import { ProgressModule } from '../progress/progress.module';
import { CurriculumModule } from '../curriculum/curriculum.module';

@Module({
  imports: [ProgressModule, CurriculumModule],
  controllers: [OptimizationController],
  providers: [OptimizationService],
})
export class OptimizationModule {}