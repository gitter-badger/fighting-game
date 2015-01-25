'use strict';

var game,
    Game = require('./lib/Game');


game = new Game(4);
game.fightToTheDeath();

console.log(JSON.stringify(game, null, 2));
