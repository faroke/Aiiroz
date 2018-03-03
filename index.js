const Discord = require('discord.js')
const bot = new Discord.Client()


bot.on('ready', function () {
  console.log("Login")
  bot.user.setGame("I'm your slave | !help")
})



bot.login('NDE1ODcyMDYxNDA0MjE3MzU1.DXdaEA.WIUDw5kPugvq3UmEUqPB8jVU-B8')
