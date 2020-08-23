module.exports = class Pause extends require("../structures/Command") {
  constructor(client) {
    super(client, {
      name: "pause",
      description: "Mettre en pause la musique",
      aliases: [],
    });
  }

  async run(message, args) {
    const client = this.client;
    try {
      const player = await client.player.players.get(message.member.guild.id);
      if (!player) {
        return client.music.musicEmbed(
          message,
          "Je ne suis pas connecté dans un salon-vocal !"
        );
      } else if (
        !message.member.guild.voiceStates.get(message.author.id) ||
        message.member.guild.voiceStates.get(message.author.id).channelID !=
          player.voiceChannel
      ) {
        return client.music.musicEmbed(
          message,
          "Vous devez être connecté dans un salon-vocal !"
        );
      }
      if (!player.playing) {
        await player.pause(false);
        await client.music.musicEmbed(
          message,
          "▶ La musique était déjà en pause, j'ai donc remis la musique sur play"
        );
      } else {
        await player.pause(true);
        await client.music.musicEmbed(
          message,
          "⏸ J'ai mis votre musique en pause"
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
};
