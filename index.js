const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const getmac = require('getmac');

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));

const server = require('http').createServer(app);

const io = require('socket.io')(server);

let messages = [];
let users = [];

io.on('connection', socket => {
  const MacAdress = getmac.default();
  users.push(MacAdress);
  
  console.log('Socket conectado:' + socket.id);
  console.log('MacAdress:' + MacAdress);

  socket.emit('previousMessage', messages);
  socket.emit('mac', MacAdress);
  
  socket.on('sendMessage', data => {
    messages.push(data);
   socket.broadcast.emit('receivedMessage', data);
});
})

server.listen(3000, () => { 
    console.log('Listening!');
})
