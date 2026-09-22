// Previously respondJSON
const respondAny = (request, response, statusCode, responseObj) => {
    const isXML = request.acceptedTypes[0] === 'text/xml'; //if explicitly xml then xml
    const contentType = isXML ? 'text/xml' : 'application/json'; //if xml otherwise JSON
    const content = isXML ? toXML(responseObj) : JSON.stringify(responseObj); //upgraded content assignment to check based on if XML

    const headers = {
        'Content-Type': contentType,
        'Content-Length': Buffer.byteLength(content, 'utf-8'),
    };

    response.writeHead(statusCode, headers);

    if (request.method !== 'HEAD') {
        response.write(content);
    }

    response.end();
};


// XML Helper -----------------------------------------
const toXML = (object) => {
    let xml = '<response>';
    if (object.message) {
        xml += `<message>${object.message}</message>`;
    }
    if (object.id) {
        xml += `<id>${object.id}</id>`;
    }
    xml += '</response>';
    return xml;
};


// ENDPOINT HANDLERS --------------------------------------------------------------------

const success = (request, response) => respondAny(request, response, 200, { message: 'Success! You have succeeded.' });
const notFound = (request, response) => respondAny(request, response, 404, { message: 'The page you are looking for was not found.', id: 'notFound' });
const forbidden = (request, response) => respondAny(request, response, 403, { message: 'You shall not pass. You do not have access to this content.', id: 'forbidden' });
const internal = (request, response) => respondAny(request, response, 500, { message: 'Internal Server Error. Server kaboom.', id: 'internalError' });
const notImplemented = (request, response) => respondAny(request, response, 501, { message: 'A get request for this page has not been implemented yet. Check back again soon.', id: 'notImplemented' });



const badRequest = (request, response) => {
    // console.log("bad request called");

    // "interrogate the url"
    // if undefined or false
    if (!request.query.valid || request.query.valid !== 'true') {
        respondAny(request, response, 400, { message: 'Missing valid query parameter set to true.', id: 'badRequest' });
    } else {
        respondAny(request, response, 200, { message: 'This request has the required parameters.' });
    }
}


const unauthorized = (request, response) => {
    // console.log("unauthorized called");

    // "interrogate the url"
    // if undefined or false
    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
        respondAny(request, response, 401, { message: 'Login failed. Missing loggedIn query parameter set to yes.', id: 'unauthorized' });
    } else {
        respondAny(request, response, 200, { message: 'You have successfully viewed the content' });
    }
}


module.exports = {
    success,
    notFound,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented
};