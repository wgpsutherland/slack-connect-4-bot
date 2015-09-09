const Emoji = require('./emoji');

class Player {

    constructor(slackPlayer, colour) {
        this.colour = colour;
        this.id = slackPlayer.id;
        this.name = slackPlayer.name;
        this.symbol = Emoji.circle[this.colour];
    }

    makeMove(gameState, col) {
        gameState.move(col, this.colour);
    }
}

module.exports = Player;
