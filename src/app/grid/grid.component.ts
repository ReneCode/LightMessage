import { Component, Input, OnInit } from '@angular/core';
import { LedControlService } from '../led-control.service'
import { LightMessageService } from '../light-message.service'
import { LightFrame } from '../light-message'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})




export class GridComponent implements OnInit {

  // leds = [];
  xIndex = [];
  yIndex = [];

  @Input('currentFrame') frame: LightFrame


  constructor(private ledControlService: LedControlService,
    private lightMessageService: LightMessageService) {
    for (let i = 0; i < lightMessageService.SIZE_X; i++) {
      this.xIndex.push(i);
    }
    for (let i = 0; i < lightMessageService.SIZE_Y; i++) {
      this.yIndex.push(i);
    }
  }



  ngOnInit() {
  }

  getCellClass() {
    return "edit-cell";
  }

  getColor(x, y) {
    if (this.frame) {
      return this.frame.getColor(x, y)
    } else {
      return 0;
    }

  }

  switchLed(x, y) {
    let newColor = this.ledControlService.getColor();
    let currentColor = this.frame.getColor(x, y);
    if (currentColor == newColor) {
      newColor = '#000'
    }
    this.frame.setColor(x, y, newColor)

  }


}
