import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class TouchFreeService {
  private socket: SocketIOClient.Socket;
  public open: boolean;
  public items: { label: string }[];
  public selectedHash: { [name: number]: number };
  public selectedItem: number;
  private lastReceivedTime: number;

  constructor() {
    this.open = true;
    this.socket = io(`http://localhost:3334/hover`);
    this.setItems([
      { label: 'One' },
      { label: 'Two' },
      { label: 'Three' },
      { label: 'Four' },
      { label: 'Five' },
    ]);
    this.socket.on('input', (data) => {
      this.selectedItem = this.selectedHash[data.rad];
      this.lastReceivedTime = new Date().getTime();
    });
    this.lastReceivedTime = new Date().getTime();
    setInterval(() => {
      let time = new Date().getTime();
      if (time - this.lastReceivedTime > 1000) {
        this.open = false;
        this.selectedItem = -1;
      } else {
        this.open = true;
      }
    });
  }

  setItems(items: { label: string }[]) {
    this.items = items;
    this.selectedHash = {};
    switch (this.items.length) {
      case 5:
        for (let i = 0; i < 55; i++) {
          this.selectedHash[i] = 3;
        }
        for (let i = 55; i < 127; i++) {
          this.selectedHash[i] = 2;
        }
        for (let i = 127; i < 199; i++) {
          this.selectedHash[i] = 1;
        }
        for (let i = 199; i < 271; i++) {
          this.selectedHash[i] = 0;
        }
        for (let i = 271; i < 343; i++) {
          this.selectedHash[i] = 4;
        }
        for (let i = 343; i < 361; i++) {
          this.selectedHash[i] = 3;
        }

        break;

      default:
        break;
    }
  }
}
