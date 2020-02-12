const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
    try {
        message.guild.leave();
        	} catch(e) {
     		    console.log(e.stack);
        }
}

module.exports.help = {
    name: "xcwcqscazccxcc",
    desc: "Leaves the server.",
}
