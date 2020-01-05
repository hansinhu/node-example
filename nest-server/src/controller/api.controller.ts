import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get('v1')
  findAll(): string {
    return 'This action returns /api/v1';
  }
}
