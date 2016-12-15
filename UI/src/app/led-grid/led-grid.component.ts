import { Component, OnInit } from '@angular/core';
import { LedControlService } from '../led-control.service'

@Component({
  selector: 'app-led-grid',
  templateUrl: './led-grid.component.html',
  styleUrls: ['./led-grid.component.scss']
//  providers: [LedControlService]
})
export class LedGridComponent implements OnInit {

  leds = [];
  SIZE = 4;

  constructor(private ledControlService: LedControlService) {
    let offColor = ledControlService.getOffColor();
    for (let i=0; i<this.SIZE; i++) {
      let row = [];
      for (let j=0; j<this.SIZE; j++) {
        let value = Math.random() > 0.5 ? false : true;
        let cell = {
          x: i,
          y: j,
          value: value,
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

}
