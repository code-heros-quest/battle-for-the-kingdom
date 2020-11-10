'use strict';

const ioClient = require('socket.io-client');
const client = ioClient('ws://localhost:3000');
const inquirer = require('inquirer');



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

client.on('connect', () => {
  console.log('Player Connected');
  client.on('intro', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    // prompt for ready, emit ready check result
  })
  client.on('atTheWall', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    // prompt for choices and return choices
  })
  client.on('atTheWallChosen', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    // prompt for roll return roll results
  })
  client.on('theWoodsManRollResult', result => {
    //console.log(result.dialogue)
  } )



  client.on('cityAroundThePalace', function (data) {
    console.log(data.name);
    console.log(data.dialogue);
     riddle(data);
  });
  client.on('cityAroundThePalaceChoice', payload => console.log(payload.choiceName));
});



function riddle(scenario){
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: scenario.choiceQuestion,
        name: 'Answer',
        choices: [
          new inquirer.Separator('choose one'),
          {
            name: scenario.choices.choice1.choiceName,
          },
          {
            name: scenario.choices.choice2.choiceName,
          },
          {
            name: scenario.choices.choice3.choiceName,
          },
        ],
      },
    ])
    .then(choice => {
      if (choice.Answer[0] === scenario.choices.choice1.choiceName) {
        client.emit('cityAroundThePalace', scenario.choices.choice1)
      } else if (choice.Answer[0] === scenario.choices.choice2.choiceName) {
        client.emit('cityAroundThePalace', scenario.choices.choice2)
      } else if (choice.Answer[0] === scenario.choices.choice3.choiceName) {
        client.emit('cityAroundThePalace', scenario.choices.choice3)
      }
    })
    .catch(error => {
      if(error.isTtyError) {
        //Prompt couldn't be rendered in the current environment
        console.log(error)
      } else {
        console.log('Something else when wrong')
      }
    });
}
  
  
