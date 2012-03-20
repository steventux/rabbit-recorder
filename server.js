var express = require('express');
var io = require('socket.io');
var context = require('rabbit.js').createContext();

var app = express.createServer()
  , io = io.listen(app);
  
app.listen(8080);

io.sockets.on('connection', function(socket) {
  var pub = context.socket('PUB');
  
  // var sub = context.socket('SUB');
  // sub.setEncoding('utf8');
  
  socket.on('move-event', function (data) {
    socket.broadcast.emit('move-event', data);
    pub.write(data)
  });

  socket.on('disconnect', function() {
    pub.destroy();
    // sub.destroy();
  });

  // sub.connect('move-events');
  pub.connect('move-events');
  
});

