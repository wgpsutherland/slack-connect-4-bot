const emoji = require('node-emoji');

const Slot = require('./slot');

const WIDTH = 7;
const HEIGHT = 6;

class Board {

    constructor() {
        this.slots = initialiseSlots();
    }

    getCounterAt(row, col) {
        return this.slots[row][col];
    }

    toString() {
        var display = "";
        for(let row of this.slots) {
            for(let slot of row) {
                display += slot.toString();
            }
            display += '\n';
        }
        var base = ':one: :two: :three: :four: :five: :six: :seven: ';
        display += emoji.emojify(base);
        return display;
    }
}

function initialiseSlots() {
    var rows = [];
    for (let i = 0; i < HEIGHT; i++) {
        let columns = [];
        for (let j = 0; j < WIDTH; j++) {
            columns.push(new Slot(i, j));
        }
        rows.push(columns);
    }
    return rows;
}

module.exports = Board;
