const _ = require('underscore');

class BoardStringGenerator {

    constructor(slots, width, height) {
        this.slots = slots;
        this.width = width;
        this.height = height;
    }

    checkWon(counter) {
        let winString = counter.symbol.repeat(4);
        let potentialWinString = this.genPotentialWinString(counter);
        return potentialWinString.includes(winString);
    }

    genPotentialWinString(counter) {
        return [
            this.genHorizontalString(counter),
            this.genDownDiagString(counter),
            this.genVerticalString(counter),
            this.genUpDiagString(counter)
        ].join('-');
    }

    genHorizontalString(counter) {
        return _.map(this.slots[counter.row], (slot) => {
            return slot.symbol;
        }).join('');
    }

    genVerticalString(counter) {
        return _
            .chain(this.slots)
            .map((row) => {
                return row[counter.col];
            })
            .map((slot) => {
                return slot.symbol;
            })
            .value()
            .join('');
    }

    genUpDiagString(counter) {
        let col = counter.col;
        let row = counter.row;
        // finds the starting point in the bottom left quadrant
        while (col > 0 && row > 0) {
            col--;
            row--;
        }
        var returning = '';
        while (col < this.width && row < this.height) {
            returning += this.slots[row][col].symbol;
            col++;
            row++;
        }
        return returning;
    }

    genDownDiagString(counter) {
        let col = counter.col;
        let row = counter.row;
        // finds the starting point in the bottom right quadrant
        while (col < this.width - 1 && row > 0) {
            col++;
            row--;
        }
        var returning = '';
        while (col >= 0 && row < this.height) {
            returning += this.slots[row][col].symbol;
            col--;
            row++;
        }
        return returning;
    }
}

module.exports = BoardStringGenerator;
