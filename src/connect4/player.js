class Player {

    constructor(colour) {
        this.colour = colour;
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
