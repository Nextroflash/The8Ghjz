const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'the8ghzlethalhvh.aternos.me', // replace with your server address
  port: 25565,      // replace with your server port (default is 25565)
  username: 'LiveInPeace',    // replace with your bot's username
  // if using Microsoft account:
  // auth: 'microsoft',
  // if using Mojang account:
  // auth: 'mojang'
})

bot.on('spawn', () => {
  setInterval(() => {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 1000) // Stop jumping after 1 second
  }, 100) // Jump every 2 seconds
})

bot.on('error', (err) => {
  console.log('Error:', err)
})

bot.on('end', () => {
  console.log('Bot has been disconnected.')
})
