const _ = require('underscore');

const Slot = require('./slot');
const Emoji = require('./emoji');
const BoardStringGenerator = require('./boardStringGenerator');

const WIDTH = 7;
const HEIGHT = 6;

class Board {

    constructor() {
        this.slots = initialiseSlots();
        this.gameWon = false;
        this.bsg = new BoardStringGenerator(this.slots, WIDTH, HEIGHT);
    }

    static get width() {
        return WIDTH;
    }

    static get height() {
        return HEIGHT;
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
        this.checkWon();
        return slot;
    }

    isColumnFull(col) {
        let topRow = this.slots[this.slots.length - 1];
        return !topRow[col].empty;
    }

    isBoardFull() {
        let topRow = this.slots[this.slots.length - 1];
        return _.every(topRow, (slot) => {
            return !slot.empty;
        });
    }

    checkWon() {

        let winString = this.lastPlayedSlot.symbol.repeat(4);

        let hString = this.bsg.genHorizontalString(this.lastPlayedSlot);
        let vString = this.bsg.genVerticalString(this.lastPlayedSlot);
        let rdString = this.bsg.genRightDiagString(this.lastPlayedSlot);
        let ldString = this.bsg.genLeftDiagString(this.lastPlayedSlot);

        if(hString.includes(winString)) this.gameWon = true;
        if(vString.includes(winString)) this.gameWon = true;
        if(rdString.includes(winString)) this.gameWon = true;
        if(ldString.includes(winString)) this.gameWon = true;
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
    return _.map(new Array(HEIGHT), (a, i) => {
        return _.map(new Array(WIDTH), (b, j) => {
            return new Slot(i, j)
        });
    });
}

module.exports = Board;
