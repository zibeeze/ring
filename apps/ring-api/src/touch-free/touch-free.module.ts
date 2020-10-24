import { Module } from '@nestjs/common';
import { TouchFreeGateway } from './touch-free.gateway';

@Module({
  providers: [TouchFreeGateway]
})
export class TouchFreeModule {}
