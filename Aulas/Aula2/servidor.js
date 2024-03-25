var http = require("http");

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<p><b>Olá Turma de 2024</b></p>'); 
    res.end(); 
}).listen(7777, function() {
    console.log('Servidor aberto na porta 7777');
});