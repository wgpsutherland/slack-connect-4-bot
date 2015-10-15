const ColourEnum = require('./colourEnum');
const Emoji = require('./emoji');

class Slot {

    constructor(row, col, gameType) {
        this.row = row;
        this.col = col;
        this.gameType = gameType;
        this.empty = true;
        this.symbol = Emoji[this.gameType].circle.white;
    }

    play(colour) {
        this.empty = false;
        this.colour = colour;
        this.symbol = Emoji[this.gameType].circle[this.colour];
    }

    toString() {
        return this.symbol;
    }
}

module.exports = Slot;