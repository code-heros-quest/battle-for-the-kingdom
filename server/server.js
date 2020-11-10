'use strict';

const io = require('socket.io')(3000);
const hub = io.of('/server');
const inquirer = require('inquirer');


const scenario = require('../scenario.js')


let welcomeObj = {
    intro: 'welcome to the Code Quest'
}

let counter = 0;
let ch1 = 0;
let ch2 = 0;
let ch3 = 0;
let tempArr = [];

io.on('connection', (socket) =>{
    console.log(`${socket.id} has connected`);
    //socket.emit(intro, scenario.intro);
    socket.on('introReady', ready => {
      //if ready
      //socket.emit('atTheWall', scenario.atTheWall)
    })
    socket.on('atTheWallChoice', choices => {
      //evaluate vote either go on to orc OR woodsman
      //socket.emit('atTheWallChosen', scenario.theOrcLord || scenario.theWoodsman);
    })
    socket.on('theWoodsmanRoll', rolls => {
      // evaluate rolls and affect player health, 
      // socket.emit('theWoodsManRollResult', scenario.theWoodsman.choices//whichChoice);
    })
    socket.on('theWoodsmanReady', ready => {
      //if ready
      //socket.emit('theVillage', scenario.theVillage);
    })
    socket.on('theOrcLordRoll', rolls => {
      // evaluate rolls and affect player health, 
      // add object to player
      // socket.emit('theOrcLordRollResult', scenario.theOrcLord.choices//whichChoice);
    })
    socket.on('theOrcLordReady', ready => {
      //if ready
      //socket.emit('theVillage', scenario.theVillage);
    })
    socket.on('theVillageChoice', choices => {
      //evaluate vote either go on to thePoisonousBite || goblin
      //socket.emit('atTheWallChosen', scenario.thePoisonousBite || scenario.goblin);
    })
    socket.on('theGoblinRoll', rolls => {
      // evaluate rolls and affect player health
      // add object to players 
      // socket.emit('theGoblinResult', scenario.theGoblin.choices//whichChoice);
    })
    socket.on('theGoblinReady', ready => {
      //if ready
      //socket.emit('theTroll', scenario.theTroll);
    })
    socket.on('thePoisonousBiteReady', ready => {
      //affect player health 
      //socket.emit('theTroll', scenario.theTroll);
    })
    socket.on('theTrollRoll', rolls => {
      // evaluate rolls and affect player health
      // add object to players 
      // socket.emit('theTrollResult', scenario.theTroll.choices//whichChoice);
    })
    socket.on('theTrollReady', ready => {
      //if ready
      //socket.emit('theMerchant', scenario.theMerchant);
    })
    socket.on('theMerchantRiddle', answers => {
      //how are we doing this? evaluating by person or as a group?
      // add object to players
      // socket.emit('theMerchantResults', scenario.theMerchant.choices??);
    })
    socket.on('theMerchantReady', ready => {
      //if ready
      //socket.emit('theWitch', scenario.theWitch);
    })
    socket.on('theWitchRiddle', answers => {
      //how are we doing this? evaluating by person or as a group?
      // add object to players - wizard gets staff if over half are right?
      // socket.emit('theWitchResults', scenario.theWitch.choices??);
    })
    socket.on('theWitchReady', ready => {
      //if ready
      //socket.emit('theHydra', scenario.theHydra);
    })
    socket.on('theHydraRoll', rolls => {
      // evaluate rolls and affect player health
      // socket.emit('theHydraResult', scenario.theHydra.choices//whichChoice);
    })
    socket.on('theHydraReady', ready => {
      //if ready
      //socket.emit('rebellion', scenario.rebellion);
    })
    socket.on('rebellionRoll', rolls => {
      /// not sure if this will be a roll or not
      // evaluate rolls and affect player health and object
      // socket.emit('rebellionResult', scenario.rebellion.choices//whichChoice)
    })
    socket.on('rebellionReady', ready => {
      //if ready
      //socket.emit('cityAroundThePalace', scenario.cityAroundThePalace);
    })
    socket.on('cityAroundThePalaceChoice', choices => {
      // evaluate choices
      // socket.emit('cityAroundThePalaceChosen', scenario.cityAroundThePalace.choices//whichChoice);
    })
    socket.on('cityAroundThePalaceReady', ready => {
      // if ready
      //socket.emit('hornedAnimal', scenario.hornedAnimal);
    })
    socket.on('hornedAnimalReady', ready => {
      // if ready
      //socket.emit('mageSmith', scenario.mageSmith);
    })
    socket.on('mageSmithChoice', choices => {
      // evaluate choices
      // award loot
      // socket.emit('mageSmithChosen', scenario.mageSmith.choices ??)
    })
    socket.on('mageSmithReady', ready => {
       // if ready
      //socket.emit('theKing', scenario.theKing);
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
    socket.emit('into', scenario.intro);
    // this gets sent to the client, they read the dialogue, and hit some type of move on button. Then they send move on or whatever and we send the next one... figure out how to wait for all 4
    socket.emit('cityAroundThePalace', scenario.cityAroundThePalace);
    socket.on('cityAroundThePalace', (result) => {
      console.log(result.choiceName);
      choiceVote(result, 'cityAroundThePalaceChosen', scenario.cityAroundThePalace.choices.choice1, scenario.cityAroundThePalace.choices.choice2, scenario.cityAroundThePalace.choices.choice3);
    })

    

    function choiceVote(result, emitStr, choice1, choice2, choice3) {
      tempArr.push(result);
    let ch1 = 0;
    let ch2 = 0;
    let ch3 = 0;
    
      if (tempArr.length === 3){
        for (let i = 0; i < tempArr.length; i++){
        if (tempArr[i].num === 1) {
          ch1++
        } else if (tempArr[i].num === 2) {
          ch2++
        } else if (tempArr[i].num === 3) {
          ch3++
        }
        } if(ch1 > ch2 && ch1 > ch3){
          socket.emit(emitStr, choice1);
        } else if(ch2 > ch1 && ch2 > ch3){
          socket.emit(emitStr, choice2);
        } else if (ch3 > ch2 && ch3 > ch1){
          socket.emit(emitStr, choice3);
        }
        else {
          let randChoice = [null, choice1, choice2, choice3];
          let answer = Math.floor(Math.random() * (tempArr.length - 1) + 1);
          
          socket.emit(emitStr, randChoice[answer]);
        }
      } 
      temp
    
    }
    
    
    
})


   






