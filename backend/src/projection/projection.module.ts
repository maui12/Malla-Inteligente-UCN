import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectionController } from './projection.controller';
import { ProjectionService } from './projection.service';
import { ExternalApiModule } from '../external-api/external-api.module';
import { Projection } from './entities/projection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projection]),ExternalApiModule], 
  controllers: [ProjectionController],
  providers: [ProjectionService],
})
export class ProjectionModule {}