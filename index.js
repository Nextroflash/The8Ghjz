const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'the8ghzlethalhvh.aternos.me', // Replace with your server IP
    port: 44725,       // Minecraft server port
    username: 'Nosse_ForrestSex',  // Bot username
  });

  bot.on('spawn', () => {
    console.log('Bot has spawned');
    // Your bot is now connected
  });

  bot.on('error', (err) => {
    console.error('Error:', err);
    if (err.code === 'ECONNREFUSED' || err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT') {
      console.log('Connection error, retrying...');
      setTimeout(createBot, 1000); // Attempt to reconnect after 1 second
    }
  });

  bot.on('end', () => {
    console.log('Bot has disconnected. Reconnecting...');
    setTimeout(createBot, 1000); // Reconnect after 1 second
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.log(`Bot was kicked for reason: ${reason}. Logged in: ${loggedIn}`);
    setTimeout(createBot, 1000); // Reconnect after 1 second
  });

  bot.on('death', () => {
    console.log('Bot died. Respawning...');
    bot.spawn(); // Respawn immediately after death
  });
}

createBot();
