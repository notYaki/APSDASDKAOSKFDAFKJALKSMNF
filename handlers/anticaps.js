//import the config.json file
const config = require("../botconfig/config.json")
var ee = require(`../botconfig/embed.json`);
var emoji = require(`../botconfig/emojis.json`);
var {
    MessageEmbed
} = require(`discord.js`);
const { databasing } = require("../handlers/functions")
const countermap = new Map()
module.exports = client => {
  
    client.on("message", async message => {
        try{
            if (!message.guild || !message.channel || message.author.bot) return;
            client.settings.ensure(message.guild.id, {
                adminroles: [],
            });
            var adminroles = client.settings.get(message.guild.id, "adminroles")
            if ( ((adminroles && adminroles.length > 0) && message.member.roles.cache.array().length > 0 && message.member.roles.cache.some(r => adminroles.includes(r.id))) || Array(message.guild.owner.id, config.ownerid).includes(message.author.id) || message.member.hasPermission("ADMINISTRATOR") )
                return;
            client.settings.ensure(message.guild.id, {
                anticaps: {
                    enabled: true,
                    percent: 75
                },
            });
            let anticaps = client.settings.get(message.guild.id, "anticaps")
            if(!anticaps.enabled) return;
            let es = client.settings.get(message.guild.id, "embed")
            if(!message.content) return;
            if(message.content.split(" ").join("").length < 8) return;
            try {
                var uppercaselength = message.content.replace(/[^A-Z]/g, "").length;
                var wholelength = message.content.length;
                var percent = Math.ceil(uppercaselength/wholelength * 100);
                if(percent >= anticaps.percent){
                    await message.delete().catch(e => console.log("PREVENTED A BUG"))

                    if (!countermap.get(message.author.id)) countermap.set(message.author.id, 1)
                    setTimeout(() => {
                        countermap.set(message.author.id, Number(countermap.get(message.author.id)) - 1)
                        if (Number(countermap.get(message.author.id)) < 0) countermap.set(message.author.id, 1)
                    }, 5000)
                    countermap.set(message.author.id, Number(countermap.get(message.author.id)) + 1)

                    if (Number(countermap.get(message.author.id)) > 5) {
                        let member = message.member
                        let time = 10 * 60 * 1000;
                        let reason = "Sending too many Links in a Short Time";
                        let allguildroles = message.guild.roles.cache.array();
                        let mutedrole = false;
                        for (let i = 0; i < allguildroles.length; i++) {
                            if (allguildroles[i].name.toLowerCase().includes(`muted`)) {
                                mutedrole = allguildroles[i];
                                break;
                            }
                        }
                        if (!mutedrole) {
                            let highestrolepos = message.guild.me.roles.highest.position;
                            mutedrole = await message.guild.roles.create({
                                data: {
                                    name: `muted`,
                                    color: `#222222`,
                                    hoist: true,
                                    position: Number(highestrolepos) - 1
                                },
                                reason: `This role got created, to mute Members!`
                            }).catch((e) => {
                                return console.log(String(e.stack).red);
                            });
                        }
                        await message.guild.channels.cache.forEach((ch) => {
                            try {
                                ch.updateOverwrite(mutedrole, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    CONNECT: false,
                                    SPEAK: false
                                });
                            } catch (e) {
                                console.log(String(e.stack).red);
                            }
                        });
                        try {
                            member.roles.add(mutedrole);
                        } catch (e) {
                            console.log(e)
                        }
                        message.channel.send(new MessageEmbed()
                            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                            .setFooter(es.footertext, es.footericon)
                            .setTitle(`<a:762633663266553857:891459306195664898> \`${member.user.tag}\` got **MUTED** for \`10 Minutes\``)
                            .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
                        );
                        countermap.set(message.author.id, 1)
                        setTimeout(() => {
                            try {
                              message.channel.send(new MessageEmbed()
                                .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`<a:762633663266553857:891459306195664898> \`${member.user.tag}\` got **UNMUTED** after\`${ms(mutetime, { long: true })}\``)
                                .setDescription(`Reason:\n> ${reason ? `${reason.substr(0, 1800)}` : `NO REASON`}`)
                              );
                              member.roles.remove(mutedrole);
                            } catch (e) {
                                console.log(e)
                            }
                          }, time);
                    }
                    else {
                        return message.channel.send(new MessageEmbed()
                            .setColor(es.wrongcolor)
                            .setFooter(es.footertext, es.footericon)
                            .setTitle(`<:713400011714723932:891458936656515092> Dont send that many CAPS`)
                            .setDescription(`\`${percent}%\` of your Message were in caps and \`${anticaps.percent}%\` is the maximum`)
                        ).then(msg => msg.delete({
                            timeout: 3000
                        }).catch(e => console.log("PREVENT BUG")))
                    }
                } else {
                    // Do nothing ;)
                }
            } catch (e) {
                console.log(String(e.stack).bgRed)
                return message.channel.send(new MessageEmbed()
                    .setColor(es.wrongcolor)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(`<:713400011714723932:891458936656515092> Something went Wrong`)
                    .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
                );
            }
        }catch{}
    })

}