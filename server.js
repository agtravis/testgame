'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));
app.get('/', (req, res) => {
  res.send('index.html');
});
app.listen(PORT, function() {
  console.log('Server running at: http://localhost:' + PORT);
});
