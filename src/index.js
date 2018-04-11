const exec = require('./spec')
const net = require('net');
//var req = `GET / HTTP/1.1\r\nServer: nginx\r\nDate: Mon, 09 Apr 2018 09:39:51 GMT\r\nContent-Type: text/html;charset=utf-8\r\n`;
var res = `HTTP/1.1 200 OK\r\nServer: nginx\r\nDate: Mon, 09 Apr 2018 09:39:51 GMT\r\nContent-Type: text/html;charset=utf-8\r\n\n<h1>xxsdgx</h1>`;

const server = net.createServer((socket) => {
    socket.on("data",(data)=>{
        var req = data.toString("ascii");
        //console.log(data.toString("ascii"));

        exec(req, (err, req) => {
            //console.log(req.path)
            if (err)
                console.log(err);
            else
                console.log(req);
        });
    });
    socket.end(res);
  }).on('error', (err) => {
    throw err;
  });
  
  server.listen({port:8888},() => {
    console.log('opened server on', server.address().port);
  });