const express = require('express');
const app = express();

app.get('/hello', (req, res) =>
  res.send('Hello World!123'));

const PORT = 4000;
app.listen(PORT);
