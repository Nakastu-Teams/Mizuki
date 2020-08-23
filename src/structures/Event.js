class Event {
    constructor(client, {name = undefined}) {
        this.client = client;
        this.name = name;
    }

    async run(event) {
        try {
            await this.run(event);
        } catch(err) {
            if(err) {
                return console.log(err);
            }
        }
    }
}

module.exports = Event;
