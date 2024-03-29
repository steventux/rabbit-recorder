var express = require('express');
var io = require('socket.io');
var context = require('rabbit.js').createContext();

// Use express at the static file server.
var app = express.createServer().use(express.static(__dirname + '/public')),
    io = io.listen(app);
    
// Start the appserver.     
app.listen(8080);

io.sockets.on('connection', function(socket) {
  
  var moveEvents = [];
  
  // RabbitJS publishers and subscribers.
  var pubMe = context.socket('PUB');
  var subMe = context.socket('SUB');

  subMe.setEncoding('utf8');
  
  // A command from the UI (e.g. replay)
  socket.on('command', function(data) {
    pubMe.write(data);
  })
  
  // A move event from the UI, broadcast this to other clients.
  socket.on('move-event', function (data) {
    socket.broadcast.emit('move-event', data);
    console.log("Publishing " + data + " to move-events exchange.")
    pubMe.write(data);
  });
  
  // Clean up
  socket.on('disconnect', function() {
    pubMe.destroy();
    subMe.destroy();
  });
  
  // Data via the move-events exchange to be cached or persisted.
  subMe.on('data', function(data) {
    console.log("move-events exchange subscriber received : " + data)
    switch(data) {
      case "replay" :
        var len = moveEvents.length;
        if (len) {
          console.log("Playing back " + len + " events!!!") 
          for (var i = 0; i < len; i++) {
            console.log(moveEvents[i])
            socket.emit('move-event', moveEvents[i]);
          }
          moveEvents = []; // Clear the cache
        }
        break;
      default :
        moveEvents.push(data);
    }  
  })

  // Connect publisher and subscriber to the relevant amqp exchanges.
  subMe.connect('move-events');
  pubMe.connect('move-events');
  
});

