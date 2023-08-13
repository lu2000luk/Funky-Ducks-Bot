import { Bot } from '../index.js';

var echoBot = new Bot('EchoBot');

echoBot.event('msg', (msg) => {
  if (msg.user.name === echoBot.name) {
    return;
  }
  console.log('User sent messaage:' + msg.content);
  echoBot.chat(msg.content);
});

echoBot.join();

//You can also listen to messages without having joined the game but you cannot chat
