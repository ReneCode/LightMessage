export class LightFrame {
    leds = []
    idx: number = 0

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