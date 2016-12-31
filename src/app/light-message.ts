export class LightMessage {


    username = undefined
    _id = undefined
    name = 'msg-1'
    currentFrame = 0
    size_x
    size_y
    frames = []


    constructor(size_x, size_y) {
        this.size_x = size_x;
        this.size_y = size_y
        this.frames = [this.newFrame()];
        this.currentFrame = 0;
    }

    static createFromJson(obj): LightMessage {
        let {size_x, size_y} = obj;
        let lm: LightMessage
        if (size_x && size_y) {
            lm = new LightMessage(size_x, size_y);
            lm.username = obj.username;
            lm.name = obj.name;
            lm.currentFrame = obj.currentFrame || 0
            lm.frames = JSON.parse(JSON.stringify(obj.frames))
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
        return {
            leds: leds
        }
    }

    nextFrame() {
        if (this.currentFrame < this.frames.length - 1) {
            this.currentFrame++;
            return true;
        } else {
            return false;
        }
    }


    previousFrame() {
        console.log(this)
        if (this.currentFrame > 0) {
            this.currentFrame--;
            return true;
        } else {
            return false;
        }
    }


    deleteFrame() {
        if (this.frames.length > 1) {
            console.log('### A', this.frames);
            this.frames.splice(this.currentFrame, 1);
            console.log('### B', this.frames);
            if (this.currentFrame >= this.frames.length) {
                this.currentFrame--
            }
            return true;
        } else {
            return false;
        }
    }

    copyFrame() {
        // copy current Frame after the current frame
        let newFrame = JSON.parse(JSON.stringify( this.frames[ this.currentFrame ] ));
        this.frames.splice(this.currentFrame+1, 0, newFrame)
        this.currentFrame++
    }

    private ledIndex(x, y) {
        if (x >= 0 && x < this.size_x && y >= 0 && y < this.size_y) {
            return x + y * this.size_x;
        } else {
            return 0;
        }
    }

    getColor(x, y) {
        let idx = this.ledIndex(x, y)
        let idxFrame = this.currentFrame;
        let frame = this.frames[idxFrame];
        return frame.leds[idx];
    }


    setColor(x, y, color) {
        let idx = this.ledIndex(x, y)
        let idxFrame = this.currentFrame;
        let frame = this.frames[idxFrame];
        frame.leds[idx] = color;
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
