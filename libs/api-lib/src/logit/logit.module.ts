import { Module } from '@nestjs/common';
import { Logit } from './logit.service';

@Module({
  providers: [Logit],
  exports: [Logit],
})
export class LogitModule {}
