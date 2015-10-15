//==================== NODE MODULES ====================//

const chai = require('chai');
const expect = chai.expect;

//==================== CONSTANTS =======================//

const Slot = require('../../src/connect4/slot');
const ColourEnum = require('../../src/connect4/colourEnum');
const Emoji = require('../../src/connect4/emoji');
const GameTypeEnum = require('../../src/connect4/gameTypeEnum');

//==================== TEST ============================//

describe('connect 4', ()  => {

    describe('slot', () => {

        let slot;

        beforeEach(() => {
            slot = new Slot(0, 1, GameTypeEnum.NORMAL);
        });

        describe('on initialisation', () => {

            it('should have the given row as its row', () => {
                expect(slot.row).to.equal(0);
            });

            it('should have the given col as its col', () => {
                expect(slot.col).to.equal(1);
            });

            it('should be empty', () => {
                expect(slot.empty).to.be.true;
            });

            it('should not have a colour', () => {
                expect(slot.colour).to.be.undefined;
            });

            it('should have the white_circle emoji as its symbol', () => {
                expect(slot.symbol).to.equal(Emoji[GameTypeEnum.NORMAL].circle.white);
            });
        });

        describe('play', () => {

            it('should not be empty', () => {
                slot.play(ColourEnum.RED);
                expect(slot.empty).to.be.false;
            });

            it('should have the red_circle emoji as its symbol when the player is red', () => {
                slot.play(ColourEnum.RED);
                expect(slot.symbol).to.equal(Emoji[GameTypeEnum.NORMAL].circle.red);
            });

            it('should have a colour of red when the player is red', () => {
                slot.play(ColourEnum.RED);
                expect(slot.colour).to.equal(ColourEnum.RED);
            });

            it('should have the large_blue_circle emoji as its symbol when the player is blue', () => {
                slot.play(ColourEnum.BLUE);
                expect(slot.symbol).to.equal(Emoji[GameTypeEnum.NORMAL].circle.blue);
            });

            it('should have a colour of blue when the player is blue', () => {
                slot.play(ColourEnum.BLUE);
                expect(slot.colour).to.equal(ColourEnum.BLUE);
            });
        });

        describe('toString', () => {

            it('should be the white_circle emoji when empty', () => {
                expect(slot.toString()).to.equal(Emoji[GameTypeEnum.NORMAL].circle.white);
            });

            it('should be the red_circle emoji when red is played', () => {
                slot.play(ColourEnum.RED);
                expect(slot.toString()).to.equal(Emoji[GameTypeEnum.NORMAL].circle.red);
            });

            it('should be the large_blue_circle emoji when blue is played', () => {
                slot.play(ColourEnum.BLUE);
                expect(slot.toString()).to.equal(Emoji[GameTypeEnum.NORMAL].circle.blue);
            });
        });
    });
});