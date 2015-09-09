const Slack = require('slack-client');
const rx = require('rx');

const Connect4Game = require('../connect4/game');
const MsgHelper = require('./messageHelpers');
const PlayerInteraction = require('./playerInteraction');

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

        let startMessages = messages.where(e => {
            return MsgHelper.containsUserMention(e.text, this.slack.self.id) &&
                MsgHelper.containsWord(e.text, 's');
        });

        return startMessages
            .map(e => {
                return this.slack.getChannelGroupOrDMByID(e.channel)
            })
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
                return this.startGame(messagesInChannel, channel, players);
            });
    }

    startGame(messages, channel, players) {
        if (players.length < 1) {
            channel.send('Not enough players for a game, try again later.');
            return rx.Observable.return(null);
        }

        channel.send(`We have our players, let the game begin.`);
        this.isGameRunning = true;


        let game = new Connect4Game(this.slack, messages, channel, players);

        // Listen for messages directed at the bot containing 'quit game.'
        messages
            .where(e => {
                return MsgHelper.containsUserMention(e.text, this.slack.self.id) &&
                    MsgHelper.containsWord(e.text, 'quit game')
            })
            .take(1)
            .subscribe(e => {
                let player = this.slack.getUserByID(e.user);
                channel.send(`${player.name} has decided to quit the game.`);
                game.quit(true);
            });

        return rx.Observable
            .timer(0)
            .flatMap(() => game.play())
            .doOnCompleted(() => {
                console.log('the game is over, we can listen for another now');
                this.isGameRunning = false;
            });
    }

    onClientOpened() {
        console.log(`Welcome to Slack. You are ${this.slack.self.name} of ${this.slack.team.name}`);
    }
}

module.exports = Bot;
