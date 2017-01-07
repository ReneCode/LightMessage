import { Component, Input, OnInit } from '@angular/core';
import { LightMessage } from '../light-message'

@Component({
  selector: 'app-frame-list',
  templateUrl: './frame-list.component.html',
  styleUrls: ['./frame-list.component.scss']
})
export class FrameListComponent implements OnInit {

  @Input('lightmessage') lightMessage: LightMessage


  constructor() { }

  ngOnInit() {
  }

  getFrames() {
    if (!this.lightMessage) {
      return undefined
    }
    return this.lightMessage.frames;
  }

}
