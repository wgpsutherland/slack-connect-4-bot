class Player {

    constructor(colour) {
        this.colour = colour;
    }

    makeMove(gameState) {
        let col = 0; // this needs to be more intelligent - obviously
        gameState.move(col, this.colour);
    }
}

module.exports = Player;
