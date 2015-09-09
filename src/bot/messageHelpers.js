const Board = require('../connect4/board');

class MessageHelpers {

    static containsUserMention(messageText, userId) {
        let userTag = `<@${userId}>`;
        return messageText && messageText.startsWith(userTag);
    }

    static containsWord(messageText, word) {
        return messageText && messageText.toLowerCase().match(new RegExp(`\\b${word}\\b`));
    }

    static validColumnNumber(col) {
        return col < Board.width && col >= 0;
    }
}

module.exports = MessageHelpers;
