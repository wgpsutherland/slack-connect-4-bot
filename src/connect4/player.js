class Player {

    constructor(gameState, colour) {
        this.gameState = gameState;
        this.colour = colour;
    }

    makeMove(col) {
        this.gameState.move(col, this.colour);
    }
}

module.exports = Player;