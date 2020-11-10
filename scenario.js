'use strict';

let loot = require('./loot.js');
let char = require('./characters.js');

class Choice {
  constructor(choiceName, dialogue, lootObject, next) {
    this.choiceName = choiceName;
    this.dialogue = dialogue;
    this.lootObject = lootObject;
    this.next = next;
  }
}

class Senario {
  constructor(name, dialogue, choices) {
    this.name = name,
      this.dialogue = dialogue;
    this.choices = choices;
  }

  //choiceResults(selectedChoice){
  //emit this.selectedChoice.dialogue;
  //}
}

// senarios in order, choices first

// intro
// let intro = new Senario('Introduction', 'In the beginning, the people welcomed a rich and powerful lord as their king, not knowing that the he would take over the land and bring famine and disease to the people. He taxed the poor and spared the rich. He built walls, really tall walls, around the kingdom to keep out the surrounding nations. Due to the king’s rule, villainess monsters have moved in and flourish in the kingdom. They prey on the poor villagers. Emboldened by the king’s tyranny, the monsters have come out of hiding to rain terror upon the land. A secret rebellion has formed amongst the kingdom’s villages. A messenger has been sent to sneak out and find your legendary band of warriors to plea for your aid, in overturning the evil kings reign.', null);

// // At the wall
// let atTheWallChoices = {
//   choice1: new Choice('Battle the Orc', 'Do you fight the orc, knowing that supplies are low and you don’t have any healing potions or bandages if someone gets hurt?', null, boss1),
//   choice2: new Choice('Go Around', 'Do you try to find another way through the wall and avoid the Orc?', null, npc1)
// }

// let atTheWall = new Senario('At the Wall', `Having received the villagers plea and decided to answer their cries, your motley band of mighty warriors has traveled for days and finally you see the walls of the kingdom before you. ${char.ogre.name} jokes “Only a small man would build such tall walls!” ${char.assassin.name} replies “definitely overcompensating for something…” As the hulking walls get closer you begin to see what appears to be an Orc Lord guarding a gate. Your group stops to discuss your options…`, atTheWallChoices);

// //BOSS 1 : Orc Lord
// let orcLordChoices = {
//   lowRoll: new Choice('Poor Roll', `${char.ogre.name} runs in and slams directly into the Orc Lord trying to keep him busy while ${char.assassin.name} creeps up behind him preparing to cut in to the backs of his knees when the moment is right. The Orc seems to be smarter than he looks because he is on to your tactic and backs up against the wall where ${char.assassin.name} will not be able to get behind him. With the sun in their eyes ${char.wizard.name} and ${char.hunter.name} are not able to successfully put up an attack or defense. Things begin to go sideways and ${char.ogre.name} calls for ${char.assassin.name} to fallback. ${char.assassin.name} throws down vanishing powder and with the explosion your team makes a run for it. You have suffered injuries and will have to find another way into the kingdom.`, null, npc1),
//   medRoll: new Choice('Fair Roll', `${char.ogre.name} runs in and slams directly into the Orc Lord trying to keep him busy while ${char.assassin.name} creeps up behind him preparing to cut in to the backs of his knees when the moment is right. The Orc seems to be smarter than he looks because he is on to your tactic and backs up against the wall where ${char.assassin.name} will not be able to get behind him.${char.wizard.name} puts up a protective shield around ${char.ogre.name} and ${char.assassin.name} trying to prevent the Orc's blows from doing so much damage but it doesn’t seem to be helping much. ${char.hunter.name} is having a hard time aiming with the chaos of the battle and the sun facing towards your group, but with a wish for luck sends a blinding arrow into the Orc's right eye. The monster begins furiously bellowing and stumbles forward while ${char.assassin.name} takes the opportunity to hamstring the foe, and ${char.ogre.name} finishes him off with a few powerful blows to the nose. Your team prevails but not without damages. You enter the kingdom over the body of your conquered enemy.`, loot.orcLordMace, npc2),
//   highRoll: new Choice('Good Roll', `${char.ogre.name} runs in and slams directly into the Orc Lord trying to keep him busy while ${char.assassin.name} creeps up behind him preparing to cut in to the backs of his knees when the moment is right. ${char.wizard.name} puts up a protective shield around ${char.ogre.name} and ${char.assassin.name} trying to prevent the Orc's blows from doing so much damage. ${char.hunter.name} carefully aims and when the moment is right sends a blinding arrow into the Orc's right eye. ${char.assasin.name} takes the opportunity to hamstring the foe, and ${char.ogre.name} finishes him off with a few powerful blows to the nose. Your team prevails with very little in the way of damage and you enter through the gates of the kingdom.`, loot.orcLordMace, npc2)
// }
// let boss1 = new Senario('Battling the Orc Lord', 'Your team decides the best way through a wall is over the dead body of an Orc so you prepare for battle.', orcLordChoices)

