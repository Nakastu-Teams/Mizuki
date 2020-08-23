const client = require("./src/base/client.js");
const {readdirSync, readdir} = require("fs");

client.connect();

process.on("unhandledRejection", (err) => {
  console.log(err);
});

const init = async () => {
  readdirSync("./src/commands/")
    .filter((file) => file.endsWith(".js"))
    .forEach((cmd) => {
      loadCommand(`/src/commands/${cmd}`);
    });

  readdir("./src/events", (err, files) => {
    if(err) {
      throw err;
    }
    if(files.length < 0) {
      return console.log("Probleme | Aucun event trouvée !");
    }
    const events = files.filter((c) => c.split(".").pop() === "js");
    for(let i = 0; i < events.length; i++) {
      if(!events.length) {
        return console.log("Probleme | Aucun event trouvée !");
      }
      const FILE = require(`./src/events/${events[i]}`);
      const event = new FILE(client);
      client.on(events[i].split(".")[0], (args) => event.run(args));
    }
  });
};

function loadCommand(commandPath) {
  try {
    const props = new (require(`.${commandPath}`))(client);
    props.location = commandPath;
    client.commands.set(props.name, props);
    props.aliases.forEach((alias) => client.aliases.set(alias, props));
  } catch(error) {
    console.log(error);
  }
}
init();
