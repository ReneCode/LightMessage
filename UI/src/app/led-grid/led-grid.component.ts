import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-led-grid',
  templateUrl: './led-grid.component.html',
  styleUrls: ['./led-grid.component.sass']
})
export class LedGridComponent implements OnInit {

  leds = [];
  SIZE = 5;

  constructor() {
    for (let i=0; i<this.SIZE; i++) {
      let row = [];
      for (let j=0; j<this.SIZE; j++) {
        let value = Math.random() > 0.5 ? false : true;
        let cell = {
          x: i,
          y: j,
          value: value
        }
        row.push( cell );
      }
      this.leds.push(row);
    }
   }

  ngOnInit() {
  }

  switchLed(cell) {
    cell.value = !cell.value;
  }

}
