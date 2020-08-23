const Eris = require("eris");
const { ErelaClient } = require("erela.js");
const MUSIC = require("../utils/music");

const client = new Eris(require("../../configs").token, {
  disableEveryone: true,
  messageLimit: 1,
});

client.config = require("../../configs");
client.commands = new Eris.Collection();
client.aliases = new Eris.Collection();
client.music = new MUSIC(client);
module.exports = client;
