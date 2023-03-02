const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js');
const colors = require('colors');
const config = require('./config/config.js')
const { Poru } = require('poru');
require(`colors`)

const client = new Client({
    shards: "auto", // Obtenga la cantidad recomendada de fragmentos de Discord y genere esa cantidad.
    autoReconnect: true,
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
    },
    intents: [
        GatewayIntentBits.Guilds, // for guild related things
        GatewayIntentBits.GuildMembers, // for guild members related things
        GatewayIntentBits.GuildVoiceStates, // for voice related things
        GatewayIntentBits.GuildIntegrations, // for discord Integrations
        GatewayIntentBits.GuildMessageReactions // for discord Message Reactions
    ],
    partials: [
        Partials.User, // for discord user
        Partials.Channel, // for text channel
        Partials.Reaction, // for text Raction
        Partials.GuildMember // for guild member
    ]
});


client.poru = new Poru(client, config.NODES, {
    deezer: {
        playlistLimit: 10,
    },
    spotify: {
        clientID: config.SPOTIFY.clientID,
        clientSecret: config.SPOTIFY.clientSecret,
        playlistLimit: 5,
    },
    apple: {
        playlistLimit: 5,
    },
});



if (!config.TOKEN) {
    console.log("[WARN] Token for discord bot is required! put your token in config file".yellow.bold + "\n")
    return process.exit();
};


client.events = new Collection()
client.slash = new Collection()
client.config = require('./config/config.js');
client.embed = require(`./config/embed.js`);
client.emoji = require(`./config/emojis.js`);

module.exports = client;

["event", "slashCommand", "poruEvents" , "antiCrash" ].forEach(file => {
    require(`./handlers/${file}`)(client);
});

client.login(config.TOKEN)
    .catch((err) => {
        console.log("[CRUSH] Something went wrong while connecting to your bot" + "\n");
        console.log("[CRUSH] Error from DiscordAPI :" + err);
        process.exit();
    })


 