//==================== NODE MODULES ====================//

const chai = require('chai');
const expect = chai.expect;

//==================== CONSTANTS =======================//

const Slot = require('../../src/connect4/slot');
const ColourEnum = require('../../src/connect4/colourEnum');
const Emoji = require('../../src/connect4/emoji');

//==================== TEST ============================//

describe('connect 4', ()  => {

    describe('slot', () => {

        let slot;

        beforeEach(() => {
            slot = new Slot(0, 1);
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

            it('should have the white_circle emoji as its symbol', () => {
                expect(slot.symbol).to.equal(Emoji.circle.white);
            });
        });

        describe('play', () => {

            it('should not be empty', () => {
                slot.play(ColourEnum.RED);
                expect(slot.empty).to.be.false;
            });

            it('should have the red_circle emoji as its symbol when the player is red', () => {
                slot.play(ColourEnum.RED);
                expect(slot.symbol).to.equal(Emoji.circle.red);
            });

            it('should have the large_blue_circle emoji as its symbol when the player is blue', () => {
                slot.play(ColourEnum.BLUE);
                expect(slot.symbol).to.equal(Emoji.circle.blue);
            });
        });

        describe('toString', () => {

            const emptySlotString = Emoji.circle.white + ' ';
            const redSlotString = Emoji.circle.red + ' ';
            const blueSlotString = Emoji.circle.blue + ' ';

            it('should be the white_circle emoji followed by a space when empty', () => {
                expect(slot.toString()).to.equal(emptySlotString);
            });

            it('should be the red_circle emoji followed by a space when red is played', () => {
                slot.play(ColourEnum.RED);
                expect(slot.toString()).to.equal(redSlotString);
            });

            it('should be the large_blue_circle emoji followed by a space when blue is played', () => {
                slot.play(ColourEnum.BLUE);
                expect(slot.toString()).to.equal(blueSlotString);
            });
        });
    });
});