var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tp', (req, res) => {
  var d = new Date().toISOString().substring(0,16)
  axios.post('${graphDbEndpoint}?${queryString}', null, {headers})
    .then(response => {
      var lista = response.data.results.bindings
      var elementos = []
      lista.forEach(element => {
        elementos.push({'na': element.na.value, 'nome': element.nome.value})
      })
      res.render('tp', {lista: elementos, data: d})
    })
    .catch(erro => {
      // res.render('error', )
    })
});

module.exports = router;
