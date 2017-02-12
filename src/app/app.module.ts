import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { ColorComponent } from './color/color.component';
import { LedControlService } from './services/led-control.service';
import { LightMessageService } from './services/light-message.service';
import { FrameControlComponent } from './frame-control/frame-control.component';
import { FrameListComponent } from './frame-list/frame-list.component';
import { EditComponent } from './edit/edit.component';
import { FrameViewComponent } from './frame-view/frame-view.component';
import { FrameAddComponent } from './frame-add/frame-add.component';
import { FrameDeleteComponent } from './frame-delete/frame-delete.component'
import { ServerService } from './services/server.service'

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ColorComponent,
    FrameControlComponent,
    FrameListComponent,
    EditComponent,
    FrameViewComponent,
    FrameAddComponent,
    FrameDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LedControlService,
    LightMessageService,
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
