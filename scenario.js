'use strict';

let loot = require('./loot.js');
let char = require('./characters.js');

class Choice {
  constructor(num, choiceName, dialogue, lootObject, next) {
    this.num = num;
    this.choiceName = choiceName;
    this.dialogue = dialogue;
    this.lootObject = lootObject;
    this.next = next;
  }
}

class Scenario {
  constructor(name, dialogue, choiceQuestion, choices) {
    this.name = name,
    this.dialogue = dialogue;
    this.choiceQuestion = choiceQuestion
    this.choices = choices;
  }

  //choiceResults(selectedChoice){
  //emit this.selectedChoice.dialogue;
  //}
}

// Scenarios in reverse order, choices first

// BOSS 5 : THE KING
// const theKing = new Scenario();

// NPC 6 : Mage-Smith
const mageSmithChoices = {
  choice1: new Choice(1, 'Try to hush him', `${char.hunter.name} tries to motion the dwarf to speak quietly, but this seems only to enrage him more. His volume begins to increase and ${char.assassin.name} does the only logical thing, blows sleeping powder in his face. This doesn’t force him into sleep, as dwarves are very resistant to these types of drugs but he does seem to become much more relaxed and his eyes have a slightly glazed quality. You all usher the little man into a side alley before the guards come to check out the noise. The dwarf seems unable to speak but ${char.wizard.name} talks to him in a coaxing voice and he begins to slowly tell his tale. “I was the kings personal smith. I make very special weapons, because you see not only am I a smith, I am also a mage. My people have long studied the art of working enchantments into metal as we strike it and the king sent to my people asking for the greatest Mage-Smith we could offer. My work is renowned and I was honored to be chosen by my tribe to come to the palace and craft a blade for the king. Only when I arrived did I begin to see the reality of this request. The king did not want to let me do my work. He began demanding certain qualities and powers of the sword. I tried to tell him that it doesn’t work that way. The metal has a spirit of its own and that determines what attributes the metal will hold when it is formed. The king fired me and threw me out of the palace. I have never been so insulted! The man is an infant and I wouldn’t want one of my masterpieces in his hands anyway!” It seems risky to trust a stranger but this dwarf seems convincingly opposed to the king, so you tell him of your quest. He says “The king is very powerful and he surrounds himself with people who encourage his ego and increase his strength. You will have a hard time defeating him but I will gift you the blade he did not want.” The dwarf pulls a wrapped sword off his back that you didn’t notice until now. “This sword holds many attributes. One of which is the power of Invisibility. It makes itself invisible, and when you pull it the bearer and any they touch become invisible as well. The king wishes only to be seen. It’s second attribute is the power of Grace, when holding this blade the fighter will become more agile and fluid. The king did not think this power masculine enough for his sword. It has some other smaller attributes but those are the main two.” You all look upon the blade with awe, never have you seen such a powerful weapon. ${char.wizard.name} says, “Thank you Sir Mage-Smith, you are truly a master at your art and powerful sorcerer. A blade of this majesty will surely turn the tides for us” The dwarf simply nods, hands ${char.assassin.name} the blade and turns to walk away. You stare after him surprised that he has become so calm when he suddenly turns and growls “Tell him Athgar sent you when you cut his throat”. That seems more like the dwarf you have come to know`, loot.mightyEnchantedSword, null),
  choice2: new Choice(2, 'Rise to his level', `The only way to break into the dwarfs temper tantrum will be an equally explosive response. (ogre) lets loose a mighty roar, leaving everyone silent, and your group rushes the little man into a side alley before the guards come to check out the noise. The dwarf seems unable to speak but (wizard) talks to him in a coaxing voice and he begins to slowly tell his tale. “I was the kings personal smith. I make very special weapons, because you see not only am I a smith, I am also a mage. My people have long studied the art of working enchantments into metal as we strike it and the king sent to my people asking for the greatest Mage-Smith we could offer. My work is renowned and I was honored to be chosen by my tribe to come to the palace and craft a blade for the king. Only when I arrived did I begin to see the reality of this request. The king did not want to let me do my work. He began demanding certain qualities and powers of the sword. I tried to tell him that it doesn’t work that way. The metal has a spirit of its own and that determines what attributes the metal will hold when it is formed. The king fired me and threw me out of the palace. I have never been so insulted! The man is an infant and I wouldn’t want one of my masterpieces in his hands anyway!” It seems risky to trust a stranger but this dwarf seems convincingly opposed to the king, so you tell him of your quest. He says “The king is very powerful and he surrounds himself with people who encourage his ego and increase his strength. You will have a hard time defeating him but I will gift you the blade he did not want.” The dwarf pulls a wrapped sword off his back that you didn’t notice until now. “This sword holds many attributes. One of which is the power of Invisibility. It makes itself invisible, and when you pull it the bearer and any they touch become invisible as well. The king wishes only to be seen. It’s second attribute is the power of Grace, when holding this blade the fighter will become more agile and fluid. The king did not think this power masculine enough for his sword. It has some other smaller attributes but those are the main two.” You all look upon the blade with awe, never have you seen such a powerful weapon. ${char.wizard.name} says, “Thank you Sir Mage-Smith, you are truly a master at your art and powerful sorcerer. A blade of this majesty will surely turn the tides for us” The dwarf simply nods, hands ${char.assassin.name} the blade and turns to walk away. You stare after him surprised that he has become so calm when he suddenly turns and growls “Tell him Athgar sent you when you cut his throat”. That seems more like the dwarf you have come to know`, loot.mightyEnchantedSword, null),
  choice3: new Choice(3, 'Just walk away', `You itch your ear, code for “time to hit the road” and your comrades all give a subtle nod. You break off, some going left, and the others going right, leaving the angry dwarf shouting in the street. Just in time too! A storm of guards goes thundering past you towards the noise. He might have helped you after all. Now all the guards between you and the palace will have their hands full. As the guards haul the man past you a package you hadn’t noticed before falls from the mans back. ${char.assassin.name} picks it up and unwraps the long, thin, item to discover a beautiful sword. When ${char.assassin.name} grasps the hilt they become invisible! This will be a powerful weapon to have against the king.`, loot.mysteriousSword, null)
}
const mageSmith = new Scenario('The Mage-Smith', `Early the next morning your team packs up and stashes everything you don’t need for your mission in Halbert’s barn. The cow moo’s in surprise at having unknown guests, but continues chewing her hay before long. If you survive you will be able to come back and get your packs. If you don’t return Halbert has been instructed to turn them in to the city guard as suspicious “lost and found” so he will not be accused of aiding you. You plan to split up about half way to the palace and approach from different directions. You have almost reached the split point when you see a brawny dwarf trudging down the road towards you. He is cursing up a storm and you wonder if maybe you should duck out of the way to avoid him, but no sooner does that thought cross your mind than the little man hails your group. “You there! If you are going to visit that ungrateful worm that calls himself the king give him my kindest regards” this sentiment is followed by a particularly loud bout of flatulence. The crude man is wearing a leather apron and carrying a hammer almost as large as he is. He begins gesturing wildly with the hammer and cursing the king at the top of his lungs. `, `While it is a comical sight you are trying to avoid drawing attention to yourselves and you need to calm him down. Do you:`, mageSmithChoices);

