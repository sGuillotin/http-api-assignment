const respondJSON = (request, response, status, object) => {
    const content = JSON.stringify(object);
    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf-8')
    };

    response.writeHead(status, headers);

    if (request.method !== 'HEAD') {
        response.write(content);
    }
    
    response.end;
};





/**
 * Parameterize to save like 4 words
 * responseObj --> creates overloading effect (id only prints when provided)
 */
const reply = (request, response, responseObj, statusCode) => {
    const responseJSON = {
        message: responseObj.message,
        id: responseObj.id,
    }
    
    return respondJSON(request, response, statusCode, responseJSON);
};



const success = (request, response) => reply(request, response, { message: 'Success! You have succeeded.'}, 200);

const notFound = (request, response) => reply(request, response, { message: 'The page you are looking for was not found.', id:'notFound' }, 404);






const badRequest = (request, response) => {
    // console.log("bad request called");

    // "interrogate the url"
    // if undefined or false
    if(!request.query.valid || request.query.valid !== 'true'){
        reply(request, response, { message: 'Missing valid query parameter set to true.', id: 'badRequest'}, 400);
    } else {
        reply(request, response, { message: 'This request has the valid parameters.'}, 200);
    }
}


const unauthorized = (request, response) => {
    // console.log("unauthorized called");

    // "interrogate the url"
    // if undefined or false
    if(!request.query.loggedIn || request.query.loggedIn !== 'yes'){
        reply(request, response, { message: 'Login failed. Missing loggedIn query parameter set to yes.', id: 'unauthorized'}, 401);
    } else {
        reply(request, response, { message: 'You have successfully viewed the content'}, 200);
    }
}


module.exports = {
    success,
    notFound,
    badRequest,
    unauthorized
};