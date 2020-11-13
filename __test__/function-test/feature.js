'use strict'
const scenario = require('../../scenario.js')

var readyCount = 0;
var counter = 0;
var ch1 = 0;
var ch2 = 0;
var ch3 = 0;
var tempArr = [];
var choiceArr = [];
var playerCount = 0;
var riddleCount = 0;



  //------------------ READY FUNCTION ----------------//
  function readyStatus (result, emitStr, scenario) { 
    if(result){
      readyCount++;
    }
    if(readyCount === 4){
      // io.emit(emitStr, scenario);
      return 'ready count has reached 4';
      readyCount = 0;
    }    
  }

    

    
  // ------------------ CHOICE SCENARIOS ----------------//
  function choiceVote(result, emitStr, choice1, choice2, choice3) {
    tempArr.push(result);
  let ch1 = 0;
  let ch2 = 0;
  let ch3 = 0;
  
    if (tempArr.length === 4){
      for (let i = 0; i < tempArr.length; i++){
      if (tempArr[i].num === 1) {
        ch1++
      } else if (tempArr[i].num === 2) {
        ch2++
      } else if (tempArr[i].num === 3) {
        ch3++
      }
      } if(ch1 > ch2 && ch1 > ch3){
        // io.emit(emitStr, choice1);
        tempArr = [];
      } else if(ch2 > ch1 && ch2 > ch3){
        // io.emit(emitStr, choice2);
        tempArr = [];
      } else if (ch3 > ch2 && ch3 > ch1){
        // io.emit(emitStr, choice3);
        tempArr = [];
      }
      else {
        let randChoice = [null, choice1, choice2, choice3];
        let answer = Math.floor(Math.random() * (tempArr.length - 1) + 1);
        // io.emit(emitStr, randChoice[answer]);
        tempArr = [];
      }
    
    } 
  }

  // ---------- individual riddle eval ------------- //
  function riddleEvaluator(payload, scenario) {
    playerCount++
    let possibleLoot = scenario.choice2.lootObject;
    let answerArray = scenario.choice2.choiceName;
    let correctDialogue = scenario.choice2.dialogue;
    let incorrectDialogue = scenario.choice1.dialogue;
    if (answerArray.includes(payload)) {
      // socket.emit(emitStr, correctDialogue);
      console.log(payload);
      // evaluateForLootRiddle(possibleLoot, payload);
      return 1
    } else {
      console.log('wrong')
    }
  }

   // ---------- DICE PICK FOR LUCK ------------- //

  
  
   function dicePickLuck(low, med, dam1, dam2, dam3, result, emitStr, choice1, choice2, choice3){
    let stats = currentStats();
    // console.log('in function dice roll');
    // console.log('I am the result ' + result);
    playerCount++;
    choiceArr.push(result);
    let count = 0;
    // console.log(choiceArr);
    if(playerCount === 4){
      // console.log('this how many rolls', playerCount);
      for (let i = 0; i < choiceArr.length; i++){
        count += parseInt(choiceArr[i]);     
      }
      // console.log(count);
      if(count <= low){
        // console.log(count, ' <= ', low)
        // console.log('bad roll');
        // io.emit(emitStr, choice1)
        affectForHealth(dam1);
        if (choice1.lootObject) {
          evaluateForLoot(choice1.lootObject);
        }
        choiceArr =[]
        playerCount = 0;
        } 
        else if(count > low && count <= med){
          // console.log(count, ' > ', low, ' && ', count, ' <= ', med)
          // console.log('med roll');
          // io.emit(emitStr, choice2)
          affectForHealth(dam2);
          if (choice2.lootObject) {
            evaluateForLoot(choice2.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        }
        else if(count > med) {
          // console.log(count, ' > ', med);
          // console.log('good roll');
          // io.emit(emitStr, choice3);
          affectForHealth(dam3);
          if (choice3.lootObject) {
            evaluateForLoot(choice3.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        }
        else {
          // io.emit(emitStr, choice2);
          affectForHealth(dam2);
          if (choice2.lootObject) {
            evaluateForLoot(choice2.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        } 
    }
  }
  // ---------- DICE PICK ------------- //

  
  
  function dicePick(low, med, result){
    // let stats = currentStats();
    // console.log('in function dice roll');
    // console.log('I am the result ' + result);
    playerCount++;
    choiceArr.push(result);
    let count = 0;
    // console.log(choiceArr);
    if(playerCount === 4){
      // console.log('this how many rolls', playerCount);
      for (let i = 0; i < choiceArr.length; i++){
        count += parseInt(choiceArr[i]);     
      }
      // count += stats.attack;
      // console.log(count);
      if(count <= low){
        // console.log(count, ' <= ', low)
        // console.log('bad roll');
        // io.emit(emitStr, choice1)
        affectForHealth(dam1);
        if (choice1.lootObject) {
          evaluateForLoot(choice1.lootObject);
        }
        choiceArr =[]
        playerCount = 0;
        } 
        else if(count > low && count <= med){
          // console.log(count, ' > ', low, ' && ', count, ' <= ', med)
          // console.log('med roll');
          // io.emit(emitStr, choice2)
          affectForHealth(dam2);
          if (choice2.lootObject) {
            evaluateForLoot(choice2.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        }
        else if(count > med) {
          // console.log(count, ' > ', med);
          // console.log('good roll');
          return 'good roll';
          // io.emit(emitStr, choice3);
          affectForHealth(dam3);
          if (choice3.lootObject) {
            evaluateForLoot(choice3.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
        }
    //     else {
    //       // io.emit(emitStr, choice2);
    //       // affectForHealth(dam2);
    //       if (choice2.lootObject) {
    //         evaluateForLoot(choice2.lootObject);
    //       }
    //       choiceArr =[]
    //       playerCount = 0;
    //     } 
    // }
  }

  // function currentStats() {
  //   let statObj = { health: 0, attack: 0};
  //   for (const character in char) {
  //     statObj.health += char[character].stats.health;
  //     statObj.attack += char[character].stats.attack;
  //   }
  //   console.log(statObj);
  //   return statObj;
  // }
}

function evaluateForLoot(lootArray) {
  // console.log('evaluating for loot');
    // lootArray.forEach(loot => char[character].activateLoot(loot));
    let role = [];
    lootArray.forEach(each => {
      let one = each.role;
      role.push(one);
    });
    return role;
  //  console.log(lootArray);
    // console.log(char[character])
  // }
}
function evaluateForLootRiddle(lootArray, payload) {
    for (const character in char) {
      // console.log(character)
      if (char[character].charClass === payload.char) {
        // console.log(char[character])
        lootArray.forEach(loot => char[character].activateLoot(loot));
      
        // console.log(char[character])
      }
    }
  }
    
  // function affectForHealth(value) {
  //   for (const character in char) {
  //     console.log(char[character])
  //     char[character].loseHealth(value)
  //     if (char[character].stats.health < 1) {
  //       gameOver();
  //     }
  //     console.log(char[character])
  //   }
  // }
    
  function gameOver(){
    // let stats = currentStats();
    // console.log(stats.health);
    // io.emit('gameOver', 'One or more of your members have died. You cannot continue.' );
    return 'gameOver, One or more of your members have died. You cannot continue.' ;
    // socket.disconnect();
  }

  function gameOverHydra(health){
    let stats = health;
    // console.log(stats.health);
    if (stats < 40) {
    return 'gameOver your party has suffered too much damage to continue';
    }
  }

  
module.exports = {
  dicePick,
  gameOver,
  gameOverHydra,
  evaluateForLootRiddle,
  evaluateForLootRiddle,
  dicePickLuck,
  riddleEvaluator,
  choiceVote,
  readyStatus,
  evaluateForLoot,
}