const Event = require("../structures/Event");
const {ErelaClient} = require("erela.js");
class Ready extends Event {
  constructor(args) {
    super(args, {
      name: "Ready"
    });
  }

  async run() {
    const client = this.client;
    console.log(client.user.username + " est actuellement en ligne");
    client.player = new ErelaClient(client, client.config.nodes);
    setTimeout(() => {
      const activities_list = [
        `${client.config.prefix}help || ${client.users.size} utilisateurs`,
        `${client.config.prefix}help || ${client.guilds.size} servers`,
        `${client.config.prefix}help || Version: ${
          require("../../package").version
        }`
      ];

      const index = Math.floor(
        Math.random() * (activities_list.length - 1) + 1
      );

      client.editStatus("online", {
        name: activities_list[index],
        type: 1,
        url: "https://www.twitch.tv/monstercat"
      });
    }, 20 * 1000);
  }
}

module.exports = Ready;
