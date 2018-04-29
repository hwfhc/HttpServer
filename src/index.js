const net = require('net');
const exec = require('./spec')

const request = require('./request');
const route = require('./route');


const server = net.createServer(socket => {
    socket.on("data",async data => {
        try{
            var req = await request(data.toString('ascii'));
        }catch(err){
            throw err;
        }

        console.log(`receive request: ${req.getPath()}`);
        await route(req,socket);
    });
}).on('error', (err) => {
    throw err;
}).listen({port:8080},() => {
    console.log('opened server on', server.address().port);
});


