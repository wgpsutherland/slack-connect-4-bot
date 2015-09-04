//==================== NODE MODULES =====================//

require('babel/register');

//==================== LOCAL INCLUDES ===================//

const Bot = require('./bot/bot');

//==================== COMPONENTS =======================//

const bot = new Bot('hello');

//==================== RUN ==============================//

bot.login();
