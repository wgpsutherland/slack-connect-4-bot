const rx = require('rx');
const _ = require('underscore');
const MessageHelpers = require('./messageHelpers');

class PlayerInteraction {

    static pollPotentialPlayers(messages, channel, scheduler = rx.Scheduler.timeout, timeout = 10, maxPlayers = 2) {
        let formatMessage = t => `Who wants to play? Respond with 'yes' in this channel in the next ${t} seconds.`;
        let {timeExpired} = PlayerInteraction.postMessageWithTimeout(channel, formatMessage, scheduler, timeout);
        let newPlayers = messages.where(e => MessageHelpers.containsWord(e.text, 'yes'))
            .map(e => e.user)
            .distinct()
            .take(maxPlayers)
            .publish();
        newPlayers.connect();
        timeExpired.connect();
        return newPlayers.takeUntil(timeExpired); // when the time expires
    }

    static getColForPlayer(messages, channel, player, board) {
        channel.send(`${player.name}, please choose a column.`);
        let message = messages
            .where(e => {
                var correctUser = e.user === player.id;
                let col = parseInt(e.text) - 1;
                var validCol = MessageHelpers.validColumnNumber(col);
                if(!validCol) {
                    channel.send(`${player.name}, please choose a valid column.`);
                    return false;
                } else {
                    var colFull = board.isColumnFull(col);
                    if (colFull) channel.send(`${player.name}, the column is full, please choose another.`);
                    return correctUser && !colFull;
                }
            })
            .map(e => {
                let col = parseInt(e.text) - 1;
                return col;
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