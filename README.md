Slack Connect 4 Bot
===================

_Tis The Season!_ Get in the festive spirit with the Christmas update.
`@<bot-name>: start xmas` to play with a wintry makeover.

_BOO!_ Introducing the Halloween update, Connect 4 on Slack with a spooky twist.
Scare the bot and play the game with a freaky makeover. 

Start a game in any channel or private group and play with a friend.

![](http://i.imgur.com/azrDH3h.png?1)

Written for fun and to practice new features found in the new ECMAScript 6 JavaScript standard.

Inspired by [@CharlieHess/slack-poker-bot](https://github.com/CharlieHess/slack-poker-bot).

## Getting started
1. Create a new [bot integration here](https://my.slack.com/services/new/bot)
2. Run the bot locally or have it running on a heroku server
3. Start a game using: `@<bot-name>: start`, `@<bot-name>: start boo`, or `@<bot-name>: start xmas`
4. Follow the instructions

## Running locally
```sh
$ git clone git@github.com:wgpsutherland/slack-connect-4-bot.git && cd slack-connect-4-bot
$ npm install
$ npm start
```
Create `token.txt` in the root directory and paste in the API token given when creating your bot integration.

## Deploying to Heroku
```sh
$ heroku create
$ heroku config:set SLACK_CONNECT_4_BOT_TOKEN=[Your API token]
$ git push heroku master
```

Alternatively, you can deploy your own copy with one click using this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/wgpsutherland/slack-connect-4-bot)

See the [Heroku documentation](https://devcenter.heroku.com/articles/config-vars) for more info about changing the configuration variables after deployment.

## Test

Tests can be run using `npm test`.
