import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-led-control',
  templateUrl: './led-control.component.html',
  styleUrls: ['./led-control.component.sass']
})
export class LedControlComponent implements OnInit {

  colors = ["red", "green", "blue", "yellow"];

  constructor() {

   }

  ngOnInit() {
  }

  pickColor(color) {
    console.log(color);
  }

}
