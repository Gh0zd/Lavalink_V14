const client = require('../../index');
const colors = require('colors');
const { ActivityType } = require('discord.js');
const figlet = require('figlet');
module.exports = {
    name: "ready"
};

client.once('ready', async (client) => {
    client.poru.init(client);

    figlet(client.user.tag, function(err, data) {
    if (err) {
        console.dir(err);
        return;
    }
    console.log(`${data}`.red);
  });

    console.log(`[✅] ${client.user.tag} El Bot esta listo.`.bold)
    console.log("----------------------------------------".white);

    setInterval(() => {
        const statuses = [`Arcadia & Chocomara `];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, { type: ActivityType.Listening });
    }, 60000);
})
