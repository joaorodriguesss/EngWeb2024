var http = require("http")
var url = require("url")
var meta = require('./aux1')

http.createServer(function(req, res) {

    console.log(req.method + " " + req.url)

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

    // res.write('<h1>Uma página Web</h1>'); 
    // res.write("<p>Página criada com node.js por"
    // + meta.myName() + " em " + meta.myDateTime() + " na turma " + meta.turma
    // )

    var q = url.parse(req.url, true)
    
    // /add?n1=X&n2=Y -> X+Y

    if (q.pathname == "/add"){
        var n1 = parseInt(q.query.n1,10)
        var n2 = parseInt(q.query.n2,10)
        var soma = n1 + n2
        
        res.write("<pre>"
            + n1
            + '+'
            + n2
            + '='
            + soma
            + "</pre>"
        )

    }
    else if (q.pathname == "/sub"){
        var n1 = parseInt(q.query.n1,10)
        var n2 = parseInt(q.query.n2,10)
        var menos = n1 - n2
        
        res.write("<pre>"
            + n1
            + '-'
            + n2
            + '='
            + menos
            + "</pre>"
        )

    }
    else{
        res.write("Operação não suportada")
    }


    res.end(); 
}).listen(2002, function() {
    console.log('Servidor aberto na porta 2002');
});