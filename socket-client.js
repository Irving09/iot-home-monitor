;(function(global) {
  const UI_TOPIC = 'iot-home-intruder-ui';
  const SOCKET_SERVER = 'http://192.168.1.14:3000';

  const socket = global.io(SOCKET_SERVER, {
    reconnection: true
  });

  socket.on('connect', function() {
    console.log('UI connected to socket server');
  });

  socket.on(UI_TOPIC, function(data) {
    // data should be hello world here
    console.log(data);
  });

  socket.on('disconnect', function() {

  });

})(window);