# Estrategia de Testing

## Alcance
El testing del proyecto se enfocó en validar la lógica académica central del sistema, dado que representa el mayor riesgo funcional.

## Tests implementados

### Unitarios
- SimulationService:
  - Validación de prerrequisitos
  - Límite de créditos por semestre
  - Simulación manual válida
- ProgressService:
  - Construcción correcta del historial académico
  - Cálculo de ramos pendientes

### Integración
- Flujo completo:
  - Registro de progreso académico
  - Simulación de toma de ramos
  - Obtención de proyección

## Exclusiones
No se testearon controladores ni módulos administrativos, ya que su lógica es principalmente de orquestación y validación estándar provista por NestJS.

## Ejecución
```bash
npm run test
