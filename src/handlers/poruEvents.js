const { readdirSync } = require('fs');
const colors = require('colors')

module.exports = (client) => {
    console.log("──────────────────・ ・──────────────────".yellow);
    const commands = readdirSync(
        __dirname.replace('handlers', 'poruEvents'),
    ).filter((file) => file.endsWith('.js'));

    for (const file of commands) {
        try {
            const pull = require(`${__dirname.replace(
                'handlers',
                'poruEvents',
            )}/${file}`);

            if (pull.event && typeof pull.event !== 'string') {
                console.log(`[❌] El evento de propiedad debe ser una cadena : ${file}`.red)
                continue;
            }

            pull.event = pull.event || file.replace('.js', '');

            client.poru.on(pull.event, pull.run.bind(null, client));

            console.log(`[✅] Cargó un archivo : ${file}`.blue)
        } catch (err) {
            console.log(`[❌] Error al cargar evento poru: ${file}`.red);
            console.log(err)
        }
    }
};
