const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'the8ghzlethalhvh.aternos.me',
    port: 25565,
    username: 'LiveInPeace'
  });

  bot.on('error', (err) => {
    console.log('Error:', err);
    bot.end(); // End the current bot session
    setTimeout(createBot, 1000); // Attempt to reconnect after 5 seconds
  });

  bot.on('end', () => {
    console.log('Bot has ended. Attempting to reconnect...');
    setTimeout(createBot, 1000); // Attempt to reconnect after 5 seconds
  });

  // Make the bot jump every second
  setInterval(() => {
    bot.setControlState('jump', true); // Start jumping
    setTimeout(() => bot.setControlState('jump', false), 100); // Stop jumping after 100ms
  }, 1000); // Jump every second
}

createBot();
