const rx = require('rx');

const Board = require('./board');
const Player = require('./player');
const ColourEnum = require('./colourEnum');
const PlayerInteraction = require('../bot/playerInteraction');
const Emoji = require('./emoji');
const GameTypeEnum = require('./gameTypeEnum');

class Game {

    constructor(slack, messages, channel, players, gameType) {
        this.slack = slack;
        this.messages = messages;
        this.channel = channel;
        this.gameType = gameType;

        this.board = new Board();

        var p1Colour, p2Colour;
        if (this.gameType === GameTypeEnum.HALLOWEEN) {
            p1Colour = ColourEnum.GHOST;
            p2Colour = ColourEnum.LANTERN;
        } else {
            p1Colour = ColourEnum.RED;
            p2Colour = ColourEnum.BLUE;
        }
        this.playerOne = new Player(players[0], p1Colour);
        this.playerTwo = new Player(players[1], p2Colour);

        this.gameEnded = new rx.Subject();
    }

    play() {
        rx.Observable
            .return(true)
            .flatMap(() => this.playTurn())
            .repeat()
            .takeUntil(this.gameEnded)
            .subscribe();
        return this.gameEnded;
    }

    quit(forced) {
        if (!forced) {
            this.channel.send(`The game is over! ${Emoji[this.gameType].fire}\n${this.board.toString()}`);
            if (this.board.gameWon) {
                let msg = `${Emoji[this.gameType].celebrate} Congrats ${this.currentPlayer.name}, you have won! ${Emoji[this.gameType].celebrate}`;
                this.channel.send(msg);
            } else {
                this.channel.send(`${Emoji[this.gameType].face.neutral} The board is full, it is a draw. ${Emoji[this.gameType].face.neutral}`);
            }
        }
        this.gameEnded.onNext(true);
        this.gameEnded.onCompleted();
    }

    playTurn() {
        let turnEnded = new rx.Subject();
        this.changePlayer(); // change the current player to the other
        var self = this;
        this.getColumnFromPlayer().subscribe(x => {
            let col = parseInt(x);
            this.currentPlayer.makeMove(self, col);
            if (this.isGameOver()) {
                this.quit();
            } else {
                turnEnded.onNext(true);
                turnEnded.onCompleted();
            }
        });
        return turnEnded;
    }

    getColumnFromPlayer() {
        return rx.Observable.defer(() =>
            PlayerInteraction.getColumnFromPlayer(this.messages, this.channel, this.currentPlayer, this.board));
    }

    move(col, colour) {
        if (this.board.isColumnFull(col)) throw new Error('Column full');
        if (!Board.validColumn(col)) throw new Error('Column does not exist');
        this.board.play(col, colour);
    }

    isGameOver() {
        return this.board.isBoardFull() || this.board.gameWon;
    }

    changePlayer() {
        this.currentPlayer = this.currentPlayer === this.playerOne
            ? this.playerTwo
            : this.playerOne;
    }
}

module.exports = Game;
