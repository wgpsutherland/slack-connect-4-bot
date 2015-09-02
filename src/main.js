//==================== NODE MODULES =====================//

require('babel/register');

//==================== LOCAL INCLUDES ===================//

var Game = require('./connect4/game');
var Player = require('./connect4/player');

//==================== COMPONENTS =======================//

var redPlayer = new Player();
var bluePlayer = new Player();

var connect4Game = new Game(redPlayer, bluePlayer);

//==================== RUN ==============================//
