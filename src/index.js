const exec = require('./spec')

var req = `GET / HTTP/1.1\r\nServer: nginx\r\nDate: Mon, 09 Apr 2018 09:39:51 GMT\r\nContent-Type: text/html;charset=utf-8\r\n`;
var res = `HTTP/1.1 200 OK\r\nServer: nginx\r\nDate: Mon, 09 Apr 2018 09:39:51 GMT\r\nContent-Type: text/html;charset=utf-8\r\n\n<h1>xxsdgx</h1>`;

exec(req, (err, req) => {
    //console.log(req.path)
    if (err)
        console.log(err);
    else
        console.log(req);
});
