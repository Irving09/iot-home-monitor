;(function(global) {
  const UI_TOPIC = 'iot-home-intruder-ui';
  const SOCKET_SERVER = 'http://192.168.1.14:3000';

  const socket = global.io(SOCKET_SERVER, {
    reconnection: true
  });

  socket.on('connect', function() {
    console.log('UI connected to socket server');
  });

  socket.on(UI_TOPIC, function(imageStream) {
    console.log('=================');
    console.log('received image stream');
    let img = global.document.getElementById('image-stream');
    img.setAttribute('src', 'data:image/jpeg;base64,' + imageStream);
    console.log('=================');
  });

})(window);