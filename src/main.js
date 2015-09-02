//==================== NODE MODULES =====================//

require('babel/register');

//==================== LOCAL INCLUDES ===================//

var Game = require('./game');
var Player = require('./player');

//==================== COMPONENTS =======================//

var redPlayer = new Player();
var bluePlayer = new Player();

var connect4Game = new Game(redPlayer, bluePlayer);

//==================== RUN ==============================//
