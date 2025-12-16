import { Module } from '@nestjs/common';
import { CurriculumController } from './curriculum.controller';
import { CurriculumService } from './curriculum.service';
import { ExternalApiModule } from '../external-api/external-api.module';

@Module({
  imports: [ExternalApiModule], 
  controllers: [CurriculumController],
  providers: [CurriculumService],
  exports: [CurriculumService], 
})
export class CurriculumModule {}