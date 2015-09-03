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

        describe('play', () => {

            it('should fill the first free slot in the given column', () => {
                let col = 0;
                expect(board.getCounterAt(0, col).empty).to.be.true;
                let played = board.play(col, ColourEnum.RED);
                expect(played.empty).to.be.false;
                expect(board.getCounterAt(0, col).empty).to.be.false;

                col = 1;
                board.play(col, ColourEnum.RED);
                board.play(col, ColourEnum.RED);
                expect(board.getCounterAt(2, col).empty).to.be.true;
                played = board.play(col, ColourEnum.RED);
                expect(played.empty).to.be.false;
                expect(board.getCounterAt(2, col).empty).to.be.false;

                col = 2;
                played = board.play(col, ColourEnum.RED);
                expect(played.row).to.equal(0);
                played = board.play(col, ColourEnum.RED);
                expect(played.row).to.equal(1);
                played = board.play(col, ColourEnum.RED);
                expect(played.row).to.equal(2);
                played = board.play(col, ColourEnum.RED);
                expect(played.row).to.equal(3);
            });

            it('should make the played counter the colour given', () => {
                let colour = ColourEnum.RED;
                let col = 0;
                let played = board.play(col, colour);
                expect(played.colour).to.equal(colour);
            });

            it('should change the lastPlayedSlot to the slot just played', () => {
                let lastPlayed = board.play(0, ColourEnum.RED);
                expect(board.lastPlayedSlot).to.equal(lastPlayed);
                lastPlayed = board.play(0, ColourEnum.BLUE);
                expect(board.lastPlayedSlot).to.equal(lastPlayed);
            });

            it('should return the slot just played', () => {
                let played = board.play(0, ColourEnum.RED);
                expect(played.col).to.equal(0);
                expect(played.row).to.equal(0);
                board.play(0, ColourEnum.RED);
                board.play(0, ColourEnum.RED);
                played = board.play(0, ColourEnum.RED);
                expect(played.col).to.equal(0);
                expect(played.row).to.equal(3);
            });
        });

        describe('getCounterAt', () => {
            it('should return the correct counter', () => {
                let row = 0;
                let col = 0;
                expect(board.getCounterAt(row,col)).to.equal(board.slots[row][col]);
            });
        });

        describe('toString', () => {

        });
    });
});
