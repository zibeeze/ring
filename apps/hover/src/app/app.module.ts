import { Module } from '@nestjs/common';
import { LogitModule } from '@zander/api-lib';

import { AppService } from './app.service';
import { AppGateway } from './app.gateway';

@Module({
  imports: [LogitModule],
  controllers: [],
  providers: [AppService, AppGateway],
})
export class AppModule {}
