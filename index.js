const Discord = require('discord.js')
const bot = new Discord.Client()


bot.on('ready', function () {
  console.log("Login")
  bot.user.setGame("I'm your slave | !help")
})



bot.login('process.env.BOT_TOKEN');
