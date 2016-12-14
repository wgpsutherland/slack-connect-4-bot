require('babel/register');
const http = require('http');

try {
    const fs = require('fs');
    const pathToken = process.env.SLACK_CONNECT_4_BOT_TOKEN;
    const token = pathToken || fs.readFileSync('token.txt', 'utf-8').trim();
    const Bot = require('./bot/bot');
    const bot = new Bot(token);
    
    bot.login();

    http.createServer(function(req, res) {
        res.end('SLACK_CONNECT_4_BOT');
    }).listen(process.env.PORT || 5000);

} catch(error) {
    console.log('You need to put your API token in a token.txt file');
    return;
}
