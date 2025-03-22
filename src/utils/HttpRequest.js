const http = require('http');
const https = require('https');

function httpRequest(url, options, callback) {
  if (url.startsWith("https://"))
    return https.request(url, options, callback);
  return http.request(url, options, callback);
};

function requestGet(url) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      timeout: 5000,
    };

    const onError = (err) => {
      const message = "Encountered an error trying to make a request: " + err.message;
      console.error(message, err);
      reject(message);
    };

    const onTimeout = (request) => {
      request.destroy();
      console.error("  Timeout", url);
      reject("Timeout");
    }

    const onRequest = (response) => {
      switch (response.statusCode) {
      case 200:
        const chunks = [];
        response.on("data", chunk => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks)));
        response.on('close', () => console.log('  Close'));
        break;

      case 301:
      case 302:
        response.resume();
        console.log(`Redirect to ${response.headers.location}`);
        const request = httpRequest(response.headers.location, options, onRequest);
        request.on('timeout', onTimeout.bind(null, request));
        request.on('error', onError);
        request.end();
        break;

      default:
        response.resume();
        const message = "Did not get an OK from the server. Code: " + response.statusCode;
        console.error(message);
        reject(message);
        break;
      }
    };

    console.log(`wget ${url}`);
    const request = httpRequest(url, options, onRequest);
    request.on('timeout', onTimeout.bind(null, request));
    request.on('error', onError);
    request.end();
  });
};

module.exports = {
  requestGet,
};
