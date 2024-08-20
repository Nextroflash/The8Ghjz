const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'the8ghzlethalhvh.aternos.me', // Replace with your server IP
    port: 25565,       // Minecraft server port
    username: 'PornStar1',  // Bot username
    // Optionally add password and auth for online servers
  });

  bot.on('spawn', () => {
    console.log('Bot has spawned');

    // Define the circle radius and steps
    const radius = 10;
    const steps = 360;
    const angleStep = (2 * Math.PI) / steps;

    let step = 0;

    function walkInCircle() {
      const angle = step * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Calculate target position relative to the bot's current position
      const targetPos = bot.entity.position.offset(x, 0, z);

      bot.lookAt(targetPos, () => {
        bot.setControlState('forward', true);

        // Move to the target position and stop after reaching it
        bot.navigate.to(targetPos, () => {
          bot.setControlState('forward', false);
          step = (step + 1) % steps;
          setTimeout(walkInCircle, 1); // Move every second
        });
      });
    }

    // Start walking in circles
    walkInCircle();
  });

  bot.on('error', (err) => {
    console.log('Error:', err);
  });

  bot.on('end', () => {
    console.log('Bot has disconnected. Reconnecting...');
    setTimeout(createBot, 1); // Reconnect after 5 seconds
  });
}

createBot();
