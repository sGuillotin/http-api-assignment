const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const replyHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': replyHandler.success,
  '/badRequest': replyHandler.badRequest,
  '/unauthorized': replyHandler.unauthorized,
  '/forbidden': replyHandler.forbidden,
  '/internal': replyHandler.internal,
  '/notImplemented': replyHandler.notImplemented,
  notFound: replyHandler.notFound,
}

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  // If there is an Accept header, split it into an array. If there is not, use JSON
  request.acceptedTypes = request.headers.accept ? request.headers.accept.split(',') : ['application/json'];
  // console.log("request.acceptedTypes", request.acceptedTypes);

  request.query = Object.fromEntries(parsedUrl.searchParams);
  // console.log(parsedUrl.searchParams);
  // console.log(request.query);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
})





// TODO
// - test all raw direct xmls
// - print raw responses




// 1. Server side before client side
// 2. XML later

/**
 * /success
 * /unauth
 * /forbidden
 * /internal
 * /notimplemented
 * any other url
 *
 * accept header from client to server - default to JSON
 * XML
 * button, form, and fetch
 */



// XML - announcement on mycourses (below)
/*
const getCats = (request, response) => {
  const cat = { name: 'Rhyleigh', age: 20 };

  if (request.acceptedTypes[0] === 'application/xml') {
    let responseXML = '<response>';
    responseXML += `<name>${cat.name}</name>`;
    responseXML += `<age>${cat.age}</age>`;
    responseXML += '</response>';
    return respond(request, response, responseXML, 'application/xml');
  }

  return respond(request, response, JSON.stringify(cat), 'application/json');
};
*/

// see also here for more complex version  https://github.com/AustinWilloughby/Accept-Header-Status-Code-Spring-2026/blob/master/src/server.js
// also good https://github.com/IGM-RichMedia-at-RIT/status-code-example-done/blob/master/src/jsonResponses.js#L39

// SOURCES
// https://github.com/IGM-RichMedia-at-RIT/status-code-example-done/blob/master/client/client.html
// https://github.com/AustinWilloughby/Accept-Header-Status-Code-Spring-2026/blob/master/src/responses.js
// https://github.com/IGM-RichMedia-at-RIT/http-api-assignment/blob/master/client/client.html
// https://github.com/IGM-RichMedia-at-RIT/head-request-example-done/blob/master/src/jsonResponses.js
// (my stuff)
// https://github.com/sGuillotin/head-request-class-example/blob/master/client/client.html
// https://github.com/sGuillotin/streaming-media-assignment/blob/master/src/server.js 