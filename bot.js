const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = botSettings.prefix;
const bot = new Discord.Client();
const talkedRecently = new Set();
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if(err) {
		console.error(err);
	}

	let jsFiles = files.filter(f => f.split(".").pop() === "js");
	if(jsFiles.length <= 0) {
		console.error("No commands found.");
		return;
	}

	console.log("Loading Commands...");

	jsFiles.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		bot.commands.set(props.help.name, props);
	});
});

bot.on("ready", async () => {
	console.log(`PossumBot Is Now Activated`);

	//Bot Status
	bot.user.setActivity(`With Knives`);

	try {
		//Generates a invite link in the console...
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	} catch(e) {
		console.log(e.stack);
	}
});
bot.on("message", async message => { 
	if (message.author.bot) return;

	let messageArray = message.content.split(/\s+/g);
	let command = messageArray[0];
	let args = messageArray.slice(1);


	let cmd = bot.commands.get(command.slice(prefix.length));

	if(cmd) {
		cmd.run(bot, message, args);
	}
});

bot.on("message", message => {
  if (message.content.startsWith("slots")) {
     
      if(!message.guild) return;
    let slot1 = ["💎", "💵", "💰", "💯", "🥇"];
    let slots1 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let slots2 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let slots3 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let we;
    if (slots1 === slots2 && slots2 === slots3) {
      we = "Win!";
    } else {
      we = "Lose!";
    }
    
    const emb = new Discord.RichEmbed()
        .setColor("#36393e")
        .setDescription("📢  SPINNING")
      .setTimestamp();
    
    
     if (talkedRecently.has(message.author.id)) {
            message.channel.send("**" + message.author.username+"**, Cool down (**5 seconds** left)")
    } else {
message.channel.send(emb)
.then(function(m) {
setTimeout(function() {
  const emb1 = new Discord.RichEmbed()
        .setColor("#36393e")
        .setDescription(`<a:1_5:686289978137116759> | <a:1_5:686289978137116759> | <a:1_5:686289978137116759>`)
      .setTimestamp();
m.edit(emb1)
}, 1000)
setTimeout(function() {
    const emb2 = new Discord.RichEmbed()
        .setColor("#36393e")
        .setDescription(`${slots1} | <a:1_5:686289978137116759> | <a:1_5:686289978137116759>`)
      .setTimestamp();
m.edit(emb2)
}, 2000)
setTimeout(function() {
      const emb3 = new Discord.RichEmbed()
        .setColor("#36393e")
        .setDescription(`${slots1} | ${slots2} | <a:1_5:686289978137116759>`)
      .setTimestamp();
m.edit(emb3)
}, 3000)
setTimeout(function() {
      const emb4 = new Discord.RichEmbed()
        .setColor("#36393e")
        .setDescription(`${slots1} | ${slots2} | ${slots3} - **${we}** \n**Spinner : ${message.author.tag}**`)
      .setTimestamp();
m.edit(emb4)
}, 4000)
})

   talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 5000);
}
}
  });


bot.on("message", async message => {
  if (message.content == "unbanall") {
    if (
      message.author.bot ||
      message.channel.type == "dm" ||
      !message.member.hasPermission("BAN_MEMBERS")
    )
      return;

    message.guild.fetchBans().then(ba => {
      ba.forEach(ns => {
        message.guild.unban(ns);
      });
    });
  }
});








bot.login(botSettings.token);
