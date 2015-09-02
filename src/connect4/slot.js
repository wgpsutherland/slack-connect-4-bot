const emoji = require('node-emoji');

class Slot {

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.empty = true;
        this.symbol = emoji.get('white_circle');
    }

    play(colour) {
        this.empty = false;
        this.symbol = colour === 'red' ? emoji.get('red_circle') : emoji.get('large_blue_circle');
    }

    toString() {
        return this.symbol + ' ';
    }
}

module.exports = Slot;