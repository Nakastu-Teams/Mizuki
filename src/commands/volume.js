module.exports = class Volume extends require("../structures/Command") {
  constructor(client) {
    super(client, {
      name: "volume",
      description: "Changer le volume du bot",
      aliases: ["vol"],
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
      let volume = args.join(" ");
      if (!volume || isNaN(volume)) {
        return client.music.musicEmbed(
          message,
          `Le volume est à ${player.volume / 10} %`
        );
      }
      try {
        await player.setVolume(volume * 10);
        return client.music.musicEmbed(
          message,
          `Le volume a été mis a ${volume}%`
        );
      } catch (error) {
        return client.music.musicEmbed(
          message,
          `Le volume doit etre compris entre 0 et 100`
        );
      }
      await player.setVolume(volume * 10);
    } catch (err) {
      console.log(err);
    }
  }
};
