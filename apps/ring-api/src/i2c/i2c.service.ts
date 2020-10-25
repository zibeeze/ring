import { Injectable } from '@nestjs/common';
import * as i2c from 'i2c-bus';

@Injectable()
export class I2cService {
  private address = 0x42;

  public initialize() {}
}
