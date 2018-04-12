const exec = require('./spec')

async function request(data){
    var req = await exec(data);

    req.setHeader = setHeader;
    req.getHeader = getHeader;

    return req;
}

function setHeader(){
    console.log(156);
}

function getHeader(){
    console.log(156);
}

module.exports = request;
