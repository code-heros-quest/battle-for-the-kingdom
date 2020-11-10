// loot items maybe like this?

// by class
class Loot {
  constructor(name, role, health, attack)
}

let orcLordMace = new Loot('Orc Lord Mace', ['Ogre'], 0, 2);
let herbalPotion = new Loot('Herbal Potion', ['Wizard', 'Assassin', 'Warrior', 'Hunter'], 5, 0);
let strongBandages = new Loot('Strong Bandages', ['Wizard', 'Assassin', 'Warrior', 'Hunter'], 10, 0);
let falcon = new Loot('Falcon', ['Hunter'], 0, 0);
let sheild = new Loot('Sheild', ['Ogre'], 3, 2);
let poisonousBerries = new Loot('Poinsonous Berries', ['Assassin'], 0, 3);
let magicalAmulet = new Loot('Magical Amulet', ['Wizard'], 3, 2);
let hoodAndJesses = new Loot('Hood and Jesses', ['Hunter'], 2, 3);
let strengthSpell = new Loot('Strength Spell', ['Wizard', 'Assassin', 'Warrior', 'Hunter'], 0, 1);
let gnarledStaff = new Loot('Gnarled Staff', ['Wizard'], 3, 2);
let strongHeirloomBow = new Loot('Strong Heirloom Bow', ['Hunter'], 0, 6);
let brittleHeirloomBow = new Loot('Brittle Heirloom Bow', ['Hunter'], 0, 1);
let mightyEnchantedSword = new Loot('Mighty Enchanted Sword', ['Assassin'], 0, 6);
let mysteriousSword = new Loot('Mysterious Sword', ['Assassin'], 0, 1);

modules.export = {
  orcLordMace,
  herbalPotion,
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