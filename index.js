const Discord = require('discord.js')
const bot = new Discord.Client()
var http = require('http');


var server = http.createServer(function(req, res) {

  res.writeHead(200);

  res.end('AiirozBot deploy');

});

server.listen(8080);

bot.on('ready', function () {
  console.log("Login")
  bot.user.setGame("I'm your slave | !help")
})



bot.login('process.env.BOT_TOKEN');
