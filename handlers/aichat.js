//import the config.json file
const config = require("../botconfig/config.json")
var ee = require(`../botconfig/embed.json`);
var emoji = require(`../botconfig/emojis.json`);
var {
    MessageEmbed, MessageAttachment
} = require(`discord.js`);
const { databasing } = require("./functions")
const fetch = require("node-fetch")
module.exports = client => {
  
    client.on("message", async message => {
        try{
            if (!message.guild || !message.channel || message.author.bot) return;
            client.settings.ensure(message.guild.id, {
                aichat: "no",
            });
            let chatbot = client.settings.get(message.guild.id, "aichat");
            if(!chatbot || chatbot == "no") return;
            if(message.channel.id == chatbot){
              if(message.attachments.size > 0)
              {
                  const attachment = new MessageAttachment("https://media.discordapp.net/attachments/905624274222600232/913350814804877332/z1c48d38ik161.gif")
                  return message.channel.send(attachment)
              }
              fetch(`http://api.brainshop.ai/get?bid=161641&key=ooGRDLUi1PlhdBwO&uid=1&msg=${encodeURIComponent(message)}`)
             .then(res => res.json())
             .then(data => {
                message.channel.send(data.cnt).catch(e => console.log("CHATBOT:".underline.red + " :: " + e.stack.toString().red));
             });
            }
        }catch{}
    })

}