const OpenAI = require('openai');

class AISystem {
    constructor() {
        // Check if AI credentials are available
        const hasReplitAI = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
        const hasOpenAI = process.env.OPENAI_API_KEY;
        
        if (hasReplitAI) {
            // Using Replit's AI Integrations service
            this.openai = new OpenAI({
                baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
                apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
            });
            this.enabled = true;
            console.log('✅ Sistema de IA inicializado (Replit AI)');
        } else if (hasOpenAI) {
            // Using standard OpenAI API
            this.openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
            });
            this.enabled = true;
            console.log('✅ Sistema de IA inicializado (OpenAI)');
        } else {
            // No AI credentials available - disable AI features
            this.openai = null;
            this.enabled = false;
            console.log('⚠️ Sistema de IA deshabilitado (sin credenciales)');
        }
    }

    /**
     * Genera respuesta de Q&A usando GPT-4
     */
    async generateQAResponse(question, context = '') {
        if (!this.enabled) {
            return 'Lo siento, el sistema de IA no está disponible en este momento.';
        }
        
        try {
            const systemPrompt = `Eres un asistente útil del servidor de Discord "Strangers RP". 
Responde preguntas sobre el servidor de manera amigable y concisa.
${context ? `\n\nContexto del servidor:\n${context}` : ''}`;

            const completion = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: question }
                ],
                temperature: 0.7,
                max_tokens: 500,
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Error al generar respuesta de IA:', error);
            throw error;
        }
    }

    /**
     * Modera contenido usando IA
     */
    async moderateContent(content) {
        if (!this.enabled) {
            return { flagged: false, categories: {} };
        }
        
        try {
            const response = await this.openai.moderations.create({
                input: content,
            });

            return response.results[0];
        } catch (error) {
            console.error('Error al moderar contenido:', error);
            throw error;
        }
    }

    /**
     * Genera una respuesta genérica (para categorización de tareas, etc)
     */
    async generateResponse(prompt, context = []) {
        if (!this.enabled) {
            return 'CATEGORÍA_GENERAL';
        }
        
        try {
            const messages = [
                { role: 'system', content: 'Eres un asistente útil que categoriza tareas de manera precisa.' },
                ...context,
                { role: 'user', content: prompt }
            ];

            const completion = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: messages,
                temperature: 0.3,
                max_tokens: 200,
            });

            return completion.choices[0].message.content.trim();
        } catch (error) {
            console.error('Error al generar respuesta de IA:', error);
            throw error;
        }
    }
}

module.exports = AISystem;
