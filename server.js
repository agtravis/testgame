'use strict';

const express = require('express');
const expressHandlebars = require('express-handlebars');
const routes = require('./controllers/routes.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(routes);
app.listen(PORT, function() {
  console.log('Server running at: http://localhost:' + PORT);
});
