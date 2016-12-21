import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LedGridComponent } from './led-grid/led-grid.component';
import { LedCellComponent } from './led-cell/led-cell.component';
import { LedControlComponent } from './led-control/led-control.component';
import { LedControlService } from './led-control.service';
import { LightMessageService } from './light-message.service'

@NgModule({
  declarations: [
    AppComponent,
    LedGridComponent,
    LedCellComponent,
    LedControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LedControlService,
    LightMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
