'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const expressHandlebars = require('express-handlebars');
const routes = require('./controllers/routes.js');
const app = express();
app.use(express.static('public'));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(routes);
// app.get('/', (req, res) => {
//   res.render('index');
// });
app.listen(PORT, function() {
  console.log('Server running at: http://localhost:' + PORT);
});
