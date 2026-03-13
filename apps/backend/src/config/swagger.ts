// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Archer1 API',
            version: '1.0.0',
            description: 'API para gestión de actividades agrícolas',
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Local' },
            { url: 'https://archer1-backend.onrender.com', description: 'Producción' },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: [
        './src/routes/*.ts',
        './src/routes/*.js',
    ],
});