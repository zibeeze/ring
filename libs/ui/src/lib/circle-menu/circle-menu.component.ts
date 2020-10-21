import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'zander-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.scss'],
})
export class CircleMenuComponent implements OnInit, OnChanges {
  @Input()
  items: any[];

  @Input()
  open: boolean;

  @Input()
  selected: number;

  public numItems: number;
  public rotate: number;
  public skew: number;
  public itemRotates: number[];
  public listRotate: number;

  constructor() {}

  ngOnInit(): void {
    this.numItems = this.selected;
    this.calculate();
  }

  ngOnChanges(): void {
    console.log(this.selected);
    this.calculate();
  }

  private calculate() {
    this.numItems = this.items.length;
    switch (this.numItems) {
      case 3:
        this.rotate = 80;
        this.skew = 10;
        this.itemRotates = [-31, 50, 131];
        this.listRotate = 50;
        break;
      case 4:
        this.rotate = 88;
        this.skew = 2;
        this.itemRotates = [-134, -44, 46, 136];
        this.listRotate = 46;
        break;
      case 5:
        this.rotate = 70;
        this.skew = 20;
        this.itemRotates = [-89, -17, 55, 127, 199];
        this.listRotate = 55;
        break;

      default:
        break;
    }
  }

  getLITransform(index: number): string {
    if (this.open) {
      return `rotate(${this.itemRotates[index]}deg) skew(${this.skew}deg)`;
    } else {
      return `rotate(${this.listRotate}deg) skew(${this.skew}deg)`;
    }
  }
}
