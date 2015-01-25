'use strict';


function Weapon(obj) {
  this.name = obj.name;
  this.damage = obj.damage;
  this.accuracy = 1 - obj.damage;
  this.ammo = obj && obj.ammo || 0;
}

module.exports = Weapon;
