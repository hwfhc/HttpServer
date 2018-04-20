function response(status){
    return {
        version: 'HTTP/1.1',
        status: status,
        headers: [],
        body: null,

        setBody,toBuffer,setHeader,getHeader
    }

}

function toBuffer(){
    if(!this) throw Error(`this is miss`);

    var { version,status,headers,body } = this;

    var head = ''
    for(var i=0;i<headers.length;i++)
        head += this.headers[i].key + ': ' + this.headers[i].value + '\r\n';

    if(this.status === 200)
        var buf1 = Buffer.from(`${version} ${status} OK\r\n${head}\r\n`);
    else
        var buf1 = Buffer.from(`${version} ${status} Not Found\r\n${head}\r\n`);

    var buf2 = body;

    if(buf2)
        return Buffer.concat([buf1,buf2]);
    else
        return buf1;
}

function setBody(body){
    if(!this) throw Error(`this is miss`);

    this.body = body;
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

module.exports = response;
