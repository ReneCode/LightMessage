import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { LightMessage, LightFrame } from '../light-message'


@Component({
  selector: 'app-frame-control',
  templateUrl: './frame-control.component.html',
  styleUrls: ['./frame-control.component.scss']
})
export class FrameControlComponent implements OnInit {

  @Input('lightmessage') lightMesage: LightMessage
  @Output('selectFrame') selectFrame = new EventEmitter<LightFrame>();

  constructor() { }

  ngOnInit() {
  }


  isEnable(btn) {
  }

  getStatus() {
    if (this.lightMesage) {
      return this.lightMesage.getStatus();
    }
    return '';
  }

  onNew() {
    this.lightMesage.copyFrame()
  }

  onDelete() {
    this.lightMesage.deleteFrame()
  }

  
}
