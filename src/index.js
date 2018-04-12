const net = require('net');
const fs = require('fs');
const request = require('./request');
const exec = require('./spec')

const dir = '/home/hwfhc/repo/HttpResolve';

function readFile(path,encoding){
    return new Promise((resolve,reject) => fs.readFile(path,encoding,(err,data) => {
        if(err) reject(err);
        resolve(data);
    }));
}

//var req = `GET / HTTP/1.1\r\nServer: nginx\r\nDate: Mon, 09 Apr 2018 09:39:51 GMT\r\nContent-Type: text/html;charset=utf-8\r\n`;
var res = `HTTP/1.1 200 OK\r\nContent-Type: text/html;charset=utf-8\r\n\r\n`;

const server = net.createServer(async socket => {
    socket.on("data",async data => {
        try{
            //var req = await exec(data.toString('ascii'));
            var req = await request(data.toString('ascii'));
            req.setHeader();
        }catch(err){
            throw err;
        }

        /*try{
            var content = await readFile(`${dir}/views/blog.html`,'utf8');
        }catch(err){
            throw err;
        }

        socket.end(res + content);*/
    });
}).on('error', (err) => {
    throw err;
});

server.listen({port:8080},() => {
    console.log('opened server on', server.address().port);
});
