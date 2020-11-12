'use strict';
const ioClient = require('socket.io-client');
const client = ioClient('ws://localhost:3000');
const inquirer = require('inquirer');

let role = 'Assassin';

client.on('connect', () => {
  console.log(role, ' Connected')});
client.on('intro', scenario => {
  spaces();
  console.log(scenario.name);
  console.log(scenario.dialogue);
  readyStatus('introReady');
})
client.on('atTheWall', scenario => {
  spaces();
  console.log(scenario.name);
  console.log(scenario.dialogue);
  choiceFunction2(scenario, 'atTheWallChoice');
})
client.on('atTheWallChosen', scenario => {
  spaces();
  console.log(scenario.name);
  console.log(scenario.dialogue);
  roll('theOrcLordRoll');
})
client.on('theWoodsMan', scenario => {
  spaces();
  console.log(scenario.name);
  console.log(scenario.dialogue);
  roll('theWoodsmanRoll')
})
client.on('theWoodsManResult', result => {
  spaces();
  console.log(result.dialogue)
  readyStatus('theWoodsmanReady');
})
client.on('theOrcLordResult', result => {
  spaces();
  console.log(result.choiceName);
  console.log(result.dialogue);
  readyStatus('theOrcLordReady');
})
client.on('theOldFriend', scenario => {
  spaces();
  console.log(scenario.name);
  console.log(scenario.dialogue);
  readyStatus('theOldFriendReady');
})
client.on('theVillage', scenario => {
  spaces();
  console.log(scenario.name);
  console.log(scenario.dialogue);
  choiceFunction2(scenario, 'theVillageChoice');
})
client.on('theVillageChosen', scenario => {
  spaces();
  console.log(scenario.name);
  console.log(scenario.dialogue);
  if (scenario.name === 'The Goblin') {
    roll('theGoblinRoll');
  } else {
    readyStatus('thePoisonousBiteReady');
  }
})
client.on('theGoblinResult', result => {
  console.log(result.dialogue)
  readyStatus('theGoblinReady');
});
client.on('theTroll', scenario => {
  console.log(scenario.name);
  console.log(scenario.dialogue);
  roll('theTrollRoll');
})
client.on('theTrollResult', result => {
  console.log(result.dialogue)
  readyStatus('theTrollReady');
})
client.on('theMerchant', scenario => {
  console.log(scenario.name);
  console.log(scenario.dialogue);
  riddle(scenario, 'theMerchantRiddle', role);
})
client.on('theMerchantRiddleAnswer', results => {
  console.log(results)
})
client.on('theMerchantResults', results => {
  console.log(results.dialogue)
  readyStatus('theMerchantReady');
})
client.on('theWitch', scenario => {
  console.log(scenario.name);
  console.log(scenario.dialogue);
  riddle(scenario, 'theWitchRiddle');
});
client.on('theWitchRiddleAnswer', results => {
  console.log(results)
});
client.on('theWitchResults', results => {
  console.log(results.dialogue)
  readyStatus('theWitchReady');
})
client.on('theHydra', scenario => {
  console.log(scenario.name);
  console.log(scenario.dialogue);
  roll('theHydraRoll');
});
client.on('theHydraResult', result => {
  console.log(result.dialogue)
  readyStatus('theHydraReady');
})
client.on('rebellion', scenario => {
  console.log(scenario.name);
  console.log(scenario.dialogue);
  roll('rebellionRoll');
})
client.on('rebellionResult', result => {
  console.log(result.dialogue)
  readyStatus('rebellionReady');
})
client.on('cityAroundThePalace', scenario => {
  console.log(scenario.name);
  console.log(scenario.dialogue);
  choiceFunction3(scenario, 'cityAroundThePalaceChoice');
})
client.on('cityAroundThePalaceChosen', choice => {
  console.log(choice.dialogue);
  readyStatus('cityAroundThePalaceReady');
});
client.on('hornedAnimal', scenario => {
  console.log(scenario.name);
  console.log(scenario.dialogue);
  readyStatus('hornedAnimalReady');
})
client.on('mageSmith', scenario => {
  console.log(scenario.name);
  console.log(scenario.dialogue);
  choiceFunction3(scenario, 'mageSmithChoice');
})
client.on('mageSmithChosen', choice => {
  console.log(choice.dialogue);
  readyStatus('mageSmithReady');
})
client.on('theKing', scenario => {
})
client.on('disconnect', message => {
  console.log('DISCONNECTED!', message);
})
///////////////////////////////////////////////

function riddle(scenario, emitStr, role) {
  inquirer
  .prompt([
    {
      name: 'guess',
      message: scenario.choiceQuestion,
      default: 'please enter your guess',
    },
  ])
  .then(answer => {
    let payload = { answer: answer.guess, char: role }
    client.emit(emitStr, payload);
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

function spaces() {
  console.log('');
  console.log('');
}