import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'notes-app-api',
      version: '1.0.0',
      description: 'My first API'
    },
    servers: [
      {
        url: 'http://localhost:4200',
        description: 'local server'
      }
    ]
  },
  apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}