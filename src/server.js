const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,
}

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  // If there is an Accept header, split it into an array. If there is not, use an empty array so the next step does not crash.
  request.acceptedTypes = request.headers.accept ? request.headers.accept.split(',') : [];
  console.log(request.acceptedTypes);

  request.query = Object.fromEntries(parsedUrl.searchParams);
  // console.log(parsedUrl.searchParams);
  // console.log(request.query);

  if(urlStruct[parsedUrl.pathname]){
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
})





// TODO
// - Processing XML server side
// - displaying something client side




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