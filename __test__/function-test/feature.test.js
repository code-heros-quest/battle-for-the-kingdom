'use strict'

const scenario = require('../../scenario.js')
let { dicePick } = require('./feature.js');
let { riddleEvaluator } = require('./feature.js');
let { readyStatus } = require('./feature.js');
let { evaluateForLoot } = require('./feature.js');
let { gameOver } = require('./feature.js');
let { gameOverHydra } = require('./feature.js');

class Character {
  constructor(name, race, charClass, health, attack) {
    this.name = name;
    this.race = race;
    this.charClass = charClass;
    this.stats = { health: health, attack: attack };
  }
}
class Loot {
constructor(name, role, health, attack) {
  this.name = name;
  this.role = role;
  this.health = health;
  this.attack = attack;
  }   
}

describe('testing the dice roll', () => {
  it('should return poor,medium, or good roll', () => {
  let rolls1 = 4;
  let rolls2= 5;
  let rolls3 = 6;
  let rolls4 = 6;
  dicePick(8, 16, rolls1)
  dicePick(8, 16, rolls2)
  dicePick(8, 16, rolls3)
  expect(dicePick(8, 16, rolls4)).toBe('good roll');
  })
  it('should return a player ready', () =>{
    readyStatus('one', null, null);
    readyStatus('two', null, null);
    readyStatus('three', null, null);
    expect(readyStatus('four', null, null)).toBe('ready count has reached 4');
  })
  it('expect to return a object character', ()=>{
    let strengthSpell = new Loot('Strength Spell', [ 'Warrior', 'Wizard' ], 0, 0);   
    expect(evaluateForLoot([strengthSpell])).toEqual([['Warrior', 'Wizard']]);
  })

  it('should return the correct answer of the riddle', () => {
    expect(riddleEvaluator('footsteps', scenario.theMerchant.choices)).toBe(1);
  })
  it('test to get the response GAME OVER when player is dead.', () =>{
    expect(gameOver()).toEqual('gameOver, One or more of your members have died. You cannot continue.');
  })
  it('it should return gameOver your party has suffered too much damage to continue', () => {

    expect(gameOverHydra(35)).toEqual('gameOver your party has suffered too much damage to continue');
  
  })
});

  
// // ------------------ CHOICE SCENARIOS ----------------//
// function choiceVote(result, emitStr, choice1, choice2, choice3) {
//   tempArr.push(result);
// let ch1 = 0;
// let ch2 = 0;
// let ch3 = 0;

//   if (tempArr.length === 4){
//     for (let i = 0; i < tempArr.length; i++){
//     if (tempArr[i].num === 1) {
//       ch1++
//     } else if (tempArr[i].num === 2) {
//       ch2++
//     } else if (tempArr[i].num === 3) {
//       ch3++
//     }
//     } if(ch1 > ch2 && ch1 > ch3){
//       // io.emit(emitStr, choice1);
//       tempArr = [];
//     } else if(ch2 > ch1 && ch2 > ch3){
//       // io.emit(emitStr, choice2);
//       tempArr = [];
//     } else if (ch3 > ch2 && ch3 > ch1){
//       // io.emit(emitStr, choice3);
//       tempArr = [];
//     }
//     else {
//       let randChoice = [null, choice1, choice2, choice3];
//       let answer = Math.floor(Math.random() * (tempArr.length - 1) + 1);
//       // io.emit(emitStr, randChoice[answer]);
//       tempArr = [];
//     }
  
//   } 
// }