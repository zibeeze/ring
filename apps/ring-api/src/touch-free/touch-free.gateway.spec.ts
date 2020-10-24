import { Test, TestingModule } from '@nestjs/testing';
import { TouchFreeGateway } from './touch-free.gateway';

describe('TouchFreeGateway', () => {
  let gateway: TouchFreeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouchFreeGateway],
    }).compile();

    gateway = module.get<TouchFreeGateway>(TouchFreeGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
