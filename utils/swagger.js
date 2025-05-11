const swaggerJSDocs = require('swagger-jsdoc');

const swaggerOptions = {
  definition: { 
    openapi: '3.0.0',
    info: {
      title: 'CRM PANEL API documentation',
      version: '1.0.0',
      description: 'CRM PANEL API documentation with examples',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDocs(swaggerOptions);

module.exports = swaggerDocs;
