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

        //let col = this.lastPlayedSlot.col;
        //let row = this.lastPlayedSlot.row;
        let winString = this.lastPlayedSlot.symbol.repeat(4);

        let horizontalString = this.bsg.genHorizontalString(this.lastPlayedSlot);
        let verticalString = this.bsg.genVerticalString(this.lastPlayedSlot);
        let rightDiagString = this.bsg.genRightDiagString(this.lastPlayedSlot);
        let leftDiagString = this.bsg.genLeftDiagString(this.lastPlayedSlot);
        console.log('horizontal', horizontalString);
        console.log('vertical', verticalString);
        console.log('right diag', rightDiagString);
        console.log('left diag', leftDiagString);

        // check horizontal
        //create string of the horizontal board going through slot


        // check vertical
        // check diag right
        // check diag left


        //check the wins surrounding the last played slot
        this.gameWon = false; //result of check
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
