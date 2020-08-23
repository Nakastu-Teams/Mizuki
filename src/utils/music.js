class Music {
    /**
   * @constructor
   */
    constructor(client) {
        this.client = client;
    }
    musicEmbed(message, content) {
        const embed = {
            title: content,
            color: 0x36393f,
            timestamp: new Date(),
            author: {
                name: this.client.user.username,
                url: `https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=-1`,
                icon_url: this.client.user.avatarURL
            },
            footer: {
                icon_url: this.client.user.avatarURL,
                text: this.client.user.username
            }
        };
        return message.channel.createMessage({embed});
    }
    time(millisec) {
        let seconds = (millisec / 1000).toFixed(0);
        let minutes = Math.floor(seconds / 60);
        let hours = "";
        if(minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = hours >= 10 ? hours : "0" + hours;
            minutes = minutes - hours * 60;
            minutes = minutes >= 10 ? minutes : "0" + minutes;
        }

        seconds = Math.floor(seconds % 60);
        seconds = seconds >= 10 ? seconds : "0" + seconds;
        if(hours != "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
    }
}

module.exports = Music;
