
import { LightFrame } from './light-frame'

export class LightMessage {


    username = undefined
    _id = undefined
    name: string = 'msg-1'
    size_x: number
    size_y: number
    frames = []


    constructor(size_x, size_y) {
        this.size_x = size_x
        this.size_y = size_y
        // create at least on empty frame
        this.frames = [ this.newFrame() ]
    }

    static createFromJson(obj): LightMessage {
        let {size_x, size_y} = obj;
        let lm: LightMessage
        if (size_x && size_y) {
            lm = new LightMessage(size_x, size_y);
            lm.username = obj.username;
            lm.name = obj.name;
            // create the empty frame, if there are frames from the json-obj
            if (obj.frames.length > 0) {
                lm.frames = [];
            }
            for (let jsonFrame of obj.frames) {
                lm.frames.push(new LightFrame(size_x, size_y, jsonFrame.leds))
            }
            lm.reIndexFrames()
        }

        return lm;
    }

    private newFrame() {
        let offColor = 0;
        let leds = [];
        for (let i = 0; i < this.size_x; i++) {
            for (let j = 0; j < this.size_y; j++) {
                leds.push(offColor);
            }
        }
        return new LightFrame(this.size_x, this.size_y, leds);
    }


    deleteFrame(frame: LightFrame): LightFrame {
        if (this.frames.length <= 1) {
            // do not delete the last frame
            return null;
        }
        let currentIndex = frame.idx;
        this.frames.splice(currentIndex, 1);
        this.reIndexFrames();
        currentIndex = Math.min(currentIndex, this.frames.length-1)
        return this.frames[currentIndex];
    }

    copyFrame(frame: LightFrame): LightFrame {
        // copy current Frame behind the current frame
        let copyLeds = JSON.parse(JSON.stringify(frame.leds))
        let newFrame = new LightFrame(this.size_x, this.size_y, copyLeds);
        this.frames.splice(frame.idx+1, 0, newFrame)
        this.reIndexFrames();
        return newFrame;
    }


    private reIndexFrames() {
        let idx=0;
        this.frames.forEach( f => {
            f.idx = idx++;
        })
    }

     isCurrentFrame(frame: LightFrame) {
        return  frame == this.frames[1];
    }


    getPreviousFrame(frame: LightFrame) : LightFrame {
        if (frame.idx > 0) {
            return this.frames[frame.idx-1];
        }
        return null;
    }

    getNextFrame(frame: LightFrame) : LightFrame {
        if (frame.idx < this.frames.length-1) {
            return this.frames[frame.idx+1];
        }
        return null;
    }



    isValid() {
        if (!this.frames) {
            return false;
        }
        if (!Array.isArray(this.frames)) {
            return false;
        }
        if (this.frames.length === 0) {
            return false;
        }
        if (!this.frames[0].leds) {
            return false;
        }
        if (!Array.isArray(this.frames[0].leds)) {
            return false;
        }
        return true;
    }
}