// horned animal
const hornedAnimal = new Scenario('The Horned Animal', `You approach an older building with a weathered sign swinging over the door. The wooden square features a white unicorn that looks a little more like a yellow donkey with a wizards hat than the magical creature the tavern was named for, but you figure you must be in the right place. Your group exchanges a familiar look that means “be prepared in case this is a trap” and you walk in. A woman behind the bar points you towards a table while loading a serving boy’s tray with pitchers of beer and piling bowls of stew and loaves of crusty bread on a second tray held by a young girl. You realize these must be her children because they all share the same bright red hair. The tavern is busy with workers coming in for an evening meal. Most of the patrons are younger, and look like skilled laborers… probably without families at home to share the meal. Wealthy enough to afford a meal at a tavern, but not well off enough to eat at one of the places frequented by merchants or guards. The small red haired girl arrives at your table and hands you bowls and bread in exchange for 5 coper coins a piece. She tells you that for two more her brother will fill your mugs and then scampers off. The soup is good despite being thin and the bread is hot and delicious. You begin to wonder if your contact will recognize you when another red head, this time a bearded giant, approaches your table. He warily addresses your group “You look like you’ve traveled a long way. Seems like there is a storm is on the horizon…” ${char.hunter.name} responds “Better a storm than a draught” and the man's face instantly relaxes. Your contact, Halbert, turns out to be the owner of the Horned Animal. He and his wife took it over when her father died and have been doing their best to keep the business going. He tells you that the tavern used to be busy all day long but now with the people growing more poor the only time they have clients is for dinner. His wife’s father was ill and couldn’t afford to get the care he needed despite having worked hard his whole life. Halbert says “We can’t keep letting the king get rich on the backs of the villagers while we starve or die from treatable maladies. Thank you for hearing our need, I want my children to have a chance at a life without suffering”. He leaves you a map of the palace complex including guard stations and servants entrances and wishes you luck. A few minutes later the boy comes to your table with wrapped packets for each of you “me ma made some sandwiches for yer travels” he squeaks and then turns and quickly disappears back behind the bar.`, null, null)

