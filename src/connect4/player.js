class Player {

    constructor(slackPlayer, colour) {
        this.colour = colour;
        this.id = slackPlayer.id;
        this.name = slackPlayer.name;
    }

    makeMove(gameState) {

        var slotted = false;

        while(!slotted) {
            try {
                let col = Math.trunc(Math.random() * 7);
                gameState.move(col, this.colour);
                slotted = true;
            }
            catch(error) {
                // do nothing
            }
        }

    }
}

module.exports = Player;
