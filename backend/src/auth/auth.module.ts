import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { StudentModule } from '../student/student.module';
import { AdminModule } from 'src/admin/admin.module';
import { ExternalApiService } from '../external-api/external-api.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    StudentModule,
    AdminModule,
    PassportModule,
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ExternalApiService],
  exports: [AuthService],
})
export class AuthModule {}
