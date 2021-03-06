var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
var emoji = require(`../../botconfig/emojis.json`);
var {
  databasing, isValidURL
} = require(`../../handlers/functions`);
module.exports = {
  name: "restartbot",
  category: "👑 Owner",
  aliases: ["botrestart"],
  cooldown: 5,
  usage: "restartbot",
  description: "Restarts the Bot, if it's not working as intended or so..",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(message.author.id != "513003402377166909")
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`**You are not allowed to run this Command**`)
        .setDescription(`***Only <@513003402377166909> is allowed to execute this Command, this is to prevent Rate Limits, if you need a Bot restart Contact him (\`Ÿακι ジ#4635\`)***`)
      );
    try {
      message.reply("RESTARTING BOT .... please stand by... if the Bot is not restarting then DM: `Ÿακι ジ#4635`")
      require("child_process").exec(`pm2 restart index.js CLANBOT_${process.cwd().split(require("path").sep).pop()}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          message.reply("SOMETHING WENT WRONG, CONTACT THE OWNER PLEASE! `Ÿακι ジ#4635`")
          return;
        }
        message.reply("RESTARTED SUCCESSFUL! PLEASE TEST THAT THE BOT WORKS (in 5-10 Seconds)!")
      });
      message.reply("RESTARTED SUCCESSFUL! PLEASE TEST THAT THE BOT WORKS (in 5-10 Seconds)!")
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`Something went Wrong`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  },
};
