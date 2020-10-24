import { Component } from '@angular/core';
import { TouchFreeService } from './touch-free/touch-free.service';

@Component({
  selector: 'zander-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public touchFreeService: TouchFreeService) {}
}
