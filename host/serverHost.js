//! https://github.com/processing/p5.js/wiki/p5.js,-node.js,-socket.io

// HTTP Portion
const https = require('https');
// Path module
const path = require('path');
// const express = require('express');
// Using the filesystem module
var fs = require('fs');
const port = 8000;
const port2 = 8001;

// const app = express();

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

var server = https.createServer(options, handleRequest);
server.listen(port);
// app.listen(port);
console.log(`Server started on port ${port}`);

function handleRequest(req, res) {
  // What did we request?
  var pathname = req.url;

  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  } else if (pathname == '/data.json') {
    console.log('request json');

    return;
  }

  // Ok what's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'text/json',
  };
  // What is it?  Default to plain text

  var contentType = typeExt[ext] || 'text/plain';

  // User file system module
  fs.readFile(
    __dirname + pathname,
    // Callback function for reading
    function (err, data) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  );
}

setInterval(getJson, 15);

async function getJson() {
  await fetch(`192.168.8.6:${port2}/data.json`)
    .then((data) => {
      fs.writeFile('data.json', JSON.stringify(data), function (err) {
        if (err) {
          console.log(err);
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
