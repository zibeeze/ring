import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleMenuComponent } from './circle-menu/circle-menu.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CircleMenuComponent],
  exports: [CircleMenuComponent],
})
export class UiModule {}
