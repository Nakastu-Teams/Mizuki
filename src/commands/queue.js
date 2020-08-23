module.exports = class Queue extends require("../structures/Command") {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Envois la file d'attente du serveur",
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
          "Il n'y a pas de musique dans la queue !"
        );
      }
      let time = 0;
      let text = `Actuelle ~ ${player.queue[0].title} (${client.music.time(
        player.queue[0].duration
      )})${
        player.queue.length > 1
          ? "\n\n\n######################## Suivant ########################\n\n"
          : ""
      }`;
      for (let i = 1; i < player.queue.length; i++) {
        text += `${i}. ${player.queue[i].title}\n`;
        time += player.queue[i].duration;
      }
      if (text.length > 1900) {
        text = text.substr(0, 1900);
        text = text + "...";
      }
      const embed = {
        title: "📝 Voici la queue du serveur:",
        description: `\`\`\`${text}\`\`\``,
        color: 0x36393f,
        timestamp: new Date(),
        author: {
          name: this.client.user.username,
          url: `https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=-1`,
          icon_url: this.client.user.avatarURL,
        },
        footer: {
          icon_url: this.client.user.avatarURL,
          text:
            "Temps total: " +
            client.music.time(time + player.queue[0].duration),
        },
      };
      return message.channel.createMessage({ embed });
    } catch (err) {
      console.log(err);
    }
  }
};
