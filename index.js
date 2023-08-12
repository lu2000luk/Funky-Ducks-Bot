import { io } from 'socket.io-client';

export function Bot(
  username,
  startX = 200,
  startY = 200,
  img = 'https://funkyducks.repl.co/play/final2.png',
  socket = io('https://multiducks.funkyducks.repl.co'),
  token = 'fdAPIjs' + Math.random(),
  discordOption = false
) {
  this.token = token;
  this.socket = socket;
  this.name = username;
  this.discord = discordOption;
  this.char = {
    accessory: false,
    angle: 0.46862563414659014,
    clickPosX: 440,
    clickPosY: 447,
    destX: 285,
    destY: 309.40625,
    height: 72,
    hide: false,
    img: { src: img, customBotImg: true },
    imgSrc: img,
    isMoving: false,
    message: '',
    name: this.name,
    originX: 31,
    originY: 67,
    rotation: 0,
    smishMoving: false,
    sourceH: 172,
    sourceW: 144,
    sourceX: 144,
    sourceY: 0,
    speed: 1.25,
    type: 1,
    velX: 0,
    velY: 0,
    width: 62,
    x: startX,
    y: startY,
  };

  this.move = (toX, toY) => {
    this.socket.emit('movment', {
      to: {
        x: toX,
        y: toY,
      },
      user: {
        name: this.name,
        object: this.char,
        token: this.token,
      },
      from: {
        x: this.char.y,
        y: this.char.x,
      },
      room: 'Missing',
    });
  };

  this.log = () => {
    this.socket.emit('log', {
      user: {
        name: this.name,
        object: this.char,
        token: this.token,
      },
    });
  };

  this.join = this.log;

  this.socket.on('reqAuth', function (msg) {
    this.socket.emit('authSend', {
      user: {
        name: this.name,
        object: this.char,
        token: this.token,
      },
    });
  });

  this.event = function (eventType, callback) {
    if (eventType === 'message' || eventType === 'msg') {
      this.socket.on('i_chat_message', (msg) => {
        callback(msg);
      });
    } else if (eventType === 'playerMovement' || eventType === 'movement') {
      this.socket.on('moveDuck', function (msg) {
        callback(msg);
      });
    } else if (eventType === 'playerJoin' || eventType === 'join') {
      console.warn(
        'WARNING! playerJoin event gets triggered even on the game reload event'
      );

      this.socket.on('createUser', function (msg) {
        callback(msg);
      });
    } else {
      console.error(
        'Invalid event type: ' +
          eventType +
          ' | Valid events: message, movement, join'
      );
    }
  };

  this.chat = (message) => {
    this.socket.emit('chat_message', {
      content: message,
      user: { name: this.name, object: this.char, token: this.token },
      allowDiscord: this.discord,
    });
  };

  this.sendMessage = (msg) => {
    this.chat(msg);
  };
}
