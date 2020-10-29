import { Injectable } from '@nestjs/common';
import { Logit } from '@zander/api-lib';
import { Gpio } from 'onoff';
import * as i2c from 'i2c-bus';

@Injectable()
export class AppService {
  private address = 0x42;
  private ts: Gpio;
  private reset: Gpio;
  private connection: i2c.PromisifiedBus;

  constructor(private logit: Logit) {
    logit.setContext('HOVER');
  }

  public async initialize() {
    this.logit.log('Initializing Hover.');
    this.logit.log('Open I2C');
    this.connection = await i2c.openPromisified(1);
    this.logit.log('I2C Opened');
    this.ts = new Gpio(23, 'low');
    this.reset = new Gpio(24, 'low');
    process.on('SIGINT', () => {
      this.end();
    });

    await this.reset.write(0);
    // await this.delay(1000);
    this.reset.setDirection('in');

    let autoCal = [
      0x10,
      0x00,
      0x00,
      0xa2,
      0x80,
      0x00,
      0x00,
      0x00,
      0x06,
      0x00,
      0x00,
      0x00,
      0xff,
      0xff,
      0xff,
      0xff,
    ];
    await this.connection.i2cWrite(this.address, 16, Buffer.from(autoCal));
    this.logit.log('Connected to Hover');
    return true;
  }

  // private delay(ms: number) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  private getStatus() {
    let ts = this.ts.readSync();
    if (ts === 1) {
      return 1;
    } else {
      // this.ts.setDirection('low');
      return 0;
    }
  }

  private setRelease() {
    this.ts.writeSync(1);
    // this.ts.setDirection('in');
  }

  private end() {
    this.ts.unexport();
    this.reset.unexport();
  }

  public async getPosition() {
    if (this.getStatus) {
      let event = await this.getEvent();
      // this.logit.warn(event);
      this.setRelease();
      return event;
    }else {
      return false;
    }
  }

  private async getEvent(){

    let busData = Buffer.alloc(26);
    await this.connection.i2cRead(this.address, 26, busData);
    // this.logit.warn('BUS DATA: ');
    // this.logit.warn(busData);
    let positionEvent = (busData[7] & 0x01)
    if( positionEvent == 1) {
      let x = ((busData[21] << 8) | busData[20])
      let y = ((busData[23] << 8) | busData[22])
      let z = ((busData[25] << 8) | busData[24])
      x -= 32767
      y -= 32767
      z -= 32767
      return [x,y,z]
    }
    else{
      return false
    }
  }
}
