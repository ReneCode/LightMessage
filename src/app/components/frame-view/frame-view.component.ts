import { Component, OnInit, Input } from '@angular/core';
import { LightMessage } from '../../models/light-message'
import { LightFrame } from '../../models/light-frame'

@Component({
  selector: 'app-frame-view',
  templateUrl: './frame-view.component.html',
  styleUrls: ['./frame-view.component.scss']
})
export class FrameViewComponent implements OnInit {

  @Input('frame') frame: LightFrame;

  constructor() { }

  ngOnInit() {
  }

  private range(start, end) {
    let range = [];
    for (let i=start; i<=end; i++) {
      range.push(i);
    }
    return range;
  }

  getRangeX() {
    // return this.range(0, this.frame.sizeX-1);
    return this.range(0,3)
  }

  getRangeY() {
    return this.range(0, this.frame.sizeY-1);
  }

  getCellClass() {
    return "cell"
  }

  getColor(x, y) {
    if (this.frame) {
      return this.frame.getColor(x, y)
    } else {
      return 0;
    }
  }

  clickCell(x,y) {
    
  }

}
