import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Pizzaria API',
      version: '1.0.0',
      description: 'API para um sistema de pizzaria',
    },
    servers: [
      {
        url: 'https://api-res-tful-para-sistema-de-pizzar.vercel.app/',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
