const _ = require('underscore');

const Slot = require('./slot');
const Emoji = require('./emoji');
const BoardStringGenerator = require('./boardStringGenerator');

const WIDTH = 7;
const HEIGHT = 6;

class Board {

    constructor(gameType) {
        this.gameType = gameType;
        this.slots = this.initialiseSlots();
        this.gameWon = false;
        this.bsg = new BoardStringGenerator(this.slots, WIDTH, HEIGHT);
    }

    static get width() {
        return WIDTH;
    }

    static get height() {
        return HEIGHT;
    }

    static validColumn(col) {
        return col < Board.width && col >= 0;
    }

    getCounterAt(row, col) {
        return this.slots[row][col];
    }

    play(col, colour) {
        // finds the first empty slot in the column from the bottom up
        this.lastPlayedSlot = _.find(this.slots, (row) => {
            return row[col].empty;
        })[col];
        this.lastPlayedSlot.play(colour);
        this.gameWon = this.checkWon();
        return this.lastPlayedSlot;
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

    /**
     * Checks whether the counter just played was a winning move for that player.
     * Only looks at the winning positions the most recent counter is in, and only checks if the player
     * that just played has won, not both players.
     * @returns {boolean}
     */
    checkWon() {
        return this.bsg.checkWon(this.lastPlayedSlot);
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
            display += Emoji.number[i];
        }
        return display;
    }

    initialiseSlots() {
        return _.map(new Array(HEIGHT), (a, i) => {
            return _.map(new Array(WIDTH), (b, j) => {
                return new Slot(i, j, this.gameType);
            }, this);
        }, this);
    }
}

module.exports = Board;
