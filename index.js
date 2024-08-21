const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const Vec3 = require('vec3').Vec3;

function createBot() {
  const bot = mineflayer.createBot({
    host: 'the8ghzlethalhvh.aternos.me', // Replace with your server IP
    port: 44725,       // Minecraft server port
    username: 'PornStar1',  // Bot username
  });

  bot.on('spawn', () => {
    console.log('Bot has spawned');

  bot.on('error', (err) => {
    console.error('Error:', err);
    if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
      console.log('Connection error, retrying...');
      setTimeout(createBot, 1); // Attempt to reconnect after 5 seconds
    }
  });

  bot.on('end', () => {
    console.log('Bot has disconnected. Reconnecting...');
    setTimeout(createBot, 1); // Reconnect after 5 seconds
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.log(`Bot was kicked for reason: ${reason}. Logged in: ${loggedIn}`);
    setTimeout(createBot, 1); // Reconnect after 5 seconds
  });

  bot.on('death', () => {
    console.log('Bot died. Respawning...');
    bot.spawn(); // Respawn immediately after death
  });

  bot.on('physicTick', () => {
    if (!bot.entity.onGround) {
      bot.setControlState('jump', true);
    } else {
      bot.setControlState('jump', false);
    }
  });
}

createBot();
