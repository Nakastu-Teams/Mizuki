module.exports = class embed {
  /**
   * @constructor
   */
  constructor(client) {
    this.client = client;
  }
  ImageEmbed(message, content) {
    const embed = {
      title: "🔞 Votre image ne s'affiche pas ? cliquez ici !",
      url: content,
      color: 0x36393f,
      timestamp: new Date(),
      footer: {
        icon_url: this.client.user.avatarURL(),
        text: this.client.user.username,
      },
      image: {
        url: content,
      },
    };
    return message.channel.send({ embed });
  }
  musicEmbed(message, content) {
    const embed = {
      title: content,
      color: 0x36393f,
      timestamp: new Date(),
      footer: {
        icon_url: this.client.user.avatarURL(),
        text: this.client.user.username,
      },
    };
    return message.channel.send({ embed });
  }
};
