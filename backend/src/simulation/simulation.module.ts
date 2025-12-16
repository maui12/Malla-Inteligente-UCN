import { Module } from '@nestjs/common';
import { SimulationController } from './simulation.controller';
import { SimulationService } from './simulation.service';
import { ProgressModule } from '../progress/progress.module';
import { CurriculumModule } from '../curriculum/curriculum.module';

@Module({
  imports: [ProgressModule, CurriculumModule], 
  controllers: [SimulationController],
  providers: [SimulationService],
})
export class SimulationModule {}