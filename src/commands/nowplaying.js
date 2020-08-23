module.exports = class Nowplaying extends require("../structures/Command") {
  constructor(client) {
    super(client, {
      name: "nowplaying",
      description: "Voir la lecture en cours",
      aliases: ["np"],
    });
  }

  async run(message, args) {
    const client = this.client;
    try {
      const player = await client.player.players.get(message.member.guild.id);
      if (!player) {
        return client.music.musicEmbed(
          message,
          "Je ne joue actuellement pas !"
        );
      }

      let duration = client.music.time(player.queue[0].duration);
      let progression = client.music.time(player.position);
      let progressBar = [
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
        "▬",
      ];
      let calcul = Math.round(
        progressBar.length *
          (player.position / 1000 / (player.queue[0].duration / 1000))
      );
      progressBar[calcul] = "🔘";

      const embed = {
        description:
          `[${player.queue[0].title}](${player.queue[0].uri})\n\n\`[` +
          progression +
          "]` " +
          progressBar.join("") +
          " `[" +
          duration +
          "]`",
        color: 0x36393f,
        timestamp: new Date(),
        author: {
          name: client.user.username,
          url: `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1`,
          icon_url: client.user.avatarURL,
        },
        footer: {
          text: `Ajouté par: ${player.queue[0].requester.username}`,
        },
        thumbnail: {
          url: `https://img.youtube.com/vi/${player.queue[0].identifier}/maxresdefault.jpg`,
        },
      };
      return message.channel.createMessage({ embed });
    } catch (err) {
      console.log(err);
    }
  }
};
