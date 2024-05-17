var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDefinition = require('./docs/swaggerDefinition');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler.middleware');

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', routes);
app.use(errorHandler);

module.exports = app;
