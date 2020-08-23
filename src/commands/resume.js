module.exports = class Resume extends require("../structures/Command") {
    constructor(client) {
        super(client, {
            name: "resume",
            description: "Remettre la musique en route",
            aliases: []
        });
    }

    async run(message) {
        const client = this.client;
        try {
            const player = await client.player.players.get(message.member.guild.id);
            if(!player) {
                return client.music.musicEmbed(
                    message,
                    "Je ne suis pas connecté dans un salon-vocal !"
                );
            } else if(
                !message.member.guild.voiceStates.get(message.author.id) ||
        message.member.guild.voiceStates.get(message.author.id).channelID !=
          player.voiceChannel
            ) {
                return client.music.musicEmbed(
                    message,
                    "Vous devez être connecté dans un salon-vocal !"
                );
            }
            if(!player.playing) {
                await player.pause(false);
                await client.music.musicEmbed(
                    message,
                    "▶ Je continue à jouer votre musique"
                );
            } else {
                await player.pause(true);
                await client.music.musicEmbed(
                    message,
                    "⏸ La musique était déjà en mode play, j'ai donc mis la musique en pause"
                );
            }
        } catch(err) {
            console.log(err);
        }
    }
};
