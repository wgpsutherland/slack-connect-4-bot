const Emoji = require('./emoji');

class Player {

    constructor(slackPlayer, colour, gameType) {
        this.colour = colour;
        this.gameType = gameType;
        this.id = slackPlayer.id;
        this.name = slackPlayer.name;
        this.symbol = Emoji[this.gameType].circle[this.colour];
    }

    makeMove(gameState, col) {
        gameState.move(col, this.colour);
    }
}

module.exports = Player;
