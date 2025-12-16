import { Controller, Post, Body } from '@nestjs/common'; //
import { ExternalApiService } from './external-api.service';
import { LoginDto } from './dto/login.dto'; //

@Controller('external-api')
export class ExternalApiController {
  constructor(private readonly externalApiService: ExternalApiService) {}

  @Post('login')
  loginAndGetData(@Body() loginDto: LoginDto) { 
    return this.externalApiService.getFullStudentData(loginDto);
  }
}