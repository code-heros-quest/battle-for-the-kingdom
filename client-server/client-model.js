'use strict';

const ioClient = require('socket.io-client');
const client = ioClient('ws://localhost:3000');
const inquirer = require('inquirer');



client.on('connect', () => {
  console.log('Player Connected');

  client.on('cityAroundThePalace', function (data) {
    console.log(data.name);
    console.log(data.dialogue);
     riddle(data);
  });
  client.on('cityAroundThePalaceChoice', payload => console.log(payload.choiceName));
});



function riddle(senario){
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: senario.choiceQuestion,
        name: 'Answer',
        choices: [
          new inquirer.Separator('choose one'),
          {
            name: senario.choices.choice1.choiceName,
          },
          {
            name: senario.choices.choice2.choiceName,
          },
          {
            name: senario.choices.choice3.choiceName,
          },
        ],
      },
    ])
    .then(choice => {
      if (choice.Answer[0] === senario.choices.choice1.choiceName) {
        client.emit('cityAroundThePalace', senario.choices.choice1)
      } else if (choice.Answer[0] === senario.choices.choice2.choiceName) {
        client.emit('cityAroundThePalace', senario.choices.choice2)
      } else if (choice.Answer[0] === senario.choices.choice3.choiceName) {
        client.emit('cityAroundThePalace', senario.choices.choice3)
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
  
  
