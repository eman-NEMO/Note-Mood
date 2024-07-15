// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

app.get('/data', (req, res) => {
  const dataPath = path.join(__dirname, 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
      return;
    }
    res.header('Content-Type', 'application/json');
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
