'use strict';

var _ = require('lodash');

function Game(numberOfPlayers) {
  var player;

  this.weapons = [];
  this.weapons.push(new Weapon({name: 'Sword', damage: 0.2, ammo: Infinity}));
  this.weapons.push(new Weapon({name: 'Shotgun', damage: 0.6, ammo: 1}));
  this.weapons.push(new Weapon({name: 'Fist', damage: 0.05, ammo: Infinity}));
  this.players = [];

  for (var i = 0; i < numberOfPlayers; i++) {
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

function Player(obj) {
  this.name = obj && obj.name || 'Player';
  this.health = 1;
  this.isZombie = false;
  this.isTrulyDead = false;
  this.dexterity = 0.5;
}

Player.prototype.attack = function (otherPlayer) {
  if (didHit(this.weapon.accuracy)) {
    otherPlayer.health -= this.weapon.damage;
  }
};

function Weapon(obj) {
  this.name = obj.name;
  this.damage = obj.damage;
  this.accuracy = 1 - obj.damage;
  this.ammo = obj && obj.ammo || 0;
}

function didHit(accuracy) {
  return accuracy > Math.random();
}

Game.prototype.fight = function () {
  this.alivePlayers()
    .forEach(function (player, i, alivePlayersArray) {
      var playerIndex = alivePlayersArray.indexOf(player);

      if (playerIndex !== -1) {
        var nextPlayer = alivePlayersArray[playerIndex + 1] || alivePlayersArray[0];
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

var game = new Game(4);
game.fightToTheDeath();

console.log(JSON.stringify(game, null, 2));

