'use strict'

const char = require('./characters.js')

class Loot {
  constructor(name, role, health, attack) {
    this.name = name;
    this.role = role;
    this.health = health;
    this.attack = attack;
  }

}

let orcLordMace = new Loot('Orc Lord Mace', [char.warrior], 0, 2);
let herbalSalve = new Loot('Herbal Salve', [char.wizard, char.assassin, char.warrior, char.hunter], 5, 0);
let strongBandages = new Loot('Strong Bandages', [char.wizard, char.assassin, char.warrior, char.hunter], 10, 0);
let falcon = new Loot('Falcon', [char.hunter], 0, 0);
let sheild = new Loot('Sheild', [char.warrior], 3, 2);
let poisonousBerries = new Loot('Poinsonous Berries', [char.assassin], 0, 3);
let magicalAmulet = new Loot('Magical Amulet', [char.wizard], 3, 2);
let hoodAndJesses = new Loot('Hood and Jesses', [char.hunter], 2, 3);
let strengthSpell = new Loot('Strength Spell', [char.wizard, char.assassin, char.warrior, char.hunter], 0, 1);
let gnarledStaff = new Loot('Gnarled Staff', [char.wizard], 3, 2);
let strongHeirloomBow = new Loot('Strong Heirloom Bow', [char.hunter], 0, 6);
let brittleHeirloomBow = new Loot('Brittle Heirloom Bow', [char.hunter], 0, 1);
let mightyEnchantedSword = new Loot('Mighty Enchanted Sword', [char.assassin], 0, 6);
let mysteriousSword = new Loot('Mysterious Sword', [char.assassin], 0, 1);

module.exports = {
  orcLordMace,
  herbalSalve,
  strongBandages,
  falcon,
  sheild,
  poisonousBerries,
  magicalAmulet,
  hoodAndJesses,
  strengthSpell,
  gnarledStaff,
  strongHeirloomBow,
  brittleHeirloomBow,
  mightyEnchantedSword,
  mysteriousSword
}