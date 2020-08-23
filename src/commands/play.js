module.exports = class Play extends require("../structures/Command") {
    constructor(client) {
        super(client, {
            name: "play",
            description: "Jouer une musique",
            aliases: ["p"]
        });
    }

    async run(message, args) {
        const client = this.client;
        try {
            if(message.member.guild.voiceStates.size == 0) {
                return client.music.musicEmbed(
                    message,
                    "Vous devez être connecté dans un salon-vocal !"
                );
            } else if(
                !message.channel.guild.members
                    .get(client.user.id)
                    .permission.has("voiceConnect")
            ) {
                return client.music.musicEmbed(
                    message,
                    "Je n'ai pas la permission de `rejoindre` ce salon !"
                );
            } else if(
                !message.channel.guild.members
                    .get(client.user.id)
                    .permission.has("voiceSpeak")
            ) {
                return client.music.musicEmbed(
                    message,
                    "Je n'ai pas la permission de `parler` dans ce salon !"
                );
            }
            const search = args.join(" ");
            if(!search) {
                return client.music.musicEmbed(
                    message,
                    "Donnez-moi un nom de musique à chanter !"
                );
            }
            const player = await client.player.players.spawn({
                guild: message.member.guild.id,
                voiceChannel: message.member.guild.voiceStates.get(message.author.id)
                    .channelID,
                textChannel: message.channel
            });
            let song;
            try {
                song = await client.player.search(search, message.author);
            } catch(error) {
                return await message.channel.createMessage(
                    "Je n'ai trouvé aucunes musique "
                );
            }
            await player.queue.add(song.tracks[0]);
            if(!player.playing) {
                client.player
                    .on("trackStart", () => {
                        try {
                            const embed = {
                                title: player.queue[0].title,
                                description: `**Durée**:\n\`${this.client.music.time(
                                    player.queue[0].duration
                                )}\`\n `,
                                url: player.queue[0].uri,
                                footer: {
                                    icon_url: message.author.avatarURL,
                                    text: `demandé par ${message.author.username}`
                                },
                                thumbnail: {
                                    url: `https://img.youtube.com/vi/${player.queue[0].identifier}/maxresdefault.jpg`
                                },
                                author: {
                                    name: this.client.user.username,
                                    url: `https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=-1`,
                                    icon_url: this.client.user.avatarURL
                                }
                            };
                            message.channel.createMessage({embed});
                        } catch(e) {
                            return;
                        }
                    })
                    .on("queueEnd", async () => {
                        await client.player.players.destroy(message.member.guild.id);
                    });
                player.play();
            } else {
                return message.channel.createMessage(
                    `La musique => **${song.tracks[0].title}** a été ajouté avec success !`
                );
            }
        } catch(err) {
            console.log(err);
        }
    }
};
