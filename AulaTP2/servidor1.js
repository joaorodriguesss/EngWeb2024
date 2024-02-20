var http = require("http");

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.write('Olá Mundo!Turma EngWeb 2024'); 
    res.end(); 
}).listen(2002, function() {
    console.log('Servidor aberto na porta 2002');
});