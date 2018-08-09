const http = require('http');
const https = require('https');
const app = require('./app.js');
const fs = require("fs");


const port = 40101;

const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/blockchain.sapnait.com/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/blockchain.sapnait.com/privkey.pem')
};




//const server = http.createServer(app);
const server = https.createServer(options, app).listen(port);
//const httpserver = http.createServer(app).listen(port);


console.log('SERVER START -p: ' + port );
//server.listen(port);


