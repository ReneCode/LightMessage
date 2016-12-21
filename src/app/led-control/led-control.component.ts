import { Component, OnInit } from '@angular/core';
import { LedControlService } from '../led-control.service'

@Component({
  selector: 'app-led-control',
  templateUrl: './led-control.component.html',
  styleUrls: ['./led-control.component.scss']
})
export class LedControlComponent implements OnInit {

  colors = [ ];

  constructor(private ledControlService: LedControlService) {
    let activeColor = ledControlService.getColor();
    this.colors = ledControlService.getAvailiableColors().map( function(c) {
      return { value: c, active: activeColor === c}
    });
  }

  ngOnInit() {
  }

  pickColor(color) {
    this.ledControlService.setColor(color.value);
    this.colors = this.colors.map(function(c) {
      return { value: c.value, active: c.value === color.value}
    }); 
  }

}
