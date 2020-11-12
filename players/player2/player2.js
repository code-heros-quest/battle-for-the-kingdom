'use strict';
const ioClient = require('socket.io-client');
const client = ioClient('ws://localhost:3000');
const inquirer = require('inquirer');
const chalk = require('chalk');

let role = 'Warrior';

client.on('connect', () => {
  welcomeScene();
});

client.on('intro', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  readyStatus('introReady');
})
client.on('atTheWall', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  choiceFunction2(scenario, 'atTheWallChoice');
})
client.on('atTheWallChosen', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  if (scenario.name === 'Battling the Orc Lord') {
    roll(scenario, 'theOrcLordRoll');
  } else {
    roll(scenario, 'theWoodsmanRoll');
  } 
})
client.on('theWoodsManResult', result => {
  spaces();
  console.log(result.choiceName);
  console.log(chalk.inverse(result.dialogue))
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
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  readyStatus('theOldFriendReady');
})
client.on('theVillage', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  choiceFunction2(scenario, 'theVillageChoice');
})
client.on('theVillageChosen', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  if (scenario.name === 'The Goblin') {
    roll(scenario, 'theGoblinRoll');
  } else {
    readyStatus('thePoisonousBiteReady');
  }
})
client.on('theGoblinResult', result => {
  spaces();
  console.log(result.choiceName)
  console.log(chalk.inverse(result.dialogue))
  readyStatus('theGoblinReady');
});
client.on('theTroll', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  roll(scenario, 'theTrollRoll');
})
client.on('theTrollResult', result => {
  spaces();
  console.log(result.choiceName)
  console.log(chalk.inverse(result.dialogue))
  readyStatus('theTrollReady');
})
client.on('theMerchant', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  riddle(scenario, 'theMerchantRiddle', role);
})
client.on('theMerchantRiddleAnswer', results => {
  spaces();
  console.log(results)
})
client.on('theMerchantResults', results => {
  spaces();
  console.log(chalk.inverse(results.dialogue))
  readyStatus('theMerchantReady');
})
client.on('theWitch', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  riddle(scenario, 'theWitchRiddle');
});
client.on('theWitchRiddleAnswer', results => {
  spaces();
  console.log(results)
})
client.on('theWitchResults', results => {
  spaces();
  console.log(chalk.inverse(results.dialogue))
  readyStatus('theWitchReady');
})
client.on('theHydra', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  roll(scenario, 'theHydraRoll');
});
client.on('theHydraResult', result => {
  spaces();
  console.log(result.choiceName);
  console.log(chalk.inverse(result.dialogue))
  readyStatus('theHydraReady');
});
client.on('rebellion', scenario => {
  spaces;
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  roll(scenario, 'rebellionRoll');
})
client.on('rebellionResult', result => {
  spaces();
  console.log(result.choiceName);
  console.log(chalk.inverse(result.dialogue))
  readyStatus('rebellionReady');
})
client.on('cityAroundThePalace', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  choiceFunction3(scenario, 'cityAroundThePalaceChoice');
})
client.on('cityAroundThePalaceChosen', choice => {
  spaces();
  console.log(choice.choiceName)
  console.log(choice.dialogue);
  readyStatus('cityAroundThePalaceReady');
});
client.on('hornedAnimal', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  readyStatus('hornedAnimalReady');
})
client.on('mageSmith', scenario => {
  spaces();
  console.log(chalk.green(scenario.name));
  console.log(chalk.inverse(scenario.dialogue));
  choiceFunction3(scenario, 'mageSmithChoice');
})
client.on('mageSmithChosen', choice => {
  spaces();
  console.log(choice.choiceName)
  console.log(choice.dialogue);
  readyStatus('mageSmithReady');
})
client.on('theKing', scenario => {
})
client.on('disconnect', message => {
  console.log(chalk.red('DISCONNECTED!', message));
})
client.on('gameOver', message => {
  spaces();
  console.log(message.name);
  console.log(message.dialogue);
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



  //-----------READY FUNCTION----------//
  function readyStatus(emitStr) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: 'Hit return to proceed',
          name: 'Answer',
        },
      ])
      .then(choice => {
        let status = null;
        if (choice) {
          status = 'Player ready'
        }
        client.emit(emitStr, status);
        console.log(chalk.green(status));
      })
      .catch(error => {
        if (error.isTtyError) {
          //Prompt couldn't be rendered in the current environment
          console.log(error)
        } else {
          console.log(chalk.red('Something else when wrong'))
        }
      });
  }


  //---------- DICE ROLL FUNCTION -----------//

  function roll(scenario, emitStr) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          message: scenario.choiceQuestion,
          name: 'Answer',
        },
      ])
      .then(choice => {
        let randomNumber = Math.floor((Math.random() * 6) + 1);
        client.emit(emitStr, randomNumber);
        console.log(chalk.bgBlue('You rolled a ', randomNumber));
      })
      .catch(error => {
        if (error.isTtyError) {
          //Prompt couldn't be rendered in the current environment
          console.log(error)
        } else {
          console.log(chalk.red('Something else when wrong'))
        }
      });
  }

function spaces() {
  console.log('');
  console.log('');
}

//////////////////////////////////////////////////
function charName(emitStr) {
  inquirer
  .prompt([
    {
      name: 'name',
      message: `Welcome ${role}, please enter your name`,
      default: `type your name and press enter`,
    },
  ])
  .then(answer => {
    if (answer.name === 'type your name and press enter') {
      answer.name = 'Silent Crash';
    }
    let payload = { name: answer.name, charClass: role }
    client.emit(emitStr, payload);
  });
}

function welcomeScene() {
  let story = `You were the first born of Iron Jaw, the arrogant ruler of the Ogre Kingdom, and were originally named Bristle Beard at birth. You were abandoned by your parents at a young age, since they considered you an embarrassment due to your unusually gentle features. As such, you grew up alone, knowing only your name but not who were. Living such a life, you soon took interest in local brawl fights with other Ogres. Nuturing your combat skills in a somewhat unique way, you soon became known as “The Ogre Warrior", the most talented and powerful in the kingdom, admired and worshiped by others. Then one day you were defeated by a youth from a far-off land. As a prodigy, your confidence had never been so knocked, and finally you blamed it on your own weakness. To become stronger and much more powerful, you chose to enter the life a mecenary and started your self-training with a powerful enchanted stone. Only the strongest ogre can channel the Twilight Orb, though you knew it would become much harder than you could ever imagine. You joined with a mixed band of warriors who have become renowned for your heroic deeds and prowess in battle.`
  console.log(`Your Story: ${story}`);
  spaces();
}

