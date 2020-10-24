import { Module } from '@nestjs/common';
import { TouchFreeModule } from '../touch-free/touch-free.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TouchFreeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
