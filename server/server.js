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
    socket.emit('into', senario.intro);
    // this gets sent to the client, they read the dialogue, and hit some type of move on button. Then they send move on or whatever and we send the next one... figure out how to wait for all 4
    socket.emit('cityAroundThePalace', senario.cityAroundThePalace);
    socket.on('cityAroundThePalace', result => {

      // choice instances, get back all choices, run a function that puts each choice in an array, when the length is 4 then evaluate which choice got the most votes, if tied - pick random, emit senario choice with the most votes
      // counter++
      // runa functions that counts
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
  if (result.num === 1) {
    ch1++
  } else if (result.num === 2) {
    ch2++
  } else if (result.num === 3) {
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



// function moveOn(?, eventName, senario) {
//   if we get all for checks back to move on
//   socket.emit(eventName, senario);
// }