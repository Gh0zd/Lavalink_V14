const fs = require('fs');
const colors = require('colors');

module.exports = (client) => {

    fs.readdirSync('./src/events/').forEach(dir => {
        const commands = fs.readdirSync(`./src/events/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../events/${dir}/${file}`);
            if (pull.name) {
                client.events.set(pull.name, pull);
                console.log(`[✅] Cargó un archivo : ${pull.name}`.green)
            } else {
                console.log("\n" + "──────────────────・ ・──────────────────".red)
                console.log(`[❌] No se pudo cargar el archivo ${file}, falta nombre o alias`.bold)
                console.log("──────────────────・ ・──────────────────".red)
                continue;
            }
        }
    })
    console.log("──────────────────・ ・──────────────────".yellow);
}