/*Desenvolvedor: Ulisses Zorzan
Linkdin: www.linkedin.com/in/ulisses-zorzan
Data: 12/02/2021
*/

const express = require('express'); //Manipulador de rotas
var cors = require('cors');  //Para poder ter acesso as rotas ao publicar
const bodyParser = require('body-parser'); //Cabeçalho de requisições http
const app = express(); 

//Implementação do bodyParser no express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors());

//Rotas http
require('./routes/index.js')(app);

//Inicia Servidor Express
const server = app.listen(process.env.PORT || 4643, '0.0.0.0',
  () => console.log("[EXPRESS]:Server Express is running ..."));

  module.exports = app;