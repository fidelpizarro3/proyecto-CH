
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Adopciones API',
      version: '1.0.0',
      description: 'Documentación de la API de adopciones',
    },
  },
  apis: ['./src/routes/*.js'], // Ruta donde están los comentarios Swagger
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
