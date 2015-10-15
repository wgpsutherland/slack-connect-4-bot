//==================== NODE MODULES ====================//

const chai = require('chai');
const expect = chai.expect;

const _ = require('underscore');

//==================== CONSTANTS =======================//

const Board = require('../../src/connect4/board');
const ColourEnum = require('../../src/connect4/colourEnum');
const Emoji = require('../../src/connect4/emoji');
const GameTypeEnum = require('../../src/connect4/gameTypeEnum');

//==================== TEST ============================//

describe('connect 4', ()  => {

    describe('board', () => {

        let board;

        beforeEach(() => {
            board = new Board(GameTypeEnum.NORMAL);
        });

        describe('static methods', () => {

            it('should have a height of 6', () => {
                expect(Board.height).to.equal(6);
            });

            it('should have a width of 7', () => {
                expect(Board.width).to.equal(7);
            });
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
                        expect(slot.symbol).to.equal(Emoji[board.gameType].circle.white);
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

            it('should change gameWon to true if the game is won by playing that turn', () => {
                expect(board.gameWon).to.be.false;
                board.play(0, ColourEnum.RED);
                board.play(0, ColourEnum.RED);
                board.play(0, ColourEnum.RED);
                board.play(0, ColourEnum.RED);
                expect(board.gameWon).to.be.true;
            });
        });

        describe('getCounterAt', () => {
            it('should return the correct counter', () => {
                let row = 0;
                let col = 0;
                expect(board.getCounterAt(row, col)).to.equal(board.slots[row][col]);
            });
        });

        describe('isColumnFull', () => {

            it('should return false when the column is not full', () => {
                let col = 0;
                expect(board.isColumnFull(col)).to.be.false;
                _.times(5, () => {
                    board.play(col, ColourEnum.RED);
                });
                expect(board.isColumnFull(col)).to.be.false;
            });

            it('should return true when the column is full', () => {
                let col = 0;
                _.times(6, () => {
                    board.play(col, ColourEnum.RED);
                });
                expect(board.isColumnFull(col)).to.be.true;
            });
        });

        describe('isBoardFull', () => {

            it('should return false when the board is not full', () => {
                expect(board.isBoardFull()).to.be.false;
                // fill all columns but the last
                _.times(6, (i) => {
                    _.times(6, () => {
                        board.play(i, ColourEnum.RED);
                    });
                });
                // final column leave one space at the top
                _.times(5, () => {
                    board.play(6, ColourEnum.RED);
                });
                expect(board.isBoardFull()).to.be.false;
            });

            it('should return true when the board is full', () => {
                _.times(7, (i) => {
                    _.times(6, () => {
                        board.play(i, ColourEnum.RED);
                    });
                });
                expect(board.isBoardFull()).to.be.true;
            });
        });

        describe('checkWon', () => {

            describe('winning horizontally', () => {

                it('should return true when a player wins', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . R R R R .
                     . . . . . . .
                     */
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.RED);
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(5, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins on the top row', () => {
                    /*
                     . R R R R . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     */
                    _.times(4, (i) => {
                        _.times(5, () => {
                            board.play(i + 1, ColourEnum.BLANK);
                        });
                    });
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins on the bottom row', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . R R R R . .
                     */
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the far left column', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     R R R R . . .
                     */
                    board.play(0, ColourEnum.RED);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the far right column', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . R R R R
                     */
                    board.play(3, ColourEnum.RED);
                    board.play(4, ColourEnum.RED);
                    board.play(5, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(6, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });
            });

            describe('winning vertically', () => {

                it('should return true when a player wins', () => {
                    /*
                     . . . . . . .
                     . . . R . . .
                     . . . R . . .
                     . . . R . . .
                     . . . R . . .
                     . . . . . . .
                     */
                    let col = 3;
                    board.play(col, ColourEnum.BLANK);
                    _.times(3, () => {
                        board.play(col, ColourEnum.RED);
                    });
                    expect(board.gameWon).to.be.false;
                    board.play(col, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins on the top row', () => {
                    /*
                     . . . R . . .
                     . . . R . . .
                     . . . R . . .
                     . . . R . . .
                     . . . . . . .
                     . . . . . . .
                     */
                    let col = 3;
                    board.play(col, ColourEnum.BLANK);
                    board.play(col, ColourEnum.BLANK);
                    _.times(3, () => {
                        board.play(col, ColourEnum.RED);
                    });
                    expect(board.gameWon).to.be.false;
                    board.play(col, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins on the bottom row', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . R . . .
                     . . . R . . .
                     . . . R . . .
                     . . . R . . .
                     */
                    let col = 3;
                    _.times(3, () => {
                        board.play(col, ColourEnum.RED);
                    });
                    expect(board.gameWon).to.be.false;
                    board.play(col, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the far left column', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     R . . . . . .
                     R . . . . . .
                     R . . . . . .
                     R . . . . . .
                     */
                    let col = 0;
                    _.times(3, () => {
                        board.play(col, ColourEnum.RED);
                    });
                    expect(board.gameWon).to.be.false;
                    board.play(col, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the far right column', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . . . . R
                     . . . . . . R
                     . . . . . . R
                     . . . . . . R
                     */
                    let col = 6;
                    _.times(3, () => {
                        board.play(col, ColourEnum.RED);
                    });
                    expect(board.gameWon).to.be.false;
                    board.play(col, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });
            });

            describe('winning diagonally up', () => {

                it('should return true when a player wins', () => {
                    /*
                     . . . . . . .
                     . . . . . R .
                     . . . . R . .
                     . . . R . . .
                     . . R . . . .
                     . . . . . . .
                     */
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.RED);
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(5, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins from the bottom left corner', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . R . . .
                     . . R . . . .
                     . R . . . . .
                     R . . . . . .
                     */
                    board.play(1, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(0, ColourEnum.RED);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins from the top right corner', () => {
                    /*
                     . . . . . . R
                     . . . . . R .
                     . . . . R . .
                     . . . R . . .
                     . . . . . . .
                     . . . . . . .
                     */
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(6, ColourEnum.BLANK);
                    board.play(6, ColourEnum.BLANK);
                    board.play(6, ColourEnum.BLANK);
                    board.play(6, ColourEnum.BLANK);
                    board.play(6, ColourEnum.BLANK);
                    board.play(3, ColourEnum.RED);
                    board.play(4, ColourEnum.RED);
                    board.play(5, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(6, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the top', () => {
                    /*
                     . . . . R . .
                     . . . R . . .
                     . . R . . . .
                     . R . . . . .
                     . . . . . . .
                     . . . . . . .
                     */
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the bottom', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . . R . .
                     . . . R . . .
                     . . R . . . .
                     . R . . . . .
                     */
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the far left column', () => {
                    /*
                     . . . . . . .
                     . . . R . . .
                     . . R . . . .
                     . R . . . . .
                     R . . . . . .
                     . . . . . . .
                     */
                    board.play(0, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(0, ColourEnum.RED);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the far right column', () => {
                    /*
                     . . . . . . .
                     . . . . . . R
                     . . . . . R .
                     . . . . R . .
                     . . . R . . .
                     . . . . . . .
                     */
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(6, ColourEnum.BLANK);
                    board.play(6, ColourEnum.BLANK);
                    board.play(6, ColourEnum.BLANK);
                    board.play(6, ColourEnum.BLANK);
                    board.play(3, ColourEnum.RED);
                    board.play(4, ColourEnum.RED);
                    board.play(5, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(6, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });
            });

            describe('winning diagonally down', () => {

                it('should return true when a player wins', () => {
                    /*
                     . . . . . . .
                     . . R . . . .
                     . . . R . . .
                     . . . . R . .
                     . . . . . R .
                     . . . . . . .
                     */
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.RED);
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(5, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins from the bottom right corner', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . R . . .
                     . . . . R . .
                     . . . . . R .
                     . . . . . . R
                     */
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(3, ColourEnum.RED);
                    board.play(4, ColourEnum.RED);
                    board.play(5, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(6, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins from the top left corner', () => {
                    /*
                     R . . . . . .
                     . R . . . . .
                     . . R . . . .
                     . . . R . . .
                     . . . . . . .
                     . . . . . . .
                     */
                    board.play(0, ColourEnum.BLANK);
                    board.play(0, ColourEnum.BLANK);
                    board.play(0, ColourEnum.BLANK);
                    board.play(0, ColourEnum.BLANK);
                    board.play(0, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(0, ColourEnum.RED);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the top', () => {
                    /*
                     . R . . . . .
                     . . R . . . .
                     . . . R . . .
                     . . . . R . .
                     . . . . . . .
                     . . . . . . .
                     */
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the bottom', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . R . . . . .
                     . . R . . . .
                     . . . R . . .
                     . . . . R . .
                     */
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the far left column', () => {
                    /*
                     . . . . . . .
                     R . . . . . .
                     . R . . . . .
                     . . R . . . .
                     . . . R . . .
                     . . . . . . .
                     */
                    board.play(0, ColourEnum.BLANK);
                    board.play(0, ColourEnum.BLANK);
                    board.play(0, ColourEnum.BLANK);
                    board.play(0, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(0, ColourEnum.RED);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(3, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });

                it('should return true when a player wins against the far right column', () => {
                    /*
                     . . . . . . .
                     . . . R . . .
                     . . . . R . .
                     . . . . . R .
                     . . . . . . R
                     . . . . . . .
                     */
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(5, ColourEnum.BLANK);
                    board.play(6, ColourEnum.BLANK);
                    board.play(3, ColourEnum.RED);
                    board.play(4, ColourEnum.RED);
                    board.play(5, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                    board.play(6, ColourEnum.RED);
                    expect(board.gameWon).to.be.true;
                });
            });

            describe('four in a row but not the same colour', () => {

                it('should return false horizontal', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . . . . . . .
                     . R R B R . .
                     */
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.BLUE);
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                });

                it('should return false vertical', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . . . . R
                     . . . . . . B
                     . . . . . . R
                     . . . . . . R
                     */
                    let col = 6;
                    board.play(col, ColourEnum.RED);
                    board.play(col, ColourEnum.RED);
                    board.play(col, ColourEnum.BLUE);
                    board.play(col, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                });

                it('should return false up diagonal', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . . . . R . .
                     . . . B . . .
                     . . R . . . .
                     . R . . . . .
                     */
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(4, ColourEnum.BLANK);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.BLUE);
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                });

                it('should return false down diagonal', () => {
                    /*
                     . . . . . . .
                     . . . . . . .
                     . R . . . . .
                     . . R . . . .
                     . . . B . . .
                     . . . . R . .
                     */
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(1, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(2, ColourEnum.BLANK);
                    board.play(3, ColourEnum.BLANK);
                    board.play(1, ColourEnum.RED);
                    board.play(2, ColourEnum.RED);
                    board.play(3, ColourEnum.BLUE);
                    board.play(4, ColourEnum.RED);
                    expect(board.gameWon).to.be.false;
                });
            });
        });

        describe('toString', () => {

        });
    });
});
