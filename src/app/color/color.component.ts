import { Component, OnInit } from '@angular/core';
import { LedControlService } from '../led-control.service'

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

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
