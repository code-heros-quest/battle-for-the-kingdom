'use strict';

const io = require('socket.io')(3000);
const hub = io.of('/server');
const inquirer = require('inquirer');


const scenario = require('../scenario.js');
const char = require('../characters.js');


let welcomeObj = {
    intro: 'welcome to the Code Quest'
}
let readyCount = 0;
let counter = 0;
let ch1 = 0;
let ch2 = 0;
let ch3 = 0;
let tempArr = [];

io.on('connection', (socket) =>{
  counter++;
  if(counter === 4){
    console.log(`${socket.id} has connected`);
    io.emit('intro', scenario.intro)

  }
    socket.on('introReady', ready => {
      readyStatus(ready, 'atTheWall', scenario.atTheWall);
      
    })

    socket.on('atTheWallChoice', choices => {
      choiceVote(choices, 'atTheWallChosen', scenario.theOrcLord, scenario.theWoodsman, null)

    })
    socket.on('theWoodsmanRoll', rolls => {
      dicePick(rolls, 'theWoodsManRollResult', scenario.theWoodsman.choices.choice1, scenario.theWoodsman.choices.choice2, scenario.theWoodsman.choices.choice3);
      // evaluate rolls and affect player health, 
    })
    socket.on('theWoodsmanReady', ready => {
      readyStatus(ready, 'theVillage', scenario.theVillage)
    })
    socket.on('theOrcLordRoll', rolls => {
      // evaluate rolls and affect player health, 
      // add object to player
      dicePick(rolls, 'theOrcLordRollResult', scenario.theOrcLord.choices.choice1, scenario.theOrcLord.choices.choice2, scenario.theOrcLord.choices.choice3)
    })
    socket.on('theOrcLordReady', ready => {
      readyStatus(ready, 'atTheWall', scenario.atTheWall)
      socket.emit('theVillage', scenario.theVillage);
    })
    socket.on('theVillageChoice', choices => {
      choiceVote(choices, theVillageChosen, scenario.theGoblin, scenario.thePoinsonousBite, null)
    })
    socket.on('theGoblinRoll', rolls => {
      dicePick(rolls, 'theGoblinResult', scenario.theGoblin.choices.choice1, scenario.theGoblin.choices.choice2, scenario.theGoblin.choices.choice3)
      // evaluate rolls and affect player health
      // add object to players 
    })
    socket.on('theGoblinReady', ready => {
      readyStatus(ready, 'theTroll', scenario.theTroll);
    })
    socket.on('thePoisonousBiteReady', ready => {
      //affect player health 
      readyStatus(ready, 'theTroll', scenario.theTroll);
    })
    socket.on('theTrollRoll', rolls => {
      // evaluate rolls and affect player health
      // add object to players 
      dicePick(rolls, 'theTrollResult', scenario.theTroll.choices.choice1, scenario.theTroll.choices.choice2, scenario.theTroll.choices.choice3)
    })
    socket.on('theTrollReady', ready => {
    
      readyStatus(ready, 'theMerchant', scenario.theMerchant);
    })
    socket.on('theMerchantRiddle', answers => {
      //how are we doing this? evaluating by person or as a group?
      // add object to players
      // socket.emit('theMerchantResults', scenario.theMerchant.choices??);
    })
    socket.on('theMerchantReady', ready => {
      readyStatus(ready, 'theWitch', scenario.theWitch);
    })
    socket.on('theWitchRiddle', answers => {
      //how are we doing this? evaluating by person or as a group?
      // add object to players - wizard gets staff if over half are right?
      // socket.emit('theWitchResults', scenario.theWitch.choices??);
    })
    socket.on('theWitchReady', ready => {
      readyStatus(ready, 'theHydra', scenario.theHydra);
    })
    socket.on('theHydraRoll', rolls => {
      // evaluate rolls and affect player health
      // socket.emit('theHydraResult', scenario.theHydra.choices//whichChoice);
    })
    socket.on('theHydraReady', ready => {
      readyStatus(ready, 'rebellion', scenario.rebellion);
    })
    socket.on('rebellionRoll', rolls => {
      /// not sure if this will be a roll or not
      // evaluate rolls and affect player health and object
      // socket.emit('rebellionResult', scenario.rebellion.choices//whichChoice)
    })
    socket.on('rebellionReady', ready => {
      readyStatus(ready, 'cityAroundThePalace', scenario.cityAroundThePalace);
    })
    socket.on('cityAroundThePalaceChoice', choices => {
      // evaluate choices
      // socket.emit('cityAroundThePalaceChosen', scenario.cityAroundThePalace.choices//whichChoice);
    })
    socket.on('cityAroundThePalaceReady', ready => {
      readyStatus(ready, 'hornedAnimal', scenario.hornedAnimal);
    })
    socket.on('hornedAnimalReady', ready => {
      readyStatus(ready, 'mageSmith', scenario.mageSmith);
    })
    socket.on('mageSmithChoice', choices => {
      // evaluate choices
      // award loot
      // socket.emit('mageSmithChosen', scenario.mageSmith.choices ??)
    })
    socket.on('mageSmithReady', ready => {
  
      readyStatus(ready, 'theKing', scenario.theKing);
      
    })



    //emit for each senario
    //on for each scenario
  //   intro,
  //   atTheWall,
  //   theOrcLord, *
  //   theOldFriend, *
  //   theWoodsman, *
  //   theVillage,
  //   thePoisonousBite, *
  //   theGoblin, *
  //   theTroll,
  //   theMerchant,
  //   theWitch,
  //   theHydra,
  //   rebellion
  //   cityAroundThePalace,
  //   hornedAnimal,
  //   mageSmith
  //   theKing
    // socket.emit('into', scenario.intro);
    // this gets sent to the client, they read the dialogue, and hit some type of move on button. Then they send move on or whatever and we send the next one... figure out how to wait for all 4
    // socket.emit('cityAroundThePalace', scenario.cityAroundThePalace);
    // socket.on('cityAroundThePalace', (result) => {
    //   console.log(result.choiceName);
    //   choiceVote(result, 'cityAroundThePalaceChosen', scenario.cityAroundThePalace.choices.choice1, scenario.cityAroundThePalace.choices.choice2, scenario.cityAroundThePalace.choices.choice3);
    // })



    //------------------ READY FUNCTION ----------------//
    function readyStatus (result, emitStr, scenario) { 
          if(result){
            readyCount++;
          }
          if(readyCount === 4){
            io.emit(emitStr, scenario);
            console.log('readycount was 1');
            readyCount = 0;
          }
          else{
            console.log('issue in count');
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
        } else if(ch2 > ch1 && ch2 > ch3){
          io.emit(emitStr, choice2);
        } else if (ch3 > ch2 && ch3 > ch1){
          io.emit(emitStr, choice3);
        }
        else {
          let randChoice = [null, choice1, choice2, choice3];
          let answer = Math.floor(Math.random() * (tempArr.length - 1) + 1);
          io.emit(emitStr, randChoice[answer]);
        }
      
      } 
    }

   // ---------- DICE PICK ------------- //
    function dicePick(result, emitStr, choice1, choice2, choice3){
      
      let choiceArr = [];
      choiceArr.push(result);
      let count = 0;
      console.log(choiceArr);
  
      for (let i = 0; i < choiceArr.length; i++){
       count += parseInt(choiceArr[i]);     
       }
       if(count <= 8){
         socket.emit(emitStr, choice1)
        //  for (character in char) {
        //    character.loseHealth(choice1.fightDamage)
        //  }
       } 
       else if(count > 8 && count <= 16){
         socket.emit(emitStr, choice2)
       }
       else if(count >= 16) {
         socket.emit(emitStr, choice3);
       }
       else {
         socket.emit(emitStr, choice2);
       }
     
     }
})


   






