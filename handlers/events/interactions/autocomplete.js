// Handler para autocomplete
const logger = require('../../../utils/logger');

async function handleAutocomplete(interaction, context) {
    const commandName = interaction.commandName;
    
    try {
        // Autocomplete para comandos personalizados
        if (commandName === 'crear-comando') {
            await context.customCommandsSystem.handleAutocomplete(interaction);
        }
        else {
            logger.warn(`Autocomplete no manejado para comando: ${commandName}`);
        }
    } catch (error) {
        logger.error(`Error en autocomplete para ${commandName}`, error);
    }
}

module.exports = { handleAutocomplete };
