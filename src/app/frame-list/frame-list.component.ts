import { Component, EventEmitter, Output, Input } from '@angular/core';
import { LightMessage, LightFrame } from '../light-message'

@Component({
  selector: 'app-frame-list',
  templateUrl: './frame-list.component.html',
  styleUrls: ['./frame-list.component.scss']
})
export class FrameListComponent {

  @Input('lightmessage') lightMessage: LightMessage
  @Input('currentFrame') currentFrame: LightFrame
  @Output('selectFrame') selectFrame = new EventEmitter<LightFrame>();


  maxFrameCount = 5

  constructor() { }


  getFrames() {
    if (!this.lightMessage) {
      return null
    }

    let emptyFrame = new LightFrame(4,4,[])
    let maxFillCount = Math.floor(this.maxFrameCount/2)

    let frames = []

    let leftIdx = Math.max(0, this.currentFrame.idx - maxFillCount)
    let rightIdx = Math.min(this.lightMessage.frames.length-1, this.currentFrame.idx + maxFillCount)

    frames = this.lightMessage.frames.slice(leftIdx, rightIdx+1);

    // add empty frames left 
    if (this.currentFrame.idx - maxFillCount < 0) {
      let count = Math.abs(this.currentFrame.idx - maxFillCount)
      for (let i=0; i<count; i++) {
        frames.unshift( emptyFrame );
      }
    }

    // add emty frames right 
    if (this.lightMessage.frames.length-1 < this.currentFrame.idx + maxFillCount) {
      let count = Math.abs(this.lightMessage.frames.length-1 - (this.currentFrame.idx + maxFillCount) )
      for (let i=0; i<count; i++) {
        frames.push(emptyFrame)
      }
    }


    // let frameCount = 0;
    // for (let i=this.currentFrame.idx; i<fillLeftCount; i++, frameCount++) {
    //   frames.push( emptyFrame )
    // }
        
    // let showFrames = this.lightMessage.frames.slice()

    // frames = frames.concat(this.lightMessage.frames)
    return frames
  }

  getClassName(frame: LightFrame): string {
    let clsName = "frame"
    if (this.currentFrame == frame) {
      clsName += " active"
    }
    return clsName;
  }


  onSelectFrame(frame: LightFrame) {
    this.selectFrame.emit(frame);
  }

  onPreviousFrame() {
    let previousFrame = this.lightMessage.getPreviousFrame(this.currentFrame) 
    if (previousFrame) {
      this.selectFrame.emit(previousFrame)
    }
  }

  onNextFrame() {
    let nextFrame = this.lightMessage.getNextFrame(this.currentFrame)
    if (nextFrame) {
      this.selectFrame.emit(nextFrame)
    }
  }

}
