const { MessageEmbed } = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: `prefix`,
    aliases: [`changeprefix`],
    category: `⚙️ Settings`,
    description: `Let's you change the Prefix of the BOT`,
    usage: `prefix <NEW PREFIX>`,
    memberpermissions: [`ADMINISTRATOR`],
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
    
    //if no args return error
    if (!args[0])
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<a:865963806483808256:896694904019894282> Please provide a new prefix!`)
        .setDescription(`Current prefix: \`${prefix}\``)
      );
    //if there are multiple arguments
    if (args[1])
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<a:865963806483808256:896694904019894282> The Prefix Can\'t have two spaces`)
      );
    //if the prefix is too long
    if (args[0].length > 5)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<a:865963806483808256:896694904019894282> The Prefix Can\'t be Longer Then \`5\``)
      );
    //set the new prefix
    client.settings.set(message.guild.id, args[0], `prefix`);
    //return success embed
    return message.channel.send(new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`<a:762633663266553857:891459306195664898> Set New Prefix To **\`${args[0]}\`**`)
    );
  } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
					.setFooter(es.footertext, es.footericon)
          .setTitle(`<a:865963806483808256:896694904019894282> An error occurred`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
  }
  }
};
