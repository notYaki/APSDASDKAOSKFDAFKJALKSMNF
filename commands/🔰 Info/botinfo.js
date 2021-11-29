const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons')

let os = require("os");

let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
    duration
} = require("../../handlers/functions")
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    category: "🔰 Info",
    description: "Sends detailed info about the client",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            cpuStat.usagePercent(function (e, percent, seconds) {
                if (e) {
                    return console.log(String(e.stack).red);
                }
                let connectedchannelsamount = 0;
                let guilds = client.guilds.cache.map((guild) => guild);
                for (let i = 0; i < guilds.length; i++) {
                    if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                }
                if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                //info
                const botinfo = new Discord.MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setTitle("__**BOTINFO**__")
                    .setColor(ee.color)
                    .addField("📁 Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``)
                    .addField(" <a:728495315711164437:891240655148417024> Uptime ", `\`${duration(client.uptime)}\``)
                    .addField(" <a:728495315711164437:891240655148417024>> Users", `\`Total: ${client.users.cache.size} Users\``)
                    .addField(" <a:728495315711164437:891240655148417024> Servers", `\`Total: ${client.guilds.cache.size} Servers\``)
                    .addField("🎙️ Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``)
                    .addField("<:cool:863399662693777418> Connected Channels", `\`${connectedchannelsamount}\``)
                    .addField("<:jj:863396103402684426> Discord.js", `\`v${Discord.version}\``)
                    .addField("<:gg:863395813874073600> Node", `\`${process.version}\``)
                    .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                    .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``)
                    .addField("🤖 Arch", `\`${os.arch()}\``)
                    .addField("<a:778521981468540960:891240754993844244> API Latency", `\`${client.ws.ping}ms\``)
                    .addField("<a:793831642401603624:891456264364769290> Developer",
                    `\` 1 • Ÿακι ジ#4635\``)
                    .setFooter("Yaki | powered by Ÿακι ジ#4635", "https://images-ext-1.discordapp.net/external/gWLmE7wgu804HZMqgOUb4D1UF2otKlmWxgLGi5NGJSc/https/images-ext-2.discordapp.net/external/2JkCzls2n4qbMHl5uHgVDylBmY0M-PHOcziLu2eCzec/https/images-ext-1.discordapp.net/external/y_ctzD2mhbtCMJyFwMYCNUz16xDDhM6jzFKMjz31XtE/https/i.redd.it/z1c48d38ik161.gif");

                message.channel.send(botinfo);
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
            );
        }
    },
};