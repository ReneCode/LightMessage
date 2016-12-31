import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { ColorComponent } from './color/color.component';
import { LedControlService } from './led-control.service';
import { LightMessageService } from './light-message.service';
import { FrameControlComponent } from './frame-control/frame-control.component'

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ColorComponent,
    FrameControlComponent
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
