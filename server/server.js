'use strict';

const io = require('socket.io')(3000);
const hub = io.of('/server');
const inquirer = require('inquirer');


const scenario = require('../scenario.js');
const char = require('../characters.js');
const loot = require('../loot.js');


let welcomeObj = {
    intro: 'welcome to the Code Quest'
}
let readyCount = 0;
let counter = 0;
let ch1 = 0;
let ch2 = 0;
let ch3 = 0;
let tempArr = [];
let choiceArr = [];
let playerCount = 0;
let riddleCount = 0;

io.on('connection', (socket) =>{
  counter++;
  if(counter === 4){
    console.log(`${socket.id} has connected`);
    io.emit('intro', scenario.intro)
    //io.emit('theMerchant', scenario.theMerchant)

  }
    socket.on('introReady', ready => {
      readyStatus(ready, 'atTheWall', scenario.atTheWall);
      
    })

    socket.on('atTheWallChoice', choices => {
      console.log('I am in atTheWallChoice');
      choiceVote(choices, 'atTheWallChosen', scenario.theOrcLord, scenario.theWoodsman, null)

    })
    socket.on('theWoodsmanRoll', rolls => {
      dicePick(0, 0, 0, 0, 0, rolls, 'theWoodsManResult', scenario.theWoodsman.choices.lowRoll, scenario.theWoodsman.choices.medRoll, scenario.theWoodsman.choices.highRoll);
      // evaluate rolls and affect player health, 
    })
    socket.on('theWoodsmanReady', ready => {
      readyStatus(ready, 'theVillage', scenario.theVillage)
    })
    socket.on('theOrcLordRoll', rolls => {
      console.log('evaluating orc lord roll');
      dicePick(58, 66, 10, 5, 0, rolls, 'theOrcLordResult', scenario.theOrcLord.choices.lowRoll, scenario.theOrcLord.choices.medRoll, scenario.theOrcLord.choices.highRoll)
    })
    socket.on('theOrcLordReady', ready => {
      readyStatus(ready, 'theOldFriend', scenario.theOldFriend);
    })
    socket.on('theOldFriendReady', ready => {
      readyStatus(ready, 'theVillage', scenario.theVillage);
    })
    socket.on('theVillageChoice', choices => {
      choiceVote(choices, 'theVillageChosen', scenario.theGoblin, scenario.thePoinsonousBite, null)
    })
    socket.on('theGoblinRoll', rolls => {
      dicePick(58, 66, 10, 5, 0, rolls, 'theGoblinResult', scenario.theGoblin.choices.lowRoll, scenario.theGoblin.choices.medRoll, scenario.theGoblin.choices.highRoll)
    })
    socket.on('theGoblinReady', ready => {
      readyStatus(ready, 'theTroll', scenario.theTroll);
    })
    socket.on('thePoisonousBiteReady', ready => {
      affectForHealth(5);
      readyStatus(ready, 'theTroll', scenario.theTroll);
    })
    socket.on('theTrollRoll', rolls => {
      dicePick(58, 66, 10, 5, 0, rolls, 'theTrollResult', scenario.theTroll.choices.lowRoll, scenario.theTroll.choices.medRoll, scenario.theTroll.choices.highRoll)
    })
    socket.on('theTrollReady', ready => {
      readyStatus(ready, 'theMerchant', scenario.theMerchant);
    })
    socket.on('theMerchantRiddle', payload => {
      riddleCount += riddleEvaluator(payload, scenario.theMerchant.choices, 'theMerchantRiddleAnswer')
      if (playerCount === 4) {
        if (riddleCount > 2) {
          io.emit('theMerchantResults', scenario.theMerchant.choices.choice4);
        } else {
          io.emit('theMerchantResults', scenario.theMerchant.choices.choice3);
        }
        playerCount = 0;
        riddleCount = 0;
      }
    })
    socket.on('theMerchantReady', ready => {
      readyStatus(ready, 'theWitch', scenario.theWitch);
    })
    socket.on('theWitchRiddle', payload => {
      riddleCount += riddleEvaluator(payload, scenario.theWitch.choices, 'theWitchRiddleAnswer')
      if (playerCount === 4) {
        if (riddleCount > 2) {
          io.emit('theWitchResults', scenario.theWitch.choices.choice4);
          char.wizzard.activateLoot(loot.gnarledStaff);
        } else {
          io.emit('theWitchResults', scenario.theWitch.choices.choice3);
        }
        playerCount = 0;
        riddleCount = 0;
      }
    })
    socket.on('theWitchReady', ready => {
      readyStatus(ready, 'theHydra', scenario.theHydra);
    })
    socket.on('theHydraRoll', rolls => {
      dicePick(62, 74, 40, 20, 10, rolls, 'theTrollResult', scenario.theTroll.choices.lowRoll, scenario.theTroll.choices.medRoll, scenario.theHydra.choices.highRoll)
    })
    socket.on('theHydraReady', ready => {
      readyStatus(ready, 'rebellion', scenario.rebellion);
    })
    socket.on('rebellionRoll', rolls => {
      dicePick(0, 0, 0, 0, 0, rolls, 'rebellionResult', scenario.rebellion.choices.lowRoll, scenario.theWoodsman.choices.medRoll, scenario.theWoodsman.choices.highRoll);
    })
    socket.on('rebellionReady', ready => {
      readyStatus(ready, 'cityAroundThePalace', scenario.cityAroundThePalace);
    })
    socket.on('cityAroundThePalaceChoice', choices => {
      choiceVote(choices, 'cityAroundThePalaceChosen', scenario.cityAroundThePalace.choices.choice1, scenario.cityAroundThePalace.choices.choice2, scenario.cityAroundThePalace.choices.choice3)
    })
    socket.on('cityAroundThePalaceReady', ready => {
      readyStatus(ready, 'hornedAnimal', scenario.hornedAnimal);
    })
    socket.on('hornedAnimalReady', ready => {
      readyStatus(ready, 'mageSmith', scenario.mageSmith);
    })
    socket.on('mageSmithChoice', choices => {
      choiceVote(choices, 'mageSmithChosen', scenario.mageSmith.choices.choice1, scenario.mageSmith.choices.choice2, scenario.mageSmith.choices.choice3)
    })
    socket.on('mageSmithReady', ready => {
  
      readyStatus(ready, 'theKing', scenario.theKing);
      
    })



    //------------------ READY FUNCTION ----------------//
    function readyStatus (result, emitStr, scenario) { 
          if(result){
            readyCount++;
          }
          if(readyCount === 4){
            io.emit(emitStr, scenario);
            console.log('ready count has reached 4');
            readyCount = 0;
          }
          else{
            console.log(readyCount, ' is the count');
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
          io.emit(emitStr, choice1);
          tempArr = [];
        } else if(ch2 > ch1 && ch2 > ch3){
          io.emit(emitStr, choice2);
          tempArr = [];
        } else if (ch3 > ch2 && ch3 > ch1){
          io.emit(emitStr, choice3);
          tempArr = [];
        }
        else {
          let randChoice = [null, choice1, choice2, choice3];
          let answer = Math.floor(Math.random() * (tempArr.length - 1) + 1);
          io.emit(emitStr, randChoice[answer]);
          tempArr = [];
        }
      
      } 
    }

    // ---------- individual riddle eval ------------- //
    function riddleEvaluator(payload, scenario, emitStr) {
      playerCount++
      let possibleLoot = scenario.choice2.lootObject;
      let answerArray = scenario.choice2.choiceName;
      let correctDialogue = scenario.choice2.dialogue;
      let incorrectDialogue = scenario.choice1.dialogue;
      if (answerArray.includes(payload.answer.toLowerCase())) {
        socket.emit(emitStr, correctDialogue);
        console.log(payload);
        evaluateForLootRiddle(possibleLoot, payload);
        return 1
      } else {
        socket.emit(emitStr, incorrectDialogue);
      }
    }
   // ---------- DICE PICK ------------- //

    
    
    function dicePick(low, med, dam1, dam2, dam3, result, emitStr, choice1, choice2, choice3){
      let stats = currentStats();
      console.log('in function dice roll');
      console.log('I am the result ' + result);
      playerCount++;
      choiceArr.push(result);
      let count = 0;
      console.log(choiceArr);
      if(playerCount === 4){
        console.log('this how many rolls', playerCount);
        for (let i = 0; i < choiceArr.length; i++){
          count += parseInt(choiceArr[i]);     
        }
        count += stats.attack;
        console.log(count);
        if(count <= low){
          console.log('bad roll');
          io.emit(emitStr, choice1)
          affectForHealth(dam1);
          if (choice1.lootObject) {
            evaluateForLoot(choice1.lootObject);
          }
          choiceArr =[]
          playerCount = 0;
          } 
          else if(count > low && count <= med){
            console.log('med roll');
            io.emit(emitStr, choice2)
            affectForHealth(dam2);
            if (choice2.lootObject) {
              evaluateForLoot(choice2.lootObject);
            }
            choiceArr =[]
            playerCount = 0;
          }
          else if(count > med) {
            console.log('good roll');
            io.emit(emitStr, choice3);
            affectForHealth(dam3);
            if (choice3.lootObject) {
              evaluateForLoot(choice3.lootObject);
            }
            choiceArr =[]
            playerCount = 0;
          }
          else {
            io.emit(emitStr, choice2);
            affectForHealth(dam2);
            if (choice2.lootObject) {
              evaluateForLoot(choice2.lootObject);
            }
            choiceArr =[]
            playerCount = 0;
          }
          
    }
  }
})

function currentStats() {
  let statObj = { health: 0, attack: 0};
  for (const character in char) {
    statObj.health += char[character].stats.health;
    statObj.attack += char[character].stats.attack;
  }
  console.log(statObj);
  return statObj;
}

function evaluateForLoot(lootArray) {
  console.log('evaluating for loot');
  for (const character in char) {
    console.log(char[character])
    lootArray.forEach(loot => char[character].activateLoot(loot));
    console.log(char[character])
  }
}

function evaluateForLootRiddle(lootArray, payload) {
  for (const character in char) {
    console.log(character)
    if (char[character].charClass === payload.char) {
      console.log(char[character])
      lootArray.forEach(loot => char[character].activateLoot(loot));
      console.log(char[character])
    }
  }
}

function affectForHealth(value) {
  for (const character in char) {
    console.log(char[character])
    char[character].loseHealth(value)
    console.log(char[character])
  }
}

