// city before the palace
const cityChoices = {
  choice1: new Choice(1, 'Circus Troupe', `${char.assassin.name} says “I’ll be the contortionist!”, ${char.ogre.name} “I guess that makes me the strongman”, ${char.wizard.name} “I have tons of great illusions!”, and ${char.hunter.name} “who wants to volunteer to let me throw daggers at them??” You all laugh, but it is half from amusement and half due to heightened nerves. You know you are getting close to confronting the king and everything will have to go right for you to succeed. You help each other to create shabby costumes from random clothing items each person has in their bags. “Cirque du Folie” enters the city gates with a nod from the guard and instructions to register with the performers guild before you can begin doing shows. You had been instructed to meet your contact at a tavern called the “Horned Animal” where he will greet you with a code phrase. Your costumes seem to be working because not a single guard that passes your group even looks at you twice.`
    , null, null),
  choice2: new Choice(2, 'Minstrals', `${char.hunter.name} says “I knew this lute was going to come in handy! You all said I was stupid for carrying it around all this time! ${char.ogre.name} you’re good at hitting things, go find something you can use as a drum.” Looks like ${char.assassin.name} and ${char.wizard.name} will be singing for their supper. You disguise your weapons to look like wrapped musical instruments and make your way to the city gates. The gate guard lets you through with instructions to register with the performers guild before you can begin doing shows. You had been instructed to meet your contact at a tavern called the “Horned Animal” where he will greet you with a code phrase. Your guise of musicians seem to be working because not a single guard that passes your group even looks at you twice.`, null, null),
  choice3: new Choice(3, 'Brotherhood of Monks', `${char.wizard.name} says “I have some pigment with me that will work as dye for our cloaks. I can make them all a dark brown so we will pass for a band of traveling monks.” ${char.assassin.name} goes out to collect grasses from the surrounding area to stuff under the cloaks and ${char.hunter.name} begins braiding rope to use as belts. When the cloaks have dried enough in the sun to wear you help each other tie your cloaks around you like robes and stuff them with grasses to disguise the shape of your weapons. Now you look like a group of pudgy monks, you hope this will be convincing to the gate guards. ${char.wizard.name} does the talking as you meet the guard. The rest of you have taken a “vow of silence” and keep your heads bowed as you are motioned through. The burly guard tells your group where to find a clean inn that welcomes visiting clergy and (wizard) thanks him. You had been instructed to meet your contact at a tavern called the “Horned Animal” where he will greet you with a code phrase. Your “holy robes” seem to be working because not a single guard that passes your group even looks at you twice.`, null, null)
}

const cityAroundThePalace = new Scenario('CITY SURROUNDING THE CASTLE', 'Your band arrives to the city surrounding the palace with plans to meet the contact you were given when you first crossed through the kingdoms walls. However things never go exactly as planned… The kings guards are swarming the city and a group of mighty fighters like yourselves can’t just walk through the city unnoticed. You will have to go in disguised and hope that your contact will be able to recognize you.', 'What kind of disguise do you think you should use?', cityChoices)

// NPC 5 : Rebellion
const rebellion = new Scenario();

// BOSS 4 : Hydra
const theHydra = new Scenario();

// NPC 4 : Witch
const theWitch = new Scenario();

// NPC 3 : Merchant
const theMerchant = new Scenario();

// BOSS 3 : Troll
const theTroll = new Scenario();

// BOSS 2 : Goblin
const theGoblin = new Scenario();

// poisonous bite
const thePoinsonousBite = new Scenario();

// the village
const theVillage = new Scenario();

// NPC 1
const theWoodsmanChoices = {
  lowRoll: new Choice(1, 'Poor Roll', `unfortunately `, null, theVillage),
  medRoll: new Choice(2, 'Fair Roll', 'Luck seems to be with you today. The wife of the woodsman is grateful for your help and gives you a healing salve she makes from local plants.', loot.herbalSalve, theVillage),
  highRoll: new Choice(3, 'Good Roll', 'Luck seems to be with you today. The wife of the woodsman is grateful for your help and gives you a healing salve she makes from local plants.', loot.herbalSalve, theVillage)
}
const theWoodsman = new Scenario('Find Another Way In', `Your team decides you aren’t prepared for a fight with a full blown Orc Lord today. You are short on supplies and lost several weapons in your last big battle which will need to be replaced. You head west into the woods before the near-sighted Orc sees your group and make your way towards a less guarded area. (Add to story that woodsman has healing salve to reward them with for helping him) Up ahead a man is chopping wood. He is not wearing a royal insignia, and looks thin and tired. Your group decides to approach him and ask if he knows a way into the kingdom that might be less conspicuous. You send ${char.wizard.name} to talk to him since they are the least visibly threatening of the group but quite capable of wielding a healing staff as a weapon if necessary. The exhausted axe wielding man approaches your group with ${char.wizard.name} at his side. As he gets closer you seen he has dark circles around his eyes and sunken in cheeks. He tells your group “I live inside the kingdom walls and sneak out every day to collect wood for my family to trade with the rest of my village. No one has much food, but they are will to trade some of what the have for a warm fire in the hearth. If you are brave enough to face down our evil king I am brave enough to sneak you through the wall”  You all collect firewood as the man finishes his chopping and follow him back to the wall. He shows you a hole hidden by a bush and you are all able to get through, even ${char.ogre.name} with enough wiggle to make a barmaid blush. You follow him back to his village and thank him for the safe passage”`, 'Since you were kind enough to carry wood back to the village the woodsman has much more than normal. Maybe if you are lucky he will reward you for your help. Roll for luck:', theWoodsmanChoices)


// NPC 2
const theOldFriend = new Scenario('The Old Friend', `You make your way into the kingdom, surprised that their aren’t guards stationed more closely together. The area immediately surrounding the gate entrance is a sort of mini hub with a small inn and stable. Surprisingly no one has come out to see what the commotion was, but perhaps they are used to hearing the guard engage in battle. Eventually a change of guards will occur and someone will notice a dead Orc captain laying across the entrance to the kingdom. For now you decide it’s best to get as far into the countryside as possible where you won’t come into contact with the perimeter patrols. As you are walking past the inn you hear a shout, “hey! You there! Ogre!”. A robust man of a somewhat small stature comes towards you and calls out to ${char.ogre.name} by name. “Well I haven’t seen you since the battle of Meridorn! How you doin old pal?! Still bashing in brains I see” the loud man says with a quick glance at  ${char.ogre.name}’s new Mace. ${char.hunter.name} interrupts and proclaims loudly “I am sorry sir but you must be thinking of someone else! We don’t know you or have any idea what you are referring too!” He makes large eyes and a shushing gesture at the man. The man looks bewildered and starts back up, clearly a ways in to his cups “Sure you know me! Why remember the time that we-“ Just at that moment ${char.wizard.name} puts a silence spell on the man, and not a second too soon. A small group of soldiers is visible walking the inner perimeter of the wall towards you. The man puts his hands to his mouth with panic in his eyes, clearly trying to speak, though no words are coming out. Ogre wraps his big arm around the mans shoulder and you nonchalantly guide the man down the street away from the guards. ${char.wizard.name} says to the man “I am going to take the spell off but you need to be very quiet. We need to get out of here before those guards realize there is anything wrong. Is there somewhere you can take us?” The now quiet man seems to catch on and looks at them shrewdly before nodding. {char.wizard.name} removes the spell without the slightest gesture and the man, having gotten his voice back, whispers “this way” and leads you down an alley. “We are going to have to run. It is quite a while before the edge of the woods where we won’t be in the sight line of the perimeter guard.” He seems to have sobered up quite a bit with the shock of being unable to speak for a while. ${char.assassin.name} says “lead the way”, and you all take off at a run.`, null, theVillage);

