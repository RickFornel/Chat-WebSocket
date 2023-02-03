const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public'));

const server = require('http').createServer(app);

const io = require('socket.io')(server);

let messages = [];

io.on('connection', socket => {
  console.log('Socket conectado:' + socket.id);

  socket.emit('previousMessage', messages);
  
  socket.on('sendMessage', data => {
    console.log(data);
    messages.push(data);
   socket.broadcast.emit('receivedMessage', data);
});
})

server.listen(3000, () => { 
    console.log('Listening!');
})
