const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');

// Function to create a new bot
function createBot() {
  const bot = mineflayer.createBot({
    host: process.env.HOST || 'the8ghzlethalhvh.aternos.me', // Replace with your server IP or use an environment variable
    port: process.env.PORT || 25565,       // Minecraft server port or use an environment variable
    username: process.env.USERNAME || 'Bot',  // Bot username or use an environment variable
    // Optionally add password and auth for online servers
  });

  // Load the pathfinder plugin
  bot.loadPlugin(pathfinder);

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
        bot.pathfinder.setMovements(new Movements(bot));
        bot.pathfinder.setGoal(new goals.GoalBlock(Math.floor(targetPos.x), Math.floor(targetPos.y), Math.floor(targetPos.z)), true);
        step = (step + 1) % steps;
        setTimeout(walkInCircle, 1000); // Move every second
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
    setTimeout(createBot, 5000); // Reconnect after 5 seconds
  });
}

// Start the bot
createBot();
