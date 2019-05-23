const rx = require('rx');
const MessageHelpers = require('./messageHelpers');
const Board = require('../connect4/board');
const RunningGame = require('../connect4/runningGames');

class PlayerInteraction {

    static pollPotentialPlayers(messages, channel, gameType, scheduler = rx.Scheduler.timeout, timeout = 30, maxPlayers = 2) {

        let formatMessage = t => `Who wants to play *` + gameType + `*? Respond with 'yes' in this channel in the next ${t} seconds.`;
        let {timeExpired} = PlayerInteraction.postMessageWithTimeout(channel, formatMessage, scheduler, timeout);
        let newPlayers = messages.where(e => MessageHelpers.containsWord(e.text, 'yes'))
            .map(e => e.user)
            .take(maxPlayers)
            .publish();
        newPlayers.connect();
        timeExpired.connect();
        return newPlayers.takeUntil(timeExpired); // when the time expires
    }

    static getColumnFromPlayer(messages, channel, player, board) {
        channel.send(`${player.name}, please choose a column ${player.symbol}\n${board.toString()}`);
        let message = messages
            .where(e => {

                if (e.text === 'quit') {
                    return true;
                }

                let col = parseInt(e.text) - 1;
                if (e.user !== player.id || isNaN(e.text)) {
                    return false;
                } else if (!Board.validColumn(col)) {
                    channel.send(`${player.name}, please choose a valid column.`);
                    return false;
                } else if (board.isColumnFull(col)) {
                    channel.send(`${player.name}, the column is full, please choose another.`);
                    return false;
                }
                return true;
            })
            .map(e => {
                if (e.text === 'quit') {
                    return e.text;
                } else {
                    return parseInt(e.text) - 1;
                }
            })
            .take(1)
            .publish();
        message.connect();
        return message;
    }

    static postMessageWithTimeout(channel, formatMessage, scheduler, timeout) {
        let timeoutMessage = channel.send(formatMessage(timeout));
        let timeExpired = rx.Observable.timer(0, 1000, scheduler)
            .take(timeout + 1)
            .do((x) => timeoutMessage.updateMessage(formatMessage(`${timeout - x}`)))
            .publishLast();
        return {timeExpired: timeExpired, message: timeoutMessage};
    }
}

module.exports = PlayerInteraction;
