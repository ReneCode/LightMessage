import { Component, OnInit } from '@angular/core';

import { LightMessageService } from '../light-message.service'
import { LightMessage } from '../light-message'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  lightMessage: LightMessage

  constructor(private lightMessageService: LightMessageService) { }

  ngOnInit() {
    this.lightMessageService.loadLatest((msg: LightMessage) => {

      if (msg && msg.isValid()) {
        this.lightMessage = msg;
      }
    })
    
  }

}
