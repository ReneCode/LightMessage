import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LightMessage } from '../models/light-message'
import { LightFrame } from '../models/light-frame'

@Component({
  selector: 'app-frame-delete',
  templateUrl: './frame-delete.component.html',
  styleUrls: ['./frame-delete.component.scss']
})
export class FrameDeleteComponent implements OnInit {
  @Input('lightMessage') lightMessage: LightMessage
  @Input('currentFrame') currentFrame: LightFrame
  @Output('selectFrame') selectFrame = new EventEmitter<LightFrame>();

  constructor() { }

  ngOnInit() {
  }

  onDelete() {
    let newCurrentFrame = this.lightMessage.deleteFrame(this.currentFrame)
    if (newCurrentFrame) {
      this.selectFrame.emit(newCurrentFrame)
    }
  }

}
