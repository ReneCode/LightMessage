import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LightMessage, LightFrame } from '../light-message'

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
