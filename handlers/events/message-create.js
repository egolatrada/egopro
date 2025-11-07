const logger = require('../../utils/logger');

/**
 * Maneja mensajes nuevos en el servidor
 * Detecta cuando alguien copia/pega el texto de una tarea para marcarla como completada
 */
async function handleMessageCreate(message, context) {
    // Ignorar bots
    if (message.author.bot) return;

    // Ignorar si no hay sistema de tareas
    if (!context.tasksSystem) return;

    // Solo en servidores
    if (!message.guild) return;

    const { tasksSystem } = context;

    try {
        // Buscar si el mensaje coincide con alguna tarea
        const task = await tasksSystem.findTaskByText(message.guild.id, message.content);

        if (task) {
            // Marcar como completada
            await tasksSystem.completeTask(task.id);

            // ELIMINAR el mensaje del usuario (para no dejar basura en el canal)
            try {
                await message.delete();
            } catch (error) {
                // Si no se puede eliminar, solo reaccionar
                await message.react('✅').catch(() => {});
            }

            // Obtener tareas actualizadas
            const tasksByCategory = await tasksSystem.getTasksByCategory(message.guild.id);

            // Actualizar embeds originales (eliminar viejos y enviar nuevos)
            let newMessageIds = null;
            if (task.message_id && task.channel_id) {
                const oldMessageIds = task.message_id.split(',');
                newMessageIds = await tasksSystem.updateTaskEmbeds(
                    message.guild,
                    task.channel_id,
                    oldMessageIds,
                    tasksByCategory
                );

                // Solo actualizar IDs si el refresh fue exitoso
                if (newMessageIds && newMessageIds.length > 0 && 
                    newMessageIds.join(',') !== oldMessageIds.join(',')) {
                    await tasksSystem.updateMessageIds(
                        message.guild.id,
                        task.channel_id,
                        newMessageIds
                    );
                }
            }

            // No enviar ningún mensaje - solo actualizar embed silenciosamente
            logger.info(`✅ Tarea completada: "${task.task_text}" (Usuario: ${message.author.tag})`);
        }
    } catch (error) {
        logger.error('Error al procesar mensaje para tareas', error);
    }
}

module.exports = { handleMessageCreate };
