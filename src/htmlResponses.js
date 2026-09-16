const fs = require('fs');   // import filesystems module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

/**
 * Serves HTML file in client directory
 */
const serveFile = (request, response, content) => {
    response.writeHead(200, {'Content-Type':'text/html'});
    response.write(content);
    response.end();
};

const getIndex = (request, reponse) => serveFile(request, response, index);

module.exports = {
    getIndex
}