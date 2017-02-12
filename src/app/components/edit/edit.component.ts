import { Component, OnInit } from '@angular/core';

import { LightMessageService } from '../../services/light-message.service'
import { LightMessage } from '../../models/light-message'
import { LightFrame } from '../../models/light-frame'

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
    this.lightMessageService.loadLatest()
      .subscribe(
        msg => { 
          this.lightMessage = msg
          this.currentFrame = this.lightMessage.frames[0]
        }        
      )
  }

  selectFrame(frame: LightFrame) {
    this.currentFrame = frame;
  }


  saveLightMessage() {
    this.lightMessageService.save(this.lightMessage)
      .subscribe(
          id => {
            this.lightMessage["_id"] = id
          }
      )
  }


}