//BOSS 1 : Orc Lord
const theOrcLordChoices = {
  lowRoll: new Choice(1, 'Poor Roll', `${char.ogre.name} runs in and slams directly into the Orc Lord trying to keep him busy while ${char.assassin.name} creeps up behind him preparing to cut in to the backs of his knees when the moment is right. The Orc seems to be smarter than he looks because he is on to your tactic and backs up against the wall where ${char.assassin.name} will not be able to get behind him. With the sun in their eyes ${char.wizard.name} and ${char.hunter.name} are not able to successfully put up an attack or defense. Things begin to go sideways and ${char.ogre.name} calls for ${char.assassin.name} to fallback. ${char.assassin.name} throws down vanishing powder and with the explosion your team makes a run for it. You have suffered injuries and will have to find another way into the kingdom.`, null, theWoodsman),
  medRoll: new Choice(2, 'Fair Roll', `${char.ogre.name} runs in and slams directly into the Orc Lord trying to keep him busy while ${char.assassin.name} creeps up behind him preparing to cut in to the backs of his knees when the moment is right. The Orc seems to be smarter than he looks because he is on to your tactic and backs up against the wall where ${char.assassin.name} will not be able to get behind him.${char.wizard.name} puts up a protective shield around ${char.ogre.name} and ${char.assassin.name} trying to prevent the Orc's blows from doing so much damage but it doesn’t seem to be helping much. ${char.hunter.name} is having a hard time aiming with the chaos of the battle and the sun facing towards your group, but with a wish for luck sends a blinding arrow into the Orc's right eye. The monster begins furiously bellowing and stumbles forward while ${char.assassin.name} takes the opportunity to hamstring the foe, and ${char.ogre.name} finishes him off with a few powerful blows to the nose. Your team prevails but not without damages. You enter the kingdom over the body of your conquered enemy.`, loot.orcLordMace, theOldFriend),
  highRoll: new Choice(3, 'Good Roll', `${char.ogre.name} runs in and slams directly into the Orc Lord trying to keep him busy while ${char.assassin.name} creeps up behind him preparing to cut in to the backs of his knees when the moment is right. ${char.wizard.name} puts up a protective shield around ${char.ogre.name} and ${char.assassin.name} trying to prevent the Orc's blows from doing so much damage. ${char.hunter.name} carefully aims and when the moment is right sends a blinding arrow into the Orc's right eye. ${char.assassin.name} takes the opportunity to hamstring the foe, and ${char.ogre.name} finishes him off with a few powerful blows to the nose. Your team prevails with very little in the way of damage and you enter through the gates of the kingdom.`, loot.orcLordMace, theOldFriend)
}
const theOrcLord = new Scenario('Battling the Orc Lord', 'Your team decides the best way through a wall is over the dead body of an Orc so you prepare for battle.', 'roll the dice', theOrcLordChoices)


// At the wall
const atTheWallChoices = {
  choice1: new Choice(1, 'Battle the Orc', 'Do you fight the orc, knowing that supplies are low and you don’t have any healing potions or bandages if someone gets hurt?', null, theOrcLord),
  choice2: new Choice(2, 'Go Around', 'Do you try to find another way through the wall and avoid the Orc?', null, theWoodsman)
}

const atTheWall = new Scenario('At the Wall', `Having received the villagers plea and decided to answer their cries, your motley band of mighty warriors has traveled for days and finally you see the walls of the kingdom before you. ${char.ogre.name} jokes “Only a small man would build such tall walls!” ${char.assassin.name} replies “definitely overcompensating for something…” As the hulking walls get closer you begin to see what appears to be an Orc Lord guarding a gate.`, `Your group stops to discuss your options…`, atTheWallChoices);


// intro
const intro = new Scenario('Introduction', 'In the beginning, the people welcomed a rich and powerful lord as their king, not knowing that the he would take over the land and bring famine and disease to the people. He taxed the poor and spared the rich. He built walls, really tall walls, around the kingdom to keep out the surrounding nations. Due to the king’s rule, villainess monsters have moved in and flourish in the kingdom. They prey on the poor villagers. Emboldened by the king’s tyranny, the monsters have come out of hiding to rain terror upon the land. A secret rebellion has formed amongst the kingdom’s villages. A messenger has been sent to sneak out and find your legendary band of warriors to plea for your aid, in overturning the evil kings reign.',null, null);




module.exports = {
  intro,
  atTheWall,
  theOrcLord,
  theOldFriend,
  theWoodsman,
  cityAroundThePalace,
  hornedAnimal,
  mageSmith
}

