import { Component, EventEmitter, Output, Input, AfterViewChecked } from '@angular/core';
import { LightMessage, LightFrame } from '../light-message'

@Component({
  selector: 'app-frame-list',
  templateUrl: './frame-list.component.html',
  styleUrls: ['./frame-list.component.scss']
})
export class FrameListComponent implements AfterViewChecked {

  @Input('lightmessage') lightMessage: LightMessage
  @Input('currentFrame') currentFrame: LightFrame
  @Output('selectFrame') selectFrame = new EventEmitter<LightFrame>();


  constructor() { }

  ngAfterViewChecked() {
    // console.log(this.lightMessage)
//    this.currentFrame = this.lightMessage[0];
  }

  getFrames() {
    if (!this.lightMessage) {
      return undefined
    }
    return this.lightMessage.frames;
  }

  getClassName(frame: LightFrame) {
    let clsName = "frame"
    if (this.currentFrame == frame) {
      clsName += " active"
    }
    return clsName;
  }

  clickFrame(frame: LightFrame) {
//    this.currentFrame = frame;
    this.selectFrame.emit(frame);
  }

}
