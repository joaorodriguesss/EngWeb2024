// alunos_server.js
// EW2024 : 04/03/2024
// by jcr

var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if (req.url == '/' || req.url == '/alunos'){
                    axios.get("http://localhost:3000/alunos?_sort=nome")
                        .then(resp=>{
                            alunos = resp.data
                            res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentsListPage(alunos,d))

                        })
                        .catch(erro=> {
                            res.writeHead(503,{'Content-Type': 'text/html; charset=utf-8'})
                            res.write("Método não suportado")
                            res.end()
                        })

                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if(/\alunos\/(A|PG)[0-9]+$/i.test(req.url)){
                    id = req.url.split('/')[2]
                    axios.get("http://localhost:3000/alunos/" + id)
                    .then(resp=>{
                        aluno = resp.data
                        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.studentPage(aluno,d))
                    })
                    .catch(erro=>{
                        res.writeHead(504,{'Content-Type': 'text/html; charset=utf-8'})
                            res.write("Não foi possivel encontrar a informação do aluno")
                            res.end()
                    })
                }
                
                // GET /alunos/registo --------------------------------------------------------------------
                else if (req.url == '/alunos/registo'){
                    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                }
               
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if(/\alunos\/edit\/(A|PG)[0-9]+$/i.test(req.url)){
                    id = req.url.split('/')[3]
                    axios.get("http://localhost:3000/alunos/" + id)
                    .then(resp=>{
                        aluno = resp.data
                        res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.studentFormEditPage(aluno,d))
                    })
                    .catch(erro=>{
                        res.writeHead(505,{'Content-Type': 'text/html; charset=utf-8'})
                            res.write("Não foi possivel encontrar a informação do aluno")
                            res.end()
                    })
                }

               
                // GET /alunos/delete/:id --------------------------------------------------------------------
                else if(/\alunos\/delete\/(A|PG)[0-9]+$/i.test(req.url)){
                    id = req.url.split('/')[3]
                    axios.delete("http://localhost:3000/alunos/" + id)
                    .then(resp=>{
                        res.writeHead(201,{'Content-Type': 'text/html; charset=utf-8'})
                        res.write('Registo apagado')
                        res.end()
                    })
                    .catch(erro=>{
                        res.writeHead(511,{'Content-Type': 'text/html; charset=utf-8'})
                            res.write("Não foi possivel eliminar o aluno")
                            res.end()
                    })
                }
                
                // GET ? -> Lancar um erro
                else{
                    res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write("Método não suportado")
                    res.end()
                }
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if (req.url == '/alunos/registo'){
                    collectRequestBodyData(req,result => {
                        if(result){
                            console.log(result)
                            axios.post("http://localhost:3000/alunos/",result)
                                .then(resp=> {
                                    res.writeHead(201,{'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Registo inserido</p>")
                                    res.end()
                                })
                                .catch(erro=>{
                                    res.writeHead(510,{'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.errorPage("Não foi possivel editar"))
                                    res.end()
                                })
                        }
                        else{
                            res.writeHead(509,{'Content-Type': 'text/html; charset=utf-8'})
                            res.write("Método não suportado")
                            res.end()
                        }
                    })
                }
                
                // POST /alunos/edit/:id --------------------------------------------------------------------
                else if(/\alunos\/edit\/(A|PG)[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req,result => {
                        if(result){
                            console.log(result)
                            axios.put("http://localhost:3000/alunos/" + result.id,result)
                                .then(resp=> {
                                    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                                    res.write("<p>Registo alterado</p>")
                                    res.end()
                                })
                                .catch(erro=>{
                                    res.writeHead(507,{'Content-Type': 'text/html; charset=utf-8'})
                                    res.write(templates.errorPage("Não foi possivel editar"))
                                    res.end()
                                })
                        }
                        else{
                            res.writeHead(506,{'Content-Type': 'text/html; charset=utf-8'})
                            res.write("Método não suportado")
                            res.end()
                        }
                    })

                }
                
                // POST ? -> Lancar um erro
                else{
                    res.writeHead(501,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write("Método não suportado")
                    res.end()
                }

                break
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(500,{'Content-Type': 'text/html; charset=utf-8'})
                res.write("Método não suportado")
                res.end()
                break
        }
    }
})

alunosServer.listen(3050, ()=>{
    console.log("Servidor à escuta na porta 3050...")
})



