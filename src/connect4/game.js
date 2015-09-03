const Board = require('./board');
const Player = require('./player');
const ColourEnum = require('./colourEnum');

class Game {

    constructor() {
        this.board = new Board();
        this.playerOne = new Player(ColourEnum.RED);
        this.playerTwo = new Player(ColourEnum.BLUE);
        this.currentPlayer = this.playerOne;
        this.gameOver = false;
    }

    play() {

        while(!this.gameOver) {
            console.log('it is a players turn'); // do the new string ${} thing
            var self = this;
            this.currentPlayer.makeMove(self);
            // check if the game is won
            // change the current player to the other
        }

        this.playerOne.makeMove(0);
        this.playerTwo.makeMove(1);
        this.playerOne.makeMove(3);
        this.playerTwo.makeMove(3);
        this.playerOne.makeMove(3);
    }

    move(col, colour) {
        if (this.board.isColumnFull(col)) throw new Error('Column full');
        if (col > Board.width - 1 || col < 0) throw new Error('Column does not exist');
        this.board.play(col, colour);
    }

        // throw error if column is full
        // throw error if the column is invalid

        // so when the board.play(col) is actually called, it will definitely work
        this.board.play(col, colour);
    }
}

module.exports = Game;
