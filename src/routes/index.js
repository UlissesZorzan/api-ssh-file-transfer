/*Desenvolvedor: Ulisses Zorzan
Linkdin: www.linkedin.com/in/ulisses-zorzan
Data: 12/02/2021
*/
const ssh = require('./ssh');
const express = require('express');
const router = express.Router();

//Rotas
router.post('/connect', ssh.connect);
router.get('/checkconnect', ssh.checkConnect);
router.post('/receivefile', ssh.receiveFile);
router.post('/commandso', ssh.commandSO);

module.exports = app => app.use('/gw', router);