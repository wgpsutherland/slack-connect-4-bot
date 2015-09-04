const Slack = require('slack-client');
const rx = require('rx');

const Game = require('../connect4/game');

class Bot {

    constructor(token) {
        this.slack = new Slack(token, true, true);
    }

    login() {
        rx.Observable
            .fromEvent(this.slack, 'open')
            .subscribe(() => this.onClientOpened());
        this.slack.login();
        this.respondToMessages();
        var connect4Game = new Game();
        //connect4Game.play();
    }

    respondToMessages() {
        let messages = rx.Observable
            .fromEvent(this.slack, 'message')
            .where(e => e.type === 'message');
        console.log(messages);
    }

    onClientOpened() {
        console.log('client opened');
    }
}

module.exports = Bot;
