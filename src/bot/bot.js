const Slack = require('slack-client');
const rx = require('rx');

const Game = require('../connect4/game');

class Bot {

    constructor(token) {
        this.slack = new Slack(token, true, true);
    }

    login() {
        var connect4Game = new Game();
        connect4Game.play();
    }
}

module.exports = Bot;
