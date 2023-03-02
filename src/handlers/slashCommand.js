const client = require('../index');
const config = require("../config/config.js");
const { REST, Routes } = require('discord.js');
const fs = require('fs')
const colors = require('colors');
const ascii = require('ascii-table')
module.exports = async () => {

    const slash = [];
                   
    fs.readdirSync('./src/commands/slash/').forEach(dir => {
        const commands = fs.readdirSync(`./src/commands/slash/${dir}`).filter(file => file.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commands/slash/${dir}/${file}`);

            if (pull.name) {
                slash.push(pull)
                client.slash.set(pull.name, pull);

                console.log(`[✅] Cargó un archivo : ${pull.name}`.cyan);

            } else {
                console.log(`[❌] No se pudo cargar el archivo ${file}, falta el valor del nombre del módulo.`.red)
                continue;
            }
        }
    });

    if (!config.CLIENTID) {
        console.log("[❌] Debe proporcionar su ID de cliente en el archivo de configuración".red + "\n");
        return process.exit()
    };

    const rest = new REST({ version: '10' }).setToken(config.TOKEN);


    await rest.put(
        Routes.applicationCommands(config.CLIENTID),
        { body: slash }
    ).then(() => {
        console.log("──────────────────・ ・──────────────────".magenta);
        console.log(`[✅] Los comandos de barra se han registrado con éxito en todos los gremios.`.magenta.bold);
        console.log("──────────────────・ ・──────────────────".magenta);
    })
}