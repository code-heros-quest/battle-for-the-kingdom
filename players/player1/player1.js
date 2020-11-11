'use strict';
const ioClient = require('socket.io-client');
const client = ioClient('ws://localhost:3000');
const inquirer = require('inquirer');


client.on('connect', () => {
  console.log('Player Connected');
  client.on('intro', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    readyStatus('introReady');
    // prompt for ready, emit ready check result
  })
  client.on('atTheWall', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    choiceFunction2(scenario, 'atTheWallChoice');
  })
  client.on('atTheWallChosen', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);

    // prompt for roll return roll results
  })
  client.on('theWoodsMan', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    roll('theWoodsmanRoll')
    // prompt for roll return roll results
  })
  client.on('theWoodsManRollResult', result => {

    //console.log(result.dialogue)
    // prompt for ready, emit ready check
  } )
  client.on('theOrcLordRollResult', result => {
    //console.log(result.dialogue)
    // prompt for ready, emit ready check - theOrcLordReady
  })
  client.on('theVillage', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    choiceFunction2(scenario, 'theVillageChoice');
  })
  client.on('theVillageChosen', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    if (scenario.name === 'The Goblin') {
      // prompt for roll return roll results
    } else {
      // it is the poisonousSpider, prompt for ready and return results
    }
  })
  client.on('theGoblinResult', result => {
    //console.log(result.dialogue)
    // prompt for ready, emit ready check - theGoblinReady
  });
  client.on('theTroll', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    // prompt for roll return roll results
  })
  client.on('theTrollResult', result => {
    //console.log(result.dialogue)
    // prompt for ready, emit ready check - theTrollReady
  })
  client.on('theMerchant', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    riddle(scenario, 'theMerchantRiddle');
  })
  client.on('theMerchantResults', results => {
    //console.log(result.dialogue)
    // prompt for ready, emit ready check - theMerchantReady
  })
  client.on('theWitch', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    riddle(scenario, 'theWitchRiddle');
  });
  client.on('theWitchResults', results => {
    //console.log(result.dialogue)
    // prompt for ready, emit ready check - theWitchReady
  })
  client.on('theHydra', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    // prompt for roll return roll results
  });
  client.on('theHydraResult', result => {
    //console.log(result.dialogue)
    // prompt for ready, emit ready check - theHydraReady
  })
  client.on('rebellion', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    // prompt for roll return roll results
  })
  client.on('rebellionResult', result => {
    //console.log(result.dialogue)
    // prompt for ready, emit ready check - rebellionReady
  })
  client.on('cityAroundThePalace', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    choiceFunction3(scenario, 'cityAroundThePalaceChoice');
  })
  client.on('cityAroundThePalaceChosen', choice => {
    console.log(choice.dialogue);
    // prompt for ready, emit ready check - cityAroundThePalaceReady
  });
  client.on('hornedAnimal', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    // prompt for ready, emit ready check - hornedAnimalReady
  })
  client.on('mageSmith', scenario => {
    console.log(scenario.name);
    console.log(scenario.dialogue);
    choiceFunction3(scenario, 'mageSmithChoice');
  })
  client.on('mageSmithChosen', choice => {
    console.log(choice.dialogue);
    // prompt for ready, emit ready check - mageSmithReady
  })
  client.on('theKing', scenario => {
  })
});
function riddle(scenario, emitStr) {
  inquirer
  .prompt([
    {
      name: 'guess',
      message: scenario.choiceQuestion,
      default: 'please enter your guess',
    },
  ])
  .then(answer => {
    client.emit(emitStr, answer.guess);
  });
}
function choiceFunction2(scenario, emitStr){
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
        ],
      },
    ])
    .then(choice => {
      if (choice.Answer[0] === scenario.choices.choice1.choiceName) {
        client.emit(emitStr, scenario.choices.choice1)
      } else if (choice.Answer[0] === scenario.choices.choice2.choiceName) {
        client.emit(emitStr, scenario.choices.choice2)
      } else {
        client.emit(emitStr, scenario.choices.choice2)
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
function choiceFunction3(scenario, emitStr){
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
        client.emit(emitStr, scenario.choices.choice1)
      } else if (choice.Answer[0] === scenario.choices.choice2.choiceName) {
        client.emit(emitStr, scenario.choices.choice2)
      } else if (choice.Answer[0] === scenario.choices.choice3.choiceName) {
        client.emit(emitStr, scenario.choices.choice3)
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



  //-----------READY FUNCTION----------//
  function readyStatus (emitStr) {
    inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'TYPE Y IF YOU"RE READY TO PROCEED',
        name: 'Answer',
      },
    ])
    .then(choice => {
      let status = null;
      if(choice) {
        status = 'Player ready'
      }
      client.emit(emitStr, status);
      console.log(status);
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


  //---------- DICE ROLL FUNCTION -----------//

function roll(emitStr){
  inquirer
  .prompt([
    {
      type: 'confirm',
      message: 'ROLL THE DICE TO SEE YOUR FUTURE MY LORD',
      name: 'Answer',
    },
  ])
  .then(choice => {
    let randomNumber = Math.floor((Math.random() * 6) + 1);
    client.emit(emitStr, randomNumber);
    console.log('You rolled a ', randomNumber);
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




