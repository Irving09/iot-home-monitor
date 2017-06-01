;(function(global) {
  'use strict';

  const SOCKET_SERVER = 'http://ec2-52-34-34-51.us-west-2.compute.amazonaws.com:3000';
  const UI_TOPIC = 'iot-home-intruder-ui';

  const socket = global.io(SOCKET_SERVER, {
    reconnection: true
  });

  socket.on('connect', function() {
    console.log('socket client connected to socket server');
  });

  socket.on(UI_TOPIC, function(imageStream) {
    console.log('received image stream');
    let img = global.document.getElementById('image-stream');
    img.setAttribute('src', 'data:image/jpeg;base64,' + imageStream);
  });

  const START_STREAMING = 'Start streaming';
  const STOP_STREAMING = 'Stop';

  let streamButton = global.document.getElementById('stream-button');
  streamButton.value = START_STREAMING;

  streamButton.addEventListener('click', () => {
    if (streamButton.value === START_STREAMING) {
      streamButton.value = STOP_STREAMING;
      streamButton.classList.remove("btn-primary");
      streamButton.classList.add("btn-danger");
      invokeStream(true);
      console.log('making request to start the stream in socket server...');
    } else {
      streamButton.value = START_STREAMING;
      streamButton.classList.add("btn-primary");
      streamButton.classList.remove("btn-danger");
      invokeStream(false);
      console.log('making request to stop the stream in socket server...');
    }
  });

  function invokeStream(value) {
    let options = {
      method: 'PUT',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify({ enableStream: true })
    };

    fetch(`${SOCKET_SERVER}/stream?start=${value}`, options)
      .then(response => console.log(response.json()));
  }

})(window);