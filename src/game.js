const Board = require('./board');

class Game {

    constructor(playerOne, playerTwo) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this.board = new Board();
        console.log(this.board.toString());
    }
}

module.exports = Game;