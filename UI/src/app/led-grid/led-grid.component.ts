import { Component, OnInit } from '@angular/core';
import { LedControlService } from '../led-control.service'
import { LightMessageService } from '../light-message.service'

@Component({
  selector: 'app-led-grid',
  templateUrl: './led-grid.component.html',
  styleUrls: ['./led-grid.component.scss']
//  providers: [LedControlService]
})
export class LedGridComponent implements OnInit {

  leds = [];
  SIZE = 4;

  constructor(private ledControlService: LedControlService,
              private lightMessageService: LightMessageService) {
    let offColor = ledControlService.getOffColor();
    for (let i=0; i<this.SIZE; i++) {
      let row = [];
      for (let j=0; j<this.SIZE; j++) {
        let cell = {
          x: i,
          y: j,
          color: offColor
        }
        row.push( cell );
      }
      this.leds.push(row);
    }
   }

  ngOnInit() {
  }

  switchLed(cell) {
    let newColor = this.ledControlService.getColor();
    if (cell.color == newColor) {
      cell.color = '#000'
    } else {
      cell.color = newColor;
    }
  }

  save() {
    this.lightMessageService.save(this.leds, function() {
      console.log("saved")
    });
  }


}
