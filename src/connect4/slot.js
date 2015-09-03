const emoji = require('node-emoji');

const ColourEnum = require('../../src/connect4/colourEnum');

class Slot {

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.empty = true;
        this.symbol = emoji.get('white_circle');
    }

    play(colour) {
        this.empty = false;
        this.symbol = colour === ColourEnum.RED ? emoji.get('red_circle') : emoji.get('large_blue_circle');
    }

    toString() {
        return this.symbol + ' ';
    }
}

module.exports = Slot;