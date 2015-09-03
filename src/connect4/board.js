const _ = require('underscore');

const Slot = require('./slot');
const Emoji = require('./emoji');

const WIDTH = 7;
const HEIGHT = 6;

class Board {

    constructor() {
        this.slots = initialiseSlots();
    }

    getCounterAt(row, col) {
        return this.slots[row][col];
    }

    play(col, colour) {
        // finds the first empty slot in the column from the bottom up
        let slot = _.find(this.slots, (row) => {
            return row[col].empty;
        })[col];
        slot.play(colour);
        this.lastPlayedSlot = slot;
        return slot;
    }

    isColumnFull(col) {
        let topRow = this.slots[this.slots.length - 1];
        return !topRow[col].empty;
    }

    toString() {
        let display = "";
        for (let i = this.slots.length - 1; i >= 0; i--) { // so board prints in the correct orientation
            for (let slot of this.slots[i]) {
                display += slot.toString();
            }
            display += '\n';
        }
        for (let i = 1; i <= 7; i++) {
            display += Emoji.number[i] + ' ';
        }
        return display;
    }
}

function initialiseSlots() {
    let rows = [];
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
