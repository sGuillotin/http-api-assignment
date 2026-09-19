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
    // if undefined or false
    if(!request.query.valid || request.query.valid !== 'true'){
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


const unauthorized = (request, response) => {
    console.log("unauthorized called");

    // "interrogate the url"
    // if undefined or false
    if(!request.query.valid || request.query.valid !== 'true'){
        const responseJSON = {
            message: "Login failed. Missing loggedIn query parameter set to yes",
            id: "unauthorized",
        }
        return respondJSON(request, response, 401, responseJSON);
    } else {
        const responseJSON = {
            message: "You have successfully viewed the content",
        }
        return respondJSON(request, response, 200, responseJSON);
    }
}



/**
 * falseObj {
 * message: string to be displayed
 * id: string id
 * statusCode: int to be displayed
 * }
 * 
 * ex:
 *    message: 'Missing valid query parameter set to true.',
 *    id: 'badRequest',
 *    statusCode: 400
 */
const reply = (request, response, falseObj, trueObj) => {
    // "interrogate the url"
    // if undefined or false
    if(!request.query.valid || request.query.valid !== 'true'){
        const responseJSON = {
            message: falseObj.message,
            id: falseObj.id
        }
        return respondJSON(request, response, falseObj.statusCode, responseJSON);
    } else {
        const responseJSON = {
            message: trueObj.message,
        }
        return respondJSON(request, response, trueObj.statusCode, responseJSON);
    }
}


module.exports = {
    notFound,
    badRequest,
    unauthorized
};