//==================== NODE MODULES ====================//

const chai = require('chai');
const expect = chai.expect;

//==================== CONSTANTS =======================//

const Board = require('../../src/connect4/board');
const ColourEnum = require('../../src/connect4/colourEnum');
const Emoji = require('../../src/connect4/emoji');

//==================== TEST ============================//

describe('connect 4', ()  => {

    describe('board', () => {

        let board;

        beforeEach(() => {
            board = new Board();
        });

        describe('on initialisation', () => {

            it('the slots should all be empty', () => {
                for (let row of board.slots) {
                    for (let slot of row) {
                        expect(slot.empty).to.be.true;
                    }
                }
            });

            it('the slots should all have the white circle as their symbol', () => {
                for (let row of board.slots) {
                    for (let slot of row) {
                        expect(slot.symbol).to.equal(Emoji.circle.white);
                    }
                }
            });

            it('the slots should all have the correct row and col numbers', () => {
                for (let i = 0; i < board.slots.length; i++) {
                    let row = board.slots[i];
                    for (let j = 0; j < row.length; j++) {
                        let slot = row[j];
                        expect(slot.row).to.equal(i);
                        expect(slot.col).to.equal(j);
                    }
                }
            });

            it('the board should consist of 6 rows', () => {
                expect(board.slots.length).to.equal(6);
            });

            it('the board should consist of 7 columns', () => {
                for (let row of board.slots) {
                    expect(row.length).to.equal(7);
                }
            });
        });
    });
});
