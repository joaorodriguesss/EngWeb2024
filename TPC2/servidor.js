var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res) {
    var q = url.parse(req.url, true).pathname.slice(1)

    if (q === '') {
        serveFile('cidadesSite/index.html', 'text/html; charset=utf-8', res)
    } else if (q === 'w3.css') {
        serveFile('w3.css', 'text/css; charset=utf-8', res);
    } else {
        fs.readFile('mapa-virtual.json', function(err, data) {
            if (err) {
                sendError(res);
            } else {
                var ids = JSON.parse(data).cidades.map(cidade => cidade.id)
                if (ids.includes(q)) {
                    serveFile('cidadesSite/' + q + '.html', 'text/html; charset=utf-8', res)
                } else {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write("Error 404");
                    res.end()
                }
            }
        });
    }
}).listen(7777);

function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, function(err, data) {
        if (err) {
            sendError(res);
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        }
    });
}

function sendError(res) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.write('Error reading file');
    res.end();
}