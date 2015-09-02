const Board = require('./board');
const Player = require('./player');

class Game {

    constructor() {
        this.board = new Board();
        this.playerOne = new Player(this, 'red');
        this.playerTwo = new Player(this, 'blue');
    }

    start() {
        this.playerOne.makeMove(0);
        this.playerTwo.makeMove(1);
        this.playerOne.makeMove(3);
    }

    move(col, colour) {
        let slot = this.board.getCounterAt(0, col);
        slot.play(colour);
    }
}

module.exports = Game;
