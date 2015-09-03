const Board = require('./board');
const Player = require('./player');
const ColourEnum = require('./colourEnum');

class Game {

    constructor() {
        this.board = new Board();
        this.playerOne = new Player(ColourEnum.RED);
        this.playerTwo = new Player(ColourEnum.BLUE);
        this.gameOver = false;
    }

    play() {
        while (!this.gameOver) {
            this.nextTurn(); // change the current player to the other
            console.log(`It is the ${this.currentPlayer.colour} player's turn`);
            var self = this;
            this.currentPlayer.makeMove(self);
            this.gameOver = this.isGameOver();
            console.log(this.board.toString());
        }
        console.log('--');
        console.log(this.board.toString());
        if(this.board.gameWon) {
            console.log(`player ${this.currentPlayer.colour} won`)
        } else {
            console.log(`the board is full, it is a draw`);
        }
    }

    move(col, colour) {
        if (this.board.isColumnFull(col)) throw new Error('Column full');
        if (col > Board.width - 1 || col < 0) throw new Error('Column does not exist');
        this.board.play(col, colour);
    }

    isGameOver() {
        return this.board.isBoardFull() || this.board.gameWon; // is there a winner
    }

    nextTurn() {
        this.currentPlayer = this.currentPlayer === this.playerOne
            ? this.playerTwo
            : this.playerOne;
    }
}

module.exports = Game;
