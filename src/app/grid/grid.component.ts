import { Component, OnInit } from '@angular/core';
import { LedControlService } from '../led-control.service'
import { LightMessageService } from '../light-message.service'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})




export class GridComponent implements OnInit {

  // leds = [];
  xIndex = [];
  yIndex = [];

  SIZE = 4;

  lightMessage = {
    username: undefined,
    _id: undefined,
    name: 'msg-1',
    currentFrame: 0,
    size_x: this.SIZE,
    size_y: this.SIZE,
    frames: []
  };

  constructor(private ledControlService: LedControlService,
              private lightMessageService: LightMessageService) {
    for (let i=0; i<this.SIZE; i++) {
      this.xIndex.push(i);
      this.yIndex.push(i);
    }
  }

  ledIndex(x,y) {
    return x + y*this.lightMessage.size_x;
  }

  getColor(x,y) {
    let idx = this.ledIndex(x,y)
    let idxFrame = this.lightMessage.currentFrame;
    let frame = this.lightMessage.frames[idxFrame];
    return frame.leds[idx];
  }


  setColor(x,y,color) {
    let idx = this.ledIndex(x,y)
    let idxFrame = this.lightMessage.currentFrame;
    let frame = this.lightMessage.frames[idxFrame];
    frame.leds[idx] = color;
  }


  newFrame() {
    let offColor = this.ledControlService.getOffColor();
    let leds = [];
    for (let i=0; i<this.SIZE; i++) {
      for (let j=0; j<this.SIZE; j++) {
        leds.push( offColor );
      }
    }
    return {
      leds: leds
    }
  }

  initMessage() {
    this.lightMessage.frames = [ this.newFrame() ];
    this.lightMessage.currentFrame = 0;
  }


   validLightMessage(msg) {
     if (!msg) {
       return false;
     }
     if (!msg.frames) {
       return false;
     }
     if (!Array.isArray(msg.frames)) {
       return false;
     }
     if (msg.frames.length === 0) {
       return false;
     }
     if (!msg.frames[0].leds) {
       return false;
     }
     if (!Array.isArray(msg.frames[0].leds)) {
       return false;
     }
     return true;
   }

  ngOnInit() {
    this.initMessage();
    this.lightMessageService.loadLatest( (msg) => {
      if (this.validLightMessage(msg)) {
        this.lightMessage = JSON.parse(JSON.stringify(msg));
        // make currentFrame valid
        this.lightMessage.currentFrame = this.lightMessage.currentFrame || 0 
      }
    }) 
  }



  switchLed(x,y) {
    let newColor = this.ledControlService.getColor();
    let currentColor = this.getColor(x,y);
    if (currentColor == newColor) {
      newColor = '#000'
    }
    this.setColor(x,y,newColor)
    
  }

  save() {
    this.lightMessageService.save(this.lightMessage, id => {
      this.lightMessage["_id"] = id;
    });
  }


}
