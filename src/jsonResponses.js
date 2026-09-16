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


module.exports = {
    notFound
};