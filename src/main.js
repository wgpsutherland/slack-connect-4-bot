//==================== NODE MODULES =====================//

require('babel/register');

//==================== LOCAL INCLUDES ===================//

var Game = require('./connect4/game');
var Player = require('./connect4/player');

//==================== COMPONENTS =======================//

var connect4Game = new Game();
connect4Game.play();
console.log(connect4Game.board.toString());

//==================== RUN ==============================//
