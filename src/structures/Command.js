module.exports = class Command {
  constructor(
    client,
    { name = undefined, description = undefined, aliases = [] }
  ) {
    this.client = client;
    this.name = name;
    this.description = description || "Aucune description spécifiée.";
    this.aliases = aliases || "";
  }
};
