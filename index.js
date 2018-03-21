
//Constantes
const Discord = require("discord.js");
const YoutubeDL = require('youtube-dl');
const YTDL = require("ytdl-core");
const bot = new Discord.Client();
const PREFIX = "!";
//var initiales
var servers = {};
//////////////////////////////////////

bot.on("ready", function () {
    bot.user.setGame("Aiiroz Bot | !help")
    bot.user.setUsername("Aiiroz Bot")
    console.log("Aiiroz Bot - Connected");
    console.log("Membres : " + bot.users.size)
    
});

function play(connection, message) {
 var server = servers[message.guild.id];
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function() {
     if (server.queue[0]) play(connection, message);
     else connection.disconnect();
    });
}

bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;
    
    var user = message.mentions.users.first();


    switch (args[0].toLowerCase()) {


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        case "play":
            if (!args[1]) {
             message.channel.sendMessage("[AiirozBot Music] - Vous devez mettre un lien.");   
             return;
            }
            if(!message.member.voiceChannel) {
             message.channel.sendMessage("[AiirozBot Music] - Vous devez être dans un salon vocal.");   
             return;
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];
      
            server.queue.push(args[1]);
            
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
               play(connection, message) 
            });
        break;    
      



        case "skip":
             if(!message.member.voiceChannel) {
             message.channel.sendMessage("[AiirozBot Music] - Vous devez être dans un salon vocal.");   
             return;
            }
            var server = servers[message.guild.id];
            if(server.dispatcher) server.dispatcher.end();
        break;    
      



        case "stop":
             if(!message.member.voiceChannel) {
             message.channel.sendMessage("[AiirozBot Music] - Vous devez être dans un salon vocal.");   
             return;
            }
             else message.guild.voiceConnection.disconnect().catch(console.error);
     
        break;    



        case "volume":
              message.channel.sendMessage("[AiirozBot Music] - Cette commande n'est pas opérationnel")
/*              if (!args[1]) {
                message.channel.sendMessage("[AiirozBot Music] - Vous devez indiquer le volume désiré.");   
                return;
              }
              if(!message.member.voiceChannel) {
                message.channel.sendMessage("[AiirozBot Music] - Vous devez être dans un salon vocal.");   
                return;
              }
              if (args[1] > 200 || args[1] < 0) {
                message.channel.sendMessage("[AiirozBot Music] - Volume trop fort ou trop faible (Max : 200 | Min : 0)")
                return;
              } 
              var volume = args[1] / 100
              if(server.dispatcher) server.dispatcher.setVolume(volume);
              ///server.dispatcher.setVolume((args[1]/100))
*/

        break;


        case "beat":

        /*
            if(!message.member.voiceChannel) {
             message.channel.sendMessage("[AiirozBot Music] - Vous devez être dans un salon vocal.");   
             return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];
      
            server.queue.push(args[1]);
            
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
               play(connection, message) 
            });
        */
          message.channel.sendMessage("[AiirozBot Music] - Cette commande n'est pas opérationnel")
        break;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

        case "membres":
            message.reply("Nous sommes `" + bot.users.size + "` membres sur le discord !");
        break

            case "help":
            var embed = new Discord.RichEmbed()
                 .addField("!play URL", "Jouer une musique")
                 .addField("!skip", "Sauter une musique")
                 .addField("!stop", "Arreter la musique")
                 .addField("!volume VALEUR", "Gérer le volume")
                 .addField("!beat", "Lancer la playlist de Beats")
                 .addField("!membres", "Afficher le nombre de membre inscrit sur le serveur")
                .setColor("#FFFF00")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("Voici les commandes du AiirozBot !")
                message.delete()
                message.channel.sendEmbed(embed)
            break;

/*       case "reponse":
       message.reply("Reponse");
       message.delete();
       break;
*/
            
      
        default:
            message.channel.sendMessage("Commande invalide: !help")
            message.delete();
    }
});




bot.login('BOT_TOKEN')
