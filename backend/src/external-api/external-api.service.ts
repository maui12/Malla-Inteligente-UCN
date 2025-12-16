import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { LoginDto } from './dto/login.dto';


interface LoginResponse {
  rut: string;
  carreras: CarreraInfo[];
}
interface CarreraInfo {
  codigo: string;
  nombre: string;
  catalogo: string;
}

@Injectable()
export class ExternalApiService {
  fetchCurriculumFromAPI(careerCode: string) {
    throw new Error('Method not implemented.');
  }
  private readonly logger = new Logger(ExternalApiService.name);

  // URLs base de las APIs externas
  private readonly puclaroApiBaseUrl = 'https://puclaro.ucn.cl/eross/avance';
  private readonly losVilosApiBaseUrl = 'https://losvilos.ucn.cl/hawaii/api';
  
 
  private readonly hawaiiAuthToken = 'jf400fejof13f';

  constructor(private readonly httpService: HttpService) {}


  async getFullStudentData(loginDto: LoginDto) {
    
  
    const loginUrl = `${this.puclaroApiBaseUrl}/login.php?email=${loginDto.email}&password=${loginDto.password}`;
    
    const loginData = await this.fetchApi<LoginResponse>(loginUrl, 'Login');
    
    if (!loginData || !loginData.rut) {
      throw new UnauthorizedException('Email o contraseña inválidos');
    }

    const { rut, carreras } = loginData;
    this.logger.log(`Login exitoso. RUT: ${rut}. Carreras: ${carreras.length}`);


    const carrerasConDatos = await Promise.all(
      carreras.map(async (carrera) => {
        
       
        const malla = await this.fetchMalla(carrera.codigo, carrera.catalogo);
        
      
        const avance = await this.fetchAvance(rut, carrera.codigo);

        
        return {
          ...carrera,
          malla,
          avance,
        };
      }),
    );

   
    return {
      rut,
      carreras: carrerasConDatos,
    };
  }

 
  private async fetchApi<T>(url: string, operation: string, headers: object = {}): Promise<T> {
    this.logger.log(`Llamando API [${operation}]: ${url}`);
    
    const { data } = await firstValueFrom(
      this.httpService.get<T>(url, { headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(`Error en [${operation}]: ${error.message}`, error.stack);
          throw new NotFoundException(`No se pudieron obtener datos de [${operation}]`);
        }),
      ),
    );
    return data;
  }

  
  private async fetchMalla(codigoCarrera: string, catalogo: string) {
    const url = `${this.losVilosApiBaseUrl}/mallas?${codigoCarrera}-${catalogo}`;
    const headers = { 'X-HAWAII-AUTH': this.hawaiiAuthToken };
    
    
    return this.fetchApi<any[]>(url, 'Malla', headers);
  }

 
  private async fetchAvance(rut: string, codigoCarrera: string) {
    const url = `${this.puclaroApiBaseUrl}/avance.php?rut=${rut}&codcarrera=${codigoCarrera}`;
    
    
    return this.fetchApi<any[]>(url, 'Avance');
  }
}