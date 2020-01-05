import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('find-all')
  findAll(): string {
    return 'This action returns Find All';
  }
}
