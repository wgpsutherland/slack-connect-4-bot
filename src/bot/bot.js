const Slack = require('slack-client');
const rx = require('rx');

const Connect4Game = require('../connect4/game');
const MsgHelper = require('./messageHelpers');
const PlayerInteraction = require('./playerInteraction');
const GameTypeEnum = require('../connect4/gameTypeEnum');

class Bot {

    constructor(token) {
        this.slack = new Slack(token, true, true);
    }

    login() {
        rx.Observable
            .fromEvent(this.slack, 'open')
            .subscribe(() => this.onClientOpened());
        this.slack.login();
        this.respondToStartMessages();
    }

    respondToStartMessages() {

        let messages = rx.Observable
            .fromEvent(this.slack, 'message')
            .where(e => e.type === 'message');

        let startMessages = messages
            .where(e =>
                MsgHelper.containsUserMention(e.text, this.slack.self.id) &&
                MsgHelper.containsWord(e.text, 'start'))
            .map(e => {
                if (MsgHelper.containsWord(e.text, 'boo')) {
                    this.gameType = GameTypeEnum.HALLOWEEN;
                } else if (MsgHelper.containsWord(e.text, 'xmas')) {
                    this.gameType = GameTypeEnum.CHRISTMAS;
                } else {
                    this.gameType = GameTypeEnum.NORMAL;
                }
                return e;
            });

        return startMessages
            .map(e => this.slack.getChannelGroupOrDMByID(e.channel))
            .where(channel => {
                if (this.isPolling) {
                    return false;
                } else if (this.isGameRunning) {
                    channel.send('There is another game in progress.');
                    return false;
                }
                return true;
            })
            .flatMap(channel => this.pollPlayersForGame(messages, channel))
            .subscribe();
    }

    pollPlayersForGame(messages, channel) {
        this.isPolling = true;
        return PlayerInteraction.pollPotentialPlayers(messages, channel)
            .reduce((players, id) => {
                let user = this.slack.getUserByID(id);
                channel.send(`${user.name} has joined the game.`);
                players.push({id: user.id, name: user.name});
                return players;
            }, [])
            .flatMap(players => {
                this.isPolling = false;
                let messagesInChannel = messages.where(e => e.channel === channel.id);
                if (Math.random() >= 0.5) {
                  players = players.reverse();
                }
                return this.startGame(messagesInChannel, channel, players);
            });
    }

    startGame(messages, channel, players) {

        if (players.length < 2) {
            channel.send('Not enough players for a game, try again later.');
            return rx.Observable.return(null);
        }

        channel.send(`It is ${players[0].name} vs. ${players[1].name}. *Let the game begin!*`);

        let game = new Connect4Game(this.slack, messages, channel, players, this.gameType);
        this.isGameRunning = true;
        console.log(`A game has been started between ${players[0].name} and ${players[1].name}`);

        return rx.Observable
            .timer(0)
            .flatMap(() => game.play())
            .doOnCompleted(() => {
                console.log(`The game has ended`);
                this.isGameRunning = false;
            });
    }

    onClientOpened() {
        console.log(`Welcome to Slack. You are ${this.slack.self.name} of ${this.slack.team.name}`);
    }
}

module.exports = Bot;
