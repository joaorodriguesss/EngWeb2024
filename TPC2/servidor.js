var http = require("http")
var url = require("url")
var axios = require("axios")

http.createServer(function(req, res) {

    console.log(req.method + " " + req.url);

    var q = url.parse(req.url, true)

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

    if (q.pathname == "/cidades"){
        axios.get("http://localhost:3000/cidades?_sort=nome")
        .then((resp) => {
            var data = resp.data

            res.write("<ul>")
            for(i in data){
                res.write("<li><a href='/cidades/" + data[i].id + "'>" + data[i].nome + "</a></li>")
            }
            res.write("</ul>")
            res.end()
        })
        .catch((erro) => {
            console.log("Erro: " + erro);
            res.write("<p>" + erro + "</p>")
        })
    }else if (req.url.match (/\/cidades\/c|d+/)){
        let id = req.url.substring(9)
        axios.get("http://localhost:3000/cidades/" + id)
        .then((resp) => {
            var data = resp.data

            res.write("<h1>" + data.nome + "</h1>")
            res.write("<h3>" + data.distrito + "</h3>")
            res.write("<b> Populacão: </b>" + data["população"])
            res.write("<br>")
            res.write(data["descrição"])
            res.write("<h6><a href ='/cidades'>Voltar</a></h6>")

            res.end()
        })
        .catch((erro) => {
            console.log("Erro: " + erro);
            res.write("<p>" + erro + "</p>")
        })
        res.end()
    }
    else{
        res.write("Operação não suportada")
        res.end()
    }
    res.end(); 

}).listen(7777, function() {
    console.log('Servidor aberto na porta 7777');
});