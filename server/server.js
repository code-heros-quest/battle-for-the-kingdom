'use strict';

const io = require('socket.io')(3000);
const hub = io.of('/server');
const inquirer = require('inquirer');



let welcomeObj = {
    intro: 'welcome to the Code Quest'
}

   


hub.on('connection', (socket) =>{
    console.log(`${socket.id} has connected`);
    hub.on('data', socketEvent);

    socket.on('data', (data) =>{
        console.log(data);
    })
    socket.emit('data', welcomeObj);
    
    
    
})

function socketEvent(buffer){  
    const array = [];
    console.log('hello from server', buffer);
    let health = 0;
    health += JSON.parse(buffer.health);
    array.push(buffer.health);
   
    console.log(array);
}

function testEvent(){
    console.log('test event function')
}



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
   