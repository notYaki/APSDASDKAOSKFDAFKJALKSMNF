const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "slots",
  category: "💸 Economy",
  description: "Earn your slots cash",
  usage: "slots",
  run: async (client, message, args, cmduser, text, prefix) => {
    const slotItems = ["🍅", "🥑", "🥒", "🍆", "🥝", "🍇", "🍉", "🍊", "🍏", "💣", "🍓", "🍎", "🍒", "🍈", "🍋", "🍌"];
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "ECONOMY")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:713400011714723932:891458936656515092> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
    try {
      //command
      var user = message.author
      if(user.bot) return message.reply("<:713400011714723932:891458936656515092> **A Discord Bot can not have Economy!**")
      
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
      //get the economy data 
      let data = client.economy.get(`${message.guild.id}-${user.id}`)
      //get the delays
      
      let amount = parseInt(args[0]);
      let win = false;
  
      if (!amount) 
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setTitle(`<:713400011714723932:891458936656515092> You didn't add the slotsamount`)
          .setDescription(`Usage: \`${prefix}slots <Amount>\`\n\n\Example: \`${prefix}slots 420\``)
        );
      if (amount > data.balance) 
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
          .setDescription(`<:713400011714723932:891458936656515092> You can't gamble more Money than you have in your **👛 Pocket (\`${data.balance} 💸\`)**`)
        );
  
      let number = []
      for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }
  
      if (number[0] == number[1] && number[1] == number[2]) { 
          amount *= 9
          win = true;
      } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
          amount *= 2
          win = true;
      }
      if (win) {
        //write the DB
        client.economy.math(`${message.guild.id}-${message.author.id}`, "+", amount, "balance")
        //get the latest data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`)
        //send the Information Message
        message.channel.send(new MessageEmbed()
          .setTitle(`<a:762633663266553857:891459306195664898> You've won \`${amount} 💸\``)
          .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        )
      } else {
        //write the DB
        client.economy.math(`${message.guild.id}-${message.author.id}`, "-", amount, "balance")
        //get the latest data
        data = client.economy.get(`${message.guild.id}-${message.author.id}`)
        //send the Information Message
        message.channel.send(new MessageEmbed()
          .setTitle(`<:713400011714723932:891458936656515092> You've lost \`${amount} 💸\``)
          .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\n👛 You now have \`${nFormatter(Math.floor(data.balance))} 💸\` in your Pocket`)
          .setColor(es.wrongcolor).setFooter(user.tag, user.displayAvatarURL({dynamic: true}))
        )
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:713400011714723932:891458936656515092> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
};
/**
 * @INFO
 * Bot Coded by Ÿακι ジ#4635 | https://github.com/Ÿακι ジ#4635/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
