const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/Qr65p2haQQ")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite this Bot').setURL(`https://discord.com/api/oauth2/authorize?client_id=902388483568599040&permissions=8&scope=bot%20applications.commands`)
      //array of all buttons
      const allbuttons = [button_support_dc, button_invite]
       message.channel.send({
         embed: new MessageEmbed()
          .setColor(ee.color)
          .setTitle("Thanks for inviting Yaki")
          .addField(`Yaki Powered by Ÿακι ジ#4635`, `**[Invite Public Bot](https://discord.com/api/oauth2/authorize?client_id=902388483568599040&permissions=8&scope=bot%20applications.commands)  •  [Support Server](https://discord.gg/Qr65p2haQQ)
          **\n\n[**Invite** **${client.user.username}**](https://discord.com/api/oauth2/authorize?client_id=902388483568599040&permissions=8&scope=bot%20applications.commands)`)
          .setImage("https://images-ext-2.discordapp.net/external/2JkCzls2n4qbMHl5uHgVDylBmY0M-PHOcziLu2eCzec/https/images-ext-1.discordapp.net/external/y_ctzD2mhbtCMJyFwMYCNUz16xDDhM6jzFKMjz31XtE/https/i.redd.it/z1c48d38ik161.gif")
          .setFooter("Yakit | powered by Ÿακι ジ", "https://images-ext-2.discordapp.net/external/2JkCzls2n4qbMHl5uHgVDylBmY0M-PHOcziLu2eCzec/https/images-ext-1.discordapp.net/external/y_ctzD2mhbtCMJyFwMYCNUz16xDDhM6jzFKMjz31XtE/https/i.redd.it/z1c48d38ik161.gif"),
        buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}