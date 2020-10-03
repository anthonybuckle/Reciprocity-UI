const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

// create a GET route
app.get('/proxy', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/proxy', (req, res) => {
  const data = JSON.stringify(req.body);
  
  const options = {
    hostname: 'localhost',
    port: 8912,
    path: '/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }
  
  const request = http.request(options, (_res) => {
    console.log(`statusCode: ${_res.statusCode}`);
    _res.setEncoding('utf8');
    _res.on('data', (d) => {
      res.send(d);
    });
  });
  
  request.on('error', (error) => {
    console.error(error)
  });
  
  request.write(data);
  request.end();
});
