import { Controller, Post, Body } from '@nestjs/common';
import { CreateManualSimulationDto, SemesterPeriod } from './dto/create-manual-simulation.dto';
import { SimulationService } from './simulation.service';
import { SemesterPlan } from './dto/create-manual-simulation.dto';
import { CompareScenariosDto } from './dto/compare-scenarios.dto';

@Controller('simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

 
  @Post('manual')
  async createManualSimulation(@Body() dto: CreateManualSimulationDto): Promise<{
    estimatedGraduation: string;
    totalCreditsPerSemester: { semester: string; credits: number; }[];
    fullPlan: SemesterPlan[];
    approvedCourses: string[];
    pendingCourses: never[];
  }> {
    return this.simulationService.generateManualProjection(dto);
  }

    @Post('compare-scenarios')
  compareScenarios(@Body() dto: CompareScenariosDto) {
    return this.simulationService.compareScenarios(dto);
  }

    @Post('semester-summary')
  getSemesterSummary(@Body() dto: any) {
    return this.simulationService.getSemesterSummary(dto);
  }
}