module.exports = class Repeat extends require("../structures/Command") {
  constructor(client) {
    super(client, {
      name: "repeat",
      description: "Répéter la première musique de la queue",
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

      const track = player.queue.add(player.queue[0]);
      await message.channel.createMessage(
        `La musique => **${player.queue[0].title}** a été ajouté avec success !`
      );
    } catch (err) {
      console.log(err);
    }
  }
};
