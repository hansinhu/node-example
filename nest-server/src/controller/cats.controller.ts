import { Controller, Get, Req, Headers } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('/detail/:id')
  findCartsDetail(@Req() request: Request, @Headers() headers: any): string {
    console.log(request.params.id, headers.cookie)
    const catsId = request.params.id
    return `This action returns cats detail for id: ${catsId}`;
  }
}
