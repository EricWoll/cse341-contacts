const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contact User API',
        description: 'Description',
    },
    host: 'cse-341-contacts-project.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger-output.json';
const routes = ['../routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
