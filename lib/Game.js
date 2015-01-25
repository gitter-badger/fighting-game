'use strict';

var _      = require('lodash'),
    Weapon = require('./Weapon'),
    Player = require('./Player');



function Game(numberOfPlayers) {
  var player,
      i;

  this.weapons = [];
  this.weapons.push(new Weapon({name: 'Dagger', damage: 0.2, ammo: 20}));
  this.weapons.push(new Weapon({name: 'Shotty', damage: 0.6, ammo: 1}));
  this.weapons.push(new Weapon({name: 'Slaps', damage: 0.05, ammo: Infinity}));
  this.players = [];

  for (i = 0; i < numberOfPlayers; i++) {
    player = new Player({name: 'Player' + (i + 1)});
    player.weapon = getRandomWeapon(this.weapons);
    this.players.push(player);
  }

  function getRandomWeapon(weaponList) {
    return weaponList[getRandomInt(0, weaponList.length)];
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
Game.prototype.fight = function () {
  var nextPlayer;
  this.alivePlayers()
    .forEach(function (player, i, alivePlayersArray) {
      var playerIndex = alivePlayersArray.indexOf(player);
      console.log(playerIndex);

      if (playerIndex !== -1) {
        nextPlayer = alivePlayersArray[playerIndex + 1] || alivePlayersArray[0];
        player.attack(nextPlayer);
      }
    });

  return this;
};

Game.prototype.shufflePlayerOrder = function () {
  this.players = _.shuffle(this.players);
  return this;
};

Game.prototype.shuffleAndFight = function () {
  return this
    .shufflePlayerOrder()
    .fight();
};

Game.prototype.alivePlayers = function () {
  return this.players.filter(function (player) {
    return Math.round(player.health * 1e4) / 1e4 >= 0;
  });
};

Game.prototype.fightToTheDeath = function () {
  while (this.alivePlayers().length > 1) {
    this.shuffleAndFight();
  }
};

module.exports = Game;
