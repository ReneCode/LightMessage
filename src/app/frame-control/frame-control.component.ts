import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { LightMessage } from '../models/light-message'
import { LightFrame } from '../models/light-frame'


@Component({
  selector: 'app-frame-control',
  templateUrl: './frame-control.component.html',
  styleUrls: ['./frame-control.component.scss']
})
export class FrameControlComponent implements OnInit {

  @Input('lightMessage') lightMessage: LightMessage
  @Input('currentFrame') currentFrame: LightFrame
  @Output('selectFrame') selectFrame = new EventEmitter<LightFrame>();

  constructor() { }

  ngOnInit() {
  }


  isEnable(btn) {
  }

  // getStatus() {
  //   if (this.lightMesage) {
  //     return this.lightMesage.getStatus();
  //   }
  //   return '';
  // }

  onPreviousFrame() {

    let previousFrame = this.lightMessage.getPreviousFrame(this.currentFrame) 
    if (previousFrame) {
      this.onSelectFrame(previousFrame)
    }
  }

  onNextFrame() {
    let nextFrame = this.lightMessage.getNextFrame(this.currentFrame)
    if (nextFrame) {
      this.onSelectFrame(nextFrame)
    }
  }

  onSelectFrame(frame: LightFrame) {
    this.selectFrame.emit(frame)
  }
}
