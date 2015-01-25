'use strict';

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

  function didHit(accuracy) {
    return accuracy > Math.random();
  }
};

module.exports = Player;
