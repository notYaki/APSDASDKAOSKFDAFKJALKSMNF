const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
module.exports = {
  name: "avatar",
  aliases: ["av"],
  category: "🔰 Info",
  description: "Get the Avatar of an user",
  usage: "avatar [@USER] [global/guild]",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {

      var user;
      try{
        if(args[1] && args[1].toLowerCase() == "global"){
          args.pop()
          user = await GetGlobalUser(message, args)
        }else {
          user = await GetUser(message, args)
        }
      }catch (e){
        return message.reply(e)
      }
      message.channel.send(new Discord.MessageEmbed()
        .setAuthor(`Avatar from: ${user.tag}`, user.displayAvatarURL({dynamic: true}), "https://discord.gg/ve7z9K4QXV")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .addField("<a:768934598583123979:891462739791323187> PNG",`[\`LINK\`](${user.displayAvatarURL({format: "png"})})`, true)
        .addField("<a:768934598583123979:891462739791323187> JPEG",`[\`LINK\`](${user.displayAvatarURL({format: "jpg"})})`, true)
        .addField("<a:768934598583123979:891462739791323187> WEBP",`[\`LINK\`](${user.displayAvatarURL({format: "webp"})})`, true)
        .setURL(user.displayAvatarURL({
          dynamic: true
        }))
        .setFooter(es.footertext, es.footericon)
        .setImage(user.displayAvatarURL({
          dynamic: true, size: 512,
        }))
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:713400011714723932:891458936656515092> ERROR | An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by Ÿακι ジ#4635 | https://github.com/Ÿακι ジ#4635/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
