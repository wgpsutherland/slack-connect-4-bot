Slack Connect 4 Bot
===================

A bot that allows you to play Connect 4 on slack!
Start a game in any channel or private group, and 2 people can play.

![](http://i.imgur.com/SeWdgAW.png?1)

Written for fun and to practice new features found in the new ECMAScript 6 JavaScript standard.

Inspired by [@CharlieHess/slack-poker-bot](https://github.com/CharlieHess/slack-poker-bot).

## Getting Started

1. Create a new [bot integration here](https://my.slack.com/services/new/bot)
1. Run the bot locally or have it running on a heroku server
1. Start a game using: `@<bot-name>: start`
1. Follow the instructions

### Run Locally

1. Have node installed
1. `$ git clone https://github.com/wgpsutherland/slack-connect-4-bot.git`
1. Create `token.txt` in the root directory and paste in the API token given when creating your bot integration
1. `npm install`
1. `node src/main.js`

### Heroku Server

1. Install the [Heroku toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
1. Create a new bot integration to get the API token
1. `heroku create`
1. `heroku config:set SLACK_CONNECT_4_BOT_TOKEN=[Your API token]`
1. `git push heroku master`

## Test

Tests can be run using `npm test`.
