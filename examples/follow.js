import { Bot } from '../index.js';

var followBot = new Bot('FollowBot');
var following = '';

followBot.event('msg', (msg) => {
  if (msg.user.name === followBot.name) {
    return;
  }

  if (msg.content === '!come') {
    followBot.move(msg.user.object.x, msg.user.object.y);
  }

  if (msg.content === '!follow') {
    following = msg.user.name;
    console.log('Started Following ' + following);
  }

  if (msg.content === '!unfollow') {
    following = '';
  }
});

followBot.event('movement', (msg) => {
  if (msg.user.name === following) {
    followBot.move(msg.user.object.x, msg.user.object.y);
    console.log('Following ' + following);
  }
});

followBot.join();
