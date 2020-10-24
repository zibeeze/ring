import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiModule } from '@zander/ui';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TouchFreeService } from './touch-free/touch-free.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    UiModule,
  ],
  providers: [TouchFreeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
