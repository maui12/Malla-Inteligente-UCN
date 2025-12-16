import { Controller, Get, Query } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {

  @Get('future-demand')
  getFutureCourseDemand(
    @Query('courseCode') courseCode: string,
    @Query('semester') semester: string, 
  ) {
    //Implementar lógica
    return {
      courseCode,
      semester,
      estimatedStudents: 0, //Calcular basado en simulaciones
    };
  }
}