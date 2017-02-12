import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { ColorComponent } from './components/color/color.component';
import { FrameControlComponent } from './components/frame-control/frame-control.component';
import { FrameListComponent } from './components/frame-list/frame-list.component';
import { EditComponent } from './components/edit/edit.component';
import { FrameViewComponent } from './components/frame-view/frame-view.component';
import { FrameAddComponent } from './components/frame-add/frame-add.component';
import { FrameDeleteComponent } from './components/frame-delete/frame-delete.component'

import { ServerService } from './services/server.service'
import { LedControlService } from './services/led-control.service';
import { LightMessageService } from './services/light-message.service';

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
