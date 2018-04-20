const exec = require('./spec')

function request(data){
    return new Promise((resolve,reject) => {
        exec(data,function(err,req){
            if(err) reject(err);

            req.getPath = getPath;
            req.getMethod = getMethod;
            req.setHeader = setHeader;
            req.getHeader = getHeader;

            resolve(req);
        });
    });
}

function getMethod(){
    if(!this) throw Error(`this is miss`);

    return this.method;
}

function getPath(){
    if(!this) throw Error(`this is miss`);

    return this.path;
}

function setHeader(header,value){
    if(!this) throw Error(`this is miss`);

    this.headers.push({
        key: header,
        value: value
    });
}

function getHeader(header){
    if(!this) throw Error(`this is miss`);

    for(var i=0;i<this.headers.length;i++)
        if(this.headers[i].key === header)
            return this.headers[i].value
}

module.exports = request;
