var express = require('express');
var io = require('socket.io');
var context = require('rabbit.js').createContext();

// Use express at the static file server.
var app = express.createServer().use(express.static(__dirname + '/public')),
    io = io.listen(app);
        
// Start the appserver.     
app.listen(8080);

io.sockets.on('connection', function(socket) {
  
  // RabbitJS publisher and subscriber.
  var pub = context.socket('PUB');
  var sub = context.socket('SUB');
  
  sub.setEncoding('utf8');
  
  // A move event from the UI, broadcast this to other clients.
  socket.on('perf-event', function (data) {
    socket.broadcast.emit('perf-event', data);
    pub.write(data);
  });
  
  // Clean up
  socket.on('disconnect', function() {
    pub.destroy();
    sub.destroy();
  });
  
  // Data sent to the amqp subscriber from RabbitMQ. 
  sub.on('data', function(data) {
    socket.broadcast.emit('perf-event', data);
  })


  // Connect publisher and subscriber to the relevant amqp exchanges.
  sub.connect('perf-events');
  pub.connect('perf-events');
  
});

