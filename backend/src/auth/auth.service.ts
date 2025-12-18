import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StudentService } from '../student/student.service';
import { AdminService } from '../admin/admin.service';
import { ExternalApiService } from '../external-api/external-api.service'; // Asegura la ruta

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly adminService: AdminService,
    private readonly externalApi: ExternalApiService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const ucnData = await this.externalApi.getFullStudentData({ email, password });

      if (ucnData && ucnData.rut) {
        const student = await this.studentService.upsertFromUCN(
          email,
          ucnData.rut,
          ucnData.carreras
        );
        return { ...student, role: 'student' };
      }
    } catch (error) {
      console.log('Login UCN fallido, buscando en base de datos local...');
    }

    //LOGICA PARA ADMINS O FALLBACK LOCAL
    const admin = await this.adminService.findByEmail(email);
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) return { ...admin, role: 'admin' };
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        rut: user.rut,
        carreras: user.carreras, //El frontend ahora recibe todo procesado
        role: user.role,
      },
    };
  }
}