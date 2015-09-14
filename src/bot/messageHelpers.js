const Board = require('../connect4/board');

class MessageHelpers {

    static containsUserMention(messageText, userId) {
        let userTag = `<@${userId}>`;
        return messageText && messageText.startsWith(userTag);
    }

    static containsWord(messageText, word) {
        return messageText && messageText.toLowerCase().match(new RegExp(`\\b${word}\\b`));
    }
}

module.exports = MessageHelpers;
