import { Module } from '@nestjs/common';
import { AppController, CatsController, ApiController } from './controller';
import { AppService } from './service';

@Module({
  imports: [],
  controllers: [AppController, CatsController, ApiController],
  providers: [AppService],
})
export class AppModule {}
