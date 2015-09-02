const emoji = require('node-emoji');

class Slot {

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.empty = true;
        this.symbol = emoji.get('white_circle');
    }

    toString() {
        return this.symbol + ' ';
    }
}

module.exports = Slot;