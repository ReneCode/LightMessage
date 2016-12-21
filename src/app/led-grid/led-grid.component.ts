import { Component, OnInit } from '@angular/core';
import { LedControlService } from '../led-control.service'
import { LightMessageService } from '../light-message.service'

@Component({
  selector: 'app-led-grid',
  templateUrl: './led-grid.component.html',
  styleUrls: ['./led-grid.component.scss']
})
export class LedGridComponent implements OnInit {

  leds = [];

  lightMessage = {
    sequence: {
      leds:[] 
    }
  };
  SIZE = 4;

  constructor(private ledControlService: LedControlService,
              private lightMessageService: LightMessageService) {
  }


  showLeds() {
    if (!this.validLightMessage(this.lightMessage)) {
      this.clearLeds()
    }
  }

  clearLeds() {
    let offColor = this.ledControlService.getOffColor();
    let leds = [];
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
      leds.push(row);
    }
    this.lightMessage.sequence.leds = [ leds ];
  }


   validLightMessage(msg) {
     if (!msg) {
       return false;
     }
     if (!msg.sequence) {
       return false;
     }
     if (!msg.sequence.leds) {
       return false;
     }
     let leds = msg.sequence.leds;
     if (!Array.isArray(leds)) {
       return false;
     }
     if (!Array.isArray(leds[0])) {
       return false;
     }
     return true;
   }

  ngOnInit() {
    this.lightMessageService.loadLatest( (msg) => {
      if (this.validLightMessage(msg)) {
        this.lightMessage = msg;
      } else {
        this.clearLeds();
      }
      this.showLedFrame(0);
    })
  }

  showLedFrame(frameIndex) {
    this.leds = this.lightMessage.sequence.leds[frameIndex];
    console.log(this.leds)
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
    this.lightMessageService.save(this.lightMessage, id => {
      this.lightMessage["_id"] = id;
    });
  }


}
