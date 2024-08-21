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
    setTimeout(createBot, 1000); // Attempt to reconnect after 1 second
  });

  bot.on('end', () => {
    console.log('Bot has ended. Attempting to reconnect...');
    setTimeout(createBot, 1000); // Attempt to reconnect after 1 second
  });

  bot.once('spawn', () => {
    setInterval(() => {
      bot.chat('/jump'); // Send a chat command to jump if you have a plugin or command for it
    }, 1000); // Jump every second
  });
}

createBot();
