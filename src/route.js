const fs = require('fs');
const response = require('./response');

const dir = 'D:/HttpResolve';

const handleRequest = module.exports = async function(req,socket){
    if(req.getPath() === '/'){
        try{
            var content = await readFile(`${dir}/views/index.html`);
        }catch(err){
            notFound(socket);
            throw err;
            returnl
        }

        var res = new response(200);
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.setHeader('Content-Length',content.length);
        res.setBody(content);

        socket.end(res.toBuffer());
        return;
    }

    if(isHtml(req.getPath())){
        try{
            var content = await readFile(`${dir}/views/${req.getPath()}`);
        }catch(err){
            notFound(socket);
            throw err;
            return;
        }

        var res = new response(200);
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.setHeader('Content-Length',content.length);
        res.setBody(content);

        socket.end(res.toBuffer());
        return;
    }


    if(isCss(req.getPath())){
        try{
            var content = await readFile(`${dir}/public${req.getPath()}`);
        }catch(err){
            notFound(socket);
            throw err;
            return;
        }

        var res = new response(200);
        res.setHeader('Content-Type','text/css;charset=utf-8');
        res.setHeader('Content-Length',content.length);
        res.setBody(content);

        socket.end(res.toBuffer());
        return;
    }

    if(isPng(req.getPath())){
        try{
            var content = await readFile(`${dir}/public${req.getPath()}`);
        }catch(err){
            notFound(socket);
            throw err;
            return;
        }

        let res = new response(200);

        res.setHeader('Content-Type','image/png');
        res.setHeader('Content-Length',content.length);
        res.setBody(content);

        socket.end(res.toBuffer());
        return;
    }
    if(isJpeg(req.getPath())){
        try{
            var content = await readFile(`${dir}/public${req.getPath()}`);
        }catch(err){
            notFound(socket);
            throw err;
            return;
        }

        var res = new response(200);
        res.setHeader('Content-Type','image/jpeg');
        res.setHeader('Content-Length',content.length);
        res.setBody(content);

        socket.end(res.toBuffer());
        return;
    }

    notFound(socket);
}
function notFound(socket){
    let res = new response(404);
    socket.end(res.toBuffer());
}

function isCss(str){
    let reg = /\.css/;

    if(str.match(reg))
        return true;
    else
        return false;
}
function isPng(str){
    let reg = /\.png/;

    if(str.match(reg))
        return true;
    else
        return false;
}
function isJpeg(str){
    let reg = /\.jpg/;

    if(str.match(reg))
        return true;
    else
        return false;
}
function isHtml(str){
    let reg = /\.html/;

    if(str.match(reg))
        return true;
    else
        return false;
}

function readFile(path,encoding){
    return new Promise((resolve,reject) => fs.readFile(path,encoding,(err,data) => {
        if(err) reject(err);
        resolve(data);
    }));
}


