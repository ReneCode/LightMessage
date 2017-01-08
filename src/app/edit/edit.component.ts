import { Component, OnInit } from '@angular/core';

import { LightMessageService } from '../light-message.service'
import { LightMessage, LightFrame } from '../light-message'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  lightMessage: LightMessage
  currentFrame: LightFrame

  constructor(private lightMessageService: LightMessageService) { }

  ngOnInit() {
    this.lightMessageService.loadLatest((msg: LightMessage) => {

      if (msg && msg.isValid()) {
        this.lightMessage = msg;
        this.currentFrame = this.lightMessage.frames[0];
      }
    })
    
  }

  selectFrame(frame: LightFrame) {
    this.currentFrame = frame;
  }


  saveLightMessage() {
    this.lightMessageService.save(this.lightMessage, id => {
      this.lightMessage["_id"] = id;
    });
  }


}
