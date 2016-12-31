import { Component, Input, OnInit } from '@angular/core';

import { LightMessage } from '../light-message'


@Component({
  selector: 'app-frame-control',
  templateUrl: './frame-control.component.html',
  styleUrls: ['./frame-control.component.scss']
})
export class FrameControlComponent implements OnInit {

  @Input('lightmessage') lightMesage: LightMessage
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

  onNext() {
    this.lightMesage.nextFrame()
  }

  onPrevious() {
    this.lightMesage.previousFrame()

  }
  
}
