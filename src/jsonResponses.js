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



const notFound = (request, response) => {
    const responseJSON = {
        message: 'The page you are looking for was not found.',
        id: 'notFound',
    }
    
    return respondJSON(request, response, 404, responseJSON);
};

const badRequest = (request, response) => {
    console.log("bad request called");

    // "interrogate the url"
    if(request.query.valid === 'true'){
        const responseJSON = {
            message: 'Missing valid query parameter set to true.',
            id: 'badRequest',
        }
        return respondJSON(request, response, 400, responseJSON);
    } else {
        const responseJSON = {
            message: 'This request has the valid parameters.',
        }
        return respondJSON(request, response, 200, responseJSON);
    }
}


module.exports = {
    notFound,
    badRequest
};