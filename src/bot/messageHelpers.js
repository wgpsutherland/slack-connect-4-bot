class MessageHelpers {
    static containsUserMention(messageText, userId) {
        let userTag = `<@${userId}>`;
        return messageText && messageText.startsWith(userTag);
    }
}

module.exports = MessageHelpers;
