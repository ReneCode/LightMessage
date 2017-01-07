
export class LightFrame {
    leds = []

    constructor(private size_x: number, private size_y: number, leds) {
        this.leds = leds
    }

    get sizeX() {
        return this.size_x
    }

    get sizeY() {
        return this.size_y
    }

    private ledIndex(x: number, y) {
        if (x >= 0 && x < this.sizeX && y >= 0 && y < this.sizeY) {
            return x + y * this.sizeX;
        } else {
            return 0;
        }
    }

    getColor(x: number, y: number) {
        let idx = this.ledIndex(x, y)
        return this.leds[idx];

    }

    setColor(x: number, y: number, color: string) {
        let idx = this.ledIndex(x, y)
        this.leds[idx] = color;
    }



}

export class LightMessage {


    username = undefined
    _id = undefined
    name: string = 'msg-1'
    private currentFrameIdx: number = 0
    size_x: number
    size_y: number
    frames = []


    constructor(size_x, size_y) {
        this.size_x = size_x;
        this.size_y = size_y
        this.frames = [];
        this.currentFrameIdx = 0;
    }

    static createFromJson(obj): LightMessage {
        let {size_x, size_y} = obj;
        let lm: LightMessage
        if (size_x && size_y) {
            lm = new LightMessage(size_x, size_y);
            lm.username = obj.username;
            lm.name = obj.name;
            lm.currentFrameIdx = obj.currentFrame || 0
            for (let jsonFrame of obj.frames) {
                lm.frames.push( new LightFrame(size_x, size_y, jsonFrame.leds))
            }
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

    nextFrame() {
        if (this.currentFrameIdx < this.frames.length - 1) {
            this.currentFrameIdx++;
            return true;
        } else {
            return false;
        }
    }


    previousFrame() {
        if (this.currentFrameIdx > 0) {
            this.currentFrameIdx--;
            return true;
        } else {
            return false;
        }
    }


    deleteFrame() {
        if (this.frames.length > 1) {
            this.frames.splice(this.currentFrameIdx, 1);
            if (this.currentFrameIdx >= this.frames.length) {
                this.currentFrameIdx--
            }
            return true;
        } else {
            return false;
        }
    }

    copyFrame() {
        // copy current Frame after the current frame

        let curFrame = this.frames[ this.currentFrameIdx ]
        let copyLeds = JSON.parse(JSON.stringify(curFrame.leds))
        let newFrame = new LightFrame(this.size_x, this.size_y, copyLeds);
        this.frames.splice(this.currentFrameIdx+1, 0, newFrame)
        this.currentFrameIdx++
    }


    // currentFrame() {
    //     let currentFrame = this.frames[ this.currentFrame ].leds ));
    // }

    getStatus() {
        return `${this.currentFrameIdx+1} / ${this.frames.length}`
    }

    getColor(x, y) {
        let idxFrame = this.currentFrameIdx;
        let frame = this.frames[idxFrame];
        return frame.getColor(x,y);
    }


    setColor(x, y, color) {
        let idxFrame = this.currentFrameIdx;
        let frame = this.frames[idxFrame];
        frame.setColor(x,y,color);
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
