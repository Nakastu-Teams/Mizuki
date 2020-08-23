module.exports = class Message extends require("../structures/Event") {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        });
    }

    async run(message) {
        const client = this.client;
        if(message.channel.type == "dm" || message.type == "GUILD_MEMBER_JOIN") {
            return;
        }
        if(
            !message.channel.guild.members
                .get(client.user.id)
                .permission.has("sendMessages")
        ) {
            return;
        }
        if(message.author.bot) {
            return;
        }
        const prefixes = client.config.prefix;
        if(!message.content.startsWith(prefixes)) {
            return;
        }
        const args = message.content.slice(prefixes.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command) || client.aliases.get(command);

        try {
            cmd.run(message, args);
        } catch(error) {
            return;
        }
    }
};
