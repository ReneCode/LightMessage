import { Injectable } from '@angular/core';

@Injectable()
export class LedControlService {

  private color: string = '#fff';
  private availiableColors = [ '#000', '#fff', '#f00', '#ff0', '#f0f', '#0f0', '#0ff', '#00f'  ];
  private offColor = '#000';

  constructor() { }

  setColor(color:string) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  getAvailiableColors() {
    return this.availiableColors;
  }

  getOffColor() {
    return this.offColor;
  }

}
