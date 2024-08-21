const mineflayer = require('mineflayer');

function createBot() {
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;

  const bot = mineflayer.createBot({
    host: 'the8ghzlethalhvh.aternos.me', // Replace with your server IP
    port: 44725,       // Minecraft server port
    username: 'Nosse_ForrestSex',  // Bot username
  });

  bot.on('spawn', () => {
    console.log('Bot has spawned');
    reconnectAttempts = 0; // Reset reconnect attempts
  });

  bot.on('error', (err) => {
    console.error('Error:', err);
    handleDisconnect();
  });

  bot.on('end', () => {
    console.log('Bot has disconnected. Reconnecting...');
    handleDisconnect();
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.log(`Bot was kicked for reason: ${reason}. Logged in: ${loggedIn}`);
    handleDisconnect();
  });

  bot.on('death', () => {
    console.log('Bot died. Respawning...');
    bot.spawn(); // Respawn immediately after death
  });

  function handleDisconnect() {
    reconnectAttempts++;
    if (reconnectAttempts <= maxReconnectAttempts) {
      const waitTime = Math.pow(2, reconnectAttempts) * 1000; // Exponential backoff
      console.log(`Attempting to reconnect in ${waitTime / 1000} seconds...`);
      setTimeout(createBot, waitTime);
    } else {
      console.log('Max reconnect attempts reached. Please check the server status.');
      // Optionally, stop further attempts or put logic to handle manual restart
    }
  }
}

createBot();
