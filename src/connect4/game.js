const Board = require('./board');
const Player = require('./player');
const ColourEnum = require('./colourEnum');

class Game {

    constructor() {
        this.board = new Board();
        this.playerOne = new Player(this, ColourEnum.RED);
        this.playerTwo = new Player(this, ColourEnum.BLUE);
    }

    play() {
        this.playerOne.makeMove(0);
        this.playerTwo.makeMove(1);
        this.playerOne.makeMove(3);
        this.playerTwo.makeMove(3);
        this.playerOne.makeMove(3);
    }

    move(col, colour) {

        // throw error if column is full
        // throw error if the column is invalid

        // so when the board.play(col) is actually called, it will definitely work
        this.board.play(col, colour);
    }
}

module.exports = Game;
