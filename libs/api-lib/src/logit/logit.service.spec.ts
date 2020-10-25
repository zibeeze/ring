import { Test, TestingModule } from '@nestjs/testing';
import { LogitService } from './logit.service';

describe('LogitService', () => {
  let service: LogitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogitService],
    }).compile();

    service = module.get<LogitService>(LogitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
