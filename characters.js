'use strict';

class Character {
  constructor(name, race, charClass, health, attack) {
    name = this.name;
    race = this.race;
    charClass = this.charClass;
    stats = { health: this.health, attack: this.attack }
  }

  addHealth(value) {
    this.stats.health += value;
  }
  loseHealth(value) {
    if (this.stats.health <= 0) {
      //gameOver();
    } else {
      this.stats.health -= value;
    }
  }
  addAttack(value) {
    this.stats.attack += value;
  }
}

let assasin = new Character('Athyrium', 'Human', 'Assassin', 20, 15)
let hunter = new Character('Silent Crash', 'Elf', 'Hunter', 20, 15);
let ogre = new Character('Bristle Beard', 'Ogre', 'Warrior', 30, 10);
let wizard = new Character('Ibus', 'Hobbit', 'Wizard', 30, 10)

modules.export = {
  assasin,
  hunter,
  ogre,
  wizard
}