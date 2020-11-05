import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AppService } from './app.service';
import { delay, cartToMenu } from '@zander/util';

@WebSocketGateway({ namespace: 'hover' })
export class AppGateway {
  @WebSocketServer()
  server: Server;

  constructor(private service: AppService) {
    this.initialize();
  }

  private async initialize() {
    await this.service.initialize();

    while (true) {
      const position = await this.service.getPosition();

      if (position) {
        const menu = cartToMenu(position[0], position[1]);
        menu['z'] = position[2];
        this.server.emit('input', menu);
      }
      await delay(10);
    }
  }
}
