module.exports = class Leave extends require("../structures/Command") {
    constructor(client) {
        super(client, {
            name: "leave",
            description: "Fait sortir le bot du salon-vocal",
            aliases: ["stop"]
        });
    }

    async run(message) {
        const client = this.client;
        try {
            const player = client.player.players.get(message.member.guild.id);
            if(!player) {
                return client.music.musicEmbed(
                    message,
                    "Je ne suis pas connecté dans un salon-vocal !"
                );
            }

            if(!message.member.guild.voiceStates.get(message.author.id) ||
                message.member.guild.voiceStates.get(message.author.id).channelID !=
                player.voiceChannel) {
                return client.music.musicEmbed(
                    message,
                    "Vous devez être connecté dans un salon-vocal !"
                );
            }
            await client.player.players.destroy(message.member.guild.id);
            await client.music.musicEmbed(
                message,
                "✅ J'ai bien quitté le salon suite à votre demande"
            );
        } catch(err) {
            console.log(err);
        }
    }
};
