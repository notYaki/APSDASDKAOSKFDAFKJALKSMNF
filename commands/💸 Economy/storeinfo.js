const {MessageEmbed} = require("discord.js");
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { parseMilliseconds, duration, GetUser, nFormatter, ensure_economy_user } = require("../../handlers/functions")
module.exports = {
  name: "storeinfo",
  category: "💸 Economy",
  aliases: ["store", "shop"],
  description: "Shows the Store",
  usage: "storeinfo",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    if(!client.settings.get(message.guild.id, "ECONOMY")){
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<:713400011714723932:891458936656515092> THIS COMMAND IS CURRENTLY DISABLED`)
        .setDescription(`An Admin can enable it with: **\`${prefix}setup-commands\``)
      );
    }
    try {
    //command
    var user = message.author;
    if(user.bot) return message.reply("<:713400011714723932:891458936656515092> **A Discord Bot can not have Economy!**")
    
      //ensure the economy data
      ensure_economy_user(client, message.guild.id, user.id)
    const data = client.economy.get(`${message.guild.id}-${user.id}`)
    var items = 0;
    var itemsvalue = 0;
    for (const itemarray in data.items){
      items += data.items[`${itemarray}`];
      var prize = 0;
      switch(itemarray.toLowerCase()){
        case "yacht": prize = 75000; break;
        case "lamborghini": prize = 50000; break;
        case "car": prize = 6400; break;
        case "motorbike": prize = 1500; break;
        case "bicycle": prize = 500; break;
    
        case "nike": prize = 300; break;
        case "tshirt": prize = 60; break;
    
        case "mansion": prize = 45000; break;
        case "house": prize = 8000; break;
        case "dirthut": prize = 150; break;
    
        case "pensil": prize = 20; break;
        case "pen": prize = 10; break;
        case "condom": prize = 30; break;
        case "bottle": prize = 50; break;
    
        case "fish": prize = 1000; break;
        case "hamster": prize = 1500; break;
        case "dog": prize = 2000; break;
        case "cat": prize = 2000; break;
      }
      itemsvalue += prize * data.items[`${itemarray}`];
    }
    const p2b = (costs) => (Number(costs) > Number(data.balance)) ? "<:713400011714723932:891458936656515092>" : "<a:762633663266553857:891459306195664898>";
    //return some message!
    return message.reply(new MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(user.tag + " | ❌ .. Unable to buy | ✅ ... Possible to buy", user.displayAvatarURL({dynamic: true}))
      .setTitle(`**🧸 | Available Items to be bought**`)
      .setDescription(`🧸 **You have \`${nFormatter(items)} Items\` with a value of: \`${nFormatter(itemsvalue)} 💸**\n\n**__How to buy an Item?__**\n> \`${prefix}buy <ITEMNAME> <AMOUNT>\``)
      .addField("✏️ Useables", ">>> " + 
`✏️ **\`Pensil [10 💸]\`** | ${p2b(10)}
🖊️ **\`Pen [20 💸]\`** | ${p2b(20)}
🟪 **\`Condom [30 💸]\`** | ${p2b(30)}
🍼 **\`Bottle [50 💸]\`** | ${p2b(50)}`
)
.addField("👕 Clothes", ">>> " + 
`👟 **\`Nike Shoe [300 💸]\`** | ${p2b(300)}
👕 **\`T-Shirt [60 💸]\`** | ${p2b(60)}`
)
.addField("🐕 Animals", ">>> " + 
`🐟\`Fish [1000 💸]\`** | ${p2b(1000)}
🐹 **\`Hamster [1500 💸]\`** | ${p2b(1500)}
🐕 **\`Dog [2000 💸]\`** | ${p2b(2000)}
😺 **\`Cat [2000 💸]\`** | ${p2b(2000)}`
)
.addField("🚗 Means of Transport", ">>> " + 
`🛥️\`Yacht [75000 💸]\`** | ${p2b(75000)}
🏎️ **\`Lamborghini [50000 💸]\`** | ${p2b(50000)}
🚗 **\`Car [6400 💸]\`** | ${p2b(6400)}
🏍️ **\`Motorbike [1500 💸]\`** | ${p2b(1500)}
🚲 **\`Bicycle [500 💸]\`** | ${p2b(500)}`
)
.addField("🏠 Livingarea", ">>> " + 
`🏘️ **\`Mansion [45000 💸]\`** | ${p2b(45000)}
🏠 **\`House [8000 💸]\`** | ${p2b(8000)}
🟫 **\`Dirthut [150 💸]\`** | ${p2b(150)}`
)
      );
  } catch (e) {
    console.log(String(e.stack).bgRed)
    return message.channel.send(new MessageEmbed()
      .setColor(es.wrongcolor)
      .setFooter(es.footertext, es.footericon)
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
