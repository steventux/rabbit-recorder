var express = require('express');
var io = require('socket.io');
var context = require('rabbit.js').createContext();

var app = express.createServer().use(express.static(__dirname + '/public')),
    io = io.listen(app);

app.listen(8080);

io.sockets.on('connection', function(socket) {

  var pub = context.socket('PUB');
  var sub = context.socket('SUB');

  sub.setEncoding('utf8');
  
  // A command from the UI (e.g. replay)
  socket.on('command', function(data) {
    pub.write(data);
  })
  
  // A move event from the UI, broadcast this to other clients.
  socket.on('move-event', function (data) {
    socket.broadcast.emit('move-event', data);
    pub.write(data);
  });

  socket.on('disconnect', function() {
    pub.destroy();
    sub.destroy();
  });

  // Data sent to the amqp subscriber from RabbitMQ 
  sub.on('data', function(msg) {
    console.log("Playing back : " + msg)
    socket.broadcast.emit('move-event', msg);
  })

  sub.connect('playbacks');
  pub.connect('move-events');
  
});

