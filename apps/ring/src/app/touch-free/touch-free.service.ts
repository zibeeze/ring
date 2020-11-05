import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class TouchFreeService {
  private socket: SocketIOClient.Socket;
  public open: boolean;
  private opening: boolean;
  private canRecieveClick: boolean;
  private clicked: boolean;
  private z;
  public items: { label: string }[];
  public selectedHash: { [name: number]: number };
  public selectedItem: number;
  private haveRecievedData: boolean;
  private lastReceivedTime: number;
  public onClick: Subject<number>;

  constructor() {
    this.open = false;
    this.haveRecievedData = false;
    this.canRecieveClick = false;
    this.clicked = false;
    this.opening = false;
    this.onClick = new Subject();
    this.socket = io(`http://localhost:3334/hover`);
    this.setItems([
      { label: 'One' },
      { label: 'Two' },
      { label: 'Three' },
      { label: 'Four' },
      { label: 'Five' },
    ]);
    this.socket.on('input', (data) => {
      // console.log(data);
      if (this.clicked === false) {
        this.selectedItem = this.selectedHash[data.degrees];
      }
      let deltaZ = this.z - data.z;
      this.z = data.z;
      // console.log(this.z);
      // console.log(deltaZ);
      if (deltaZ > 4000 && this.canRecieveClick) {
        this.onClick.next(this.selectedItem);
        this.selectedItem = -1;
        this.open = false;
        this.canRecieveClick = false;
        this.clicked = true;
      }
      // console.log(this.selectedItem);
      this.haveRecievedData = true;
      this.lastReceivedTime = new Date().getTime();
    });
    this.lastReceivedTime = new Date().getTime();
    setInterval(() => {
      let time = new Date().getTime();
      if (time - this.lastReceivedTime > 1000 || !this.haveRecievedData) {
        this.open = false;
        this.canRecieveClick = false;
        this.opening = false;
        this.selectedItem = -1;
        this.clicked = false;
      } else if (this.clicked === false) {
        this.open = true;
        if (this.opening === false) {
          this.opening = true;
          setTimeout(() => {
            if (this.open) {
              this.canRecieveClick = true;
            }
          }, 2000);
        }
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
