'use strict';

const io = require('socket.io')(3000);
const hub = io.of('/server');
const inquirer = require('inquirer');

const senario = require('../scenario.js')


let welcomeObj = {
    intro: 'welcome to the Code Quest'
}

let counter = 0;
let ch1 = 0;
let ch2 = 0;
let ch3 = 0;


io.on('connection', (socket) =>{
    console.log(`${socket.id} has connected`);
    //emit for each senario
    //on for each scenario
    socket.emit('cityAroundThePalace', senario.cityAroundThePalace);
    socket.on('cityAroundThePalace', result => {
      // counter++
      //minstrals got most votes 
      // michael make arrays your fav
      socket.emit('cityAroundThePalaceChoice', senario.cityAroundThePalace.choices.choice2)
    })
    
    
    
    
})





function riddle(){
    inquirer
      .prompt([
        {
          type: 'checkbox',
          message: 'What is round and yellow',
          name: 'Answer',
          choices: [
            new inquirer.Separator(' = The Meats = '),
            {
              name: 'Sun',
            },
            {
              name: 'Sword',
            },
            {
              name: 'Gauntlet',
            },
            {
              name: 'hose',
            },
          ],
          validate: function (answer) {
            console.log(answer);
          },
        },
      ])
      .then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));
      })
    }
   

function choiceVote(result) {
  if (result.number === 1) {
    ch1++
  } else if (result.number === 2) {
    ch2++
  } else if (result.number === 3) {
    ch3++
  }

  let finalVote = {};
  if (ch1 > ch2 && ch1 > ch3) {
    finalVote = 'choice1';
  } else if (ch2 > ch1 && ch2 > ch3) {
    finalVote = 'choice2';
  } else if (ch3 > ch1 && ch3 > ch2) {
    finalVote = 'choice3';
  } else {
    finalVote = 'choice' + Math.floor(Math.random() * Math.floor(3));
  }
  if (counter === 2) {
    return finalVote;
  }
}