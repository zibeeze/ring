import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({ namespace: 'touch-free' })
export class TouchFreeGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  constructor() {
    let a = 0;
    setInterval(() => {
      let rad = a % 700;
      if (rad <= 360) {
        this.server.emit('input', { rad });
      }
      a++;
    }, 10);
  }
}
