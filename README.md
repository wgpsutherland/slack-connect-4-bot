Slack Connect 4 Bot
===================

Start a game in any channel or private group and play with a friend.

![](http://i.imgur.com/MGaY3sz.png?1)

Written for fun and to practice new features found in the new ECMAScript 6 JavaScript standard.

Inspired by [@CharlieHess/slack-poker-bot](https://github.com/CharlieHess/slack-poker-bot).

## Getting started
1. Create a new [bot integration here](https://my.slack.com/services/new/bot)
2. Run the bot locally or have it running on a heroku server
3. Start a game using: `@<bot-name>: start`
4. Follow the instructions the bot gives you in Slack
5. Type `quit` to abandon a game

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

If you are using the free version of Heroku, the bot will turn itself off after a while and will not respond to any commands on Slack.
You can see if this has happened by the circle next to the bot's name in Slack being empty and grey, instead of green.
Simply navigate in your browser to heroku-bot-name.herokuapp.com, and the bot will come online again.

## Test

Tests can be run using `npm test`.

## Festivities

Start a game using: `@<bot-name>: start boo` or `@<bot-name>: start xmas` to play Connect 4 with a festive spin.
