import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalApiService } from './external-api.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ExternalApiService],
  exports: [ExternalApiService], // Exporta el servicio para que otros módulos lo usen
})
export class ExternalApiModule {}