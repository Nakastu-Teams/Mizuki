module.exports = class Skip extends require("../structures/Command") {
  constructor(client) {
    super(client, {
      name: "skip",
      description: "Passer à la musique suivante",
      aliases: ["next", "s"],
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
      await player.stop();
    } catch (err) {
      console.log(err);
    }
  }
};
