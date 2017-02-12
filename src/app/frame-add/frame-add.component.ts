import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LightMessage } from '../models/light-message'
import { LightFrame } from '../models/light-frame'

@Component({
  selector: 'app-frame-add',
  templateUrl: './frame-add.component.html',
  styleUrls: ['./frame-add.component.scss']
})
export class FrameAddComponent implements OnInit {

  @Input('lightMessage') lightMessage: LightMessage
  @Input('currentFrame') currentFrame: LightFrame
  @Output('selectFrame') selectFrame = new EventEmitter<LightFrame>();

  constructor() { }

  ngOnInit() {
  }

  onNew() {
    let newFrame = this.lightMessage.copyFrame(this.currentFrame);
    this.selectFrame.emit(newFrame);
  }


}
