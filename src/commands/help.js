module.exports = class Play extends require("../structures/Command") {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Donne les commandes du bot",
            aliases: ["p"]
        });
    }

    async run(message) {
        try {
            const commands = this.client.commands
                .map(
                    (c) =>
                        `**[${c.name}](https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=-1)**\n*${c.description}.*`
                )
                .join("\n");

            const embed = {
                description: commands,
                color: 0x36393f,
                timestamp: new Date(),
                author: {
                    name: this.client.user.username,
                    url: `https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=-1`,
                    icon_url: this.client.user.avatarURL
                },
                footer: {
                    icon_url: this.client.user.avatarURL,
                    text: this.client.user.username
                }
            };
            return message.channel.createMessage({embed});
        } catch(err) {
            console.log(err);
        }
    }
};
