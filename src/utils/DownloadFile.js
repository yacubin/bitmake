const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadFile(url, file, options)
{
  return new Promise((resolve, reject) => {
    const httpOptions = {
      method: 'GET',
      timeout: 5000,
      headers: {
        "User-Agent": "bitmake/0.0.1-develop.1",
        "Accept": "*/*",
      },
    };

    const filename = path.basename(url);

    const client = (() => {
      if (file) {
        const fd = fs.openSync(file, "w");
        return {
          onData: (chunk) => {
            fs.writeSync(fd, chunk);
          },
          onEnd: () => {
            fs.closeSync(fd);
            resolve();
          },
        };
      }
      else {
        const chunks = [];
        return {
          onData: (chunk) => {
            chunks.push(chunk);
          },
          onEnd: () => {
            resolve(Buffer.concat(chunks));
          },
        };
      }
    })();
  
    const startRequest = (url, callback) => {
      const request = https.request(url, httpOptions, callback);
      if (request) {
        request.on('error', (error) => reject(error));
        request.end(); 
      }
      else {
        reject(`Url scheme not supported for ${url}`);
      }
    };

    const onRequest = (response) => {
      switch (response.statusCode) {
      case 200:
        console.log(`Conncted to ${response.req.host}`);
        console.log(`Downloading ${filename}`);
        response.on('data', client.onData);
        response.on('end', client.onEnd);
        response.on('close', () => console.log(`Done`));
        break;

      case 301:
      case 302:
        response.resume();
        console.log(`Resolving ${response.headers.location}`);
        startRequest(response.headers.location, onRequest);
        break;

      default:
        response.resume();
        reject(`Did not get an OK from the server. Code: ${response.statusCode}`);
        break;
      }
    };

    console.log(`Request to ${url}`);
    startRequest(url, onRequest);
  });
}

module.exports = {
  downloadFile,
};