// NPC 2

// NPC 1

// village

// BOSS 2 : Goblin

// poisonous bite

// BOSS 3 : Troll

// NPC 3 : Merchant

// NPC 4 : Witch

// BOSS 4 : Hydra

// NPC 5 : Rebellion

// city before the palace
let cityChoices = {
  choice1: new Choice('Circus Troupe', `${char.assassin.name} says “I’ll be the contortionist!”, ${char.ogre.name} “I guess that makes me the strongman”, ${char.wizard.name} “I have tons of great illusions!”, and ${char.hunter.name} “who wants to volunteer to let me throw daggers at them??” You all laugh, but it is half from amusement and half due to heightened nerves. You know you are getting close to confronting the king and everything will have to go right for you to succeed. You help each other to create shabby costumes from random clothing items each person has in their bags. “Cirque du Folie” enters the city gates with a nod from the guard and instructions to register with the performers guild before you can begin doing shows. You had been instructed to meet your contact at a tavern called the “Horned Animal” where he will greet you with a code phrase. Your costumes seem to be working because not a single guard that passes your group even looks at you twice.`
    , null, null),
  choice2: new Choice('Minstrals', `${char.hunter.name} says “I knew this lute was going to come in handy! You all said I was stupid for carrying it around all this time! ${char.ogre.name} you’re good at hitting things, go find something you can use as a drum.” Looks like ${char.assassin.name} and ${char.wizard.name} will be singing for their supper. You disguise your weapons to look like wrapped musical instruments and make your way to the city gates. The gate guard lets you through with instructions to register with the performers guild before you can begin doing shows. You had been instructed to meet your contact at a tavern called the “Horned Animal” where he will greet you with a code phrase. Your guise of musicians seem to be working because not a single guard that passes your group even looks at you twice.`, null, null),
  choice3: new Choice('Brotherhood of Monks', `${char.wizard.name} says “I have some pigment with me that will work as dye for our cloaks. I can make them all a dark brown so we will pass for a band of traveling monks.” ${char.assassin.name} goes out to collect grasses from the surrounding area to stuff under the cloaks and ${char.hunter.name} begins braiding rope to use as belts. When the cloaks have dried enough in the sun to wear you help each other tie your cloaks around you like robes and stuff them with grasses to disguise the shape of your weapons. Now you look like a group of pudgy monks, you hope this will be convincing to the gate guards. ${char.wizard.name} does the talking as you meet the guard. The rest of you have taken a “vow of silence” and keep your heads bowed as you are motioned through. The burly guard tells your group where to find a clean inn that welcomes visiting clergy and (wizard) thanks him. You had been instructed to meet your contact at a tavern called the “Horned Animal” where he will greet you with a code phrase. Your “holy robes” seem to be working because not a single guard that passes your group even looks at you twice.`, null, null)
}

let cityAroundThePalace = new Senario('CITY SURROUNDING THE CASTLE', 'Your band arrives to the city surrounding the palace with plans to meet the contact you were given when you first crossed through the kingdoms walls. However things never go exactly as planned… The kings guards are swarming the city and a group of mighty fighters like yourselves can’t just walk through the city unnoticed. You will have to go in disguised and hope that your contact will be able to recognize you. What kind of disguise do you think you should use?', cityChoices)


// horned animal

// NPC 6 : Mage-Smith

// BOSS 5 : THE KING




// function playSenario(senario) {
//   console.log(senario.name);
//   console.log(senario.dialogue);
//   if (senario.choices) {
//     for (key in senario.choices) {
//       console.log(`${key}: ${senario.choices[key]}`);
//     }
//   }
// }

//playSenario(atTheWall);

module.exports = {
  cityAroundThePalace
}