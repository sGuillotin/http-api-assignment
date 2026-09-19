const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const textHandler = require('./textResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/badRequest': jsonHandler.badRequest,
  notFound: jsonHandler.notFound,
}

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  request.query = Object.fromEntries(parsedUrl.searchParams);
  console.log(parsedUrl.searchParams);
  console.log(request.query);

  if(urlStruct[parsedUrl.pathname]){
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
})


// Currently using https://github.com/AustinWilloughby/Accept-Header-Status-Code-Spring-2026/blob/master/src/server.js



// 1. Server side before client side
// 2. XML later



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