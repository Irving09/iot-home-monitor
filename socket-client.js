;(function(global) {
  const UI_TOPIC = 'iot-home-intruder-ui';

  // TODO change this to EC2 Socket server
  const SOCKET_LOCAL = 'http://localhost:3000';
  const SOCKET_PRIVATE_IP = 'http://172.31.30.51:3000';

  const socket = global.io(SOCKET_LOCAL, {
    reconnection: true
  });

  socket.on('connect', function() {
    console.log('socketLocal connected to socket server');
  });


  const socket2 = global.io(SOCKET_PRIVATE_IP, {
    reconnection: true
  });

  socket2.on('connect', function() {
    console.log('socketPrivateIp connected to socket server');
  });



  socket.on(UI_TOPIC, function(imageStream) {
    console.log('received image stream');
    let img = global.document.getElementById('image-stream');
    img.setAttribute('src', 'data:image/jpeg;base64,' + imageStream);
  });

})(window);