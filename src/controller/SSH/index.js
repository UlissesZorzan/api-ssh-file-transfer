/*Desenvolvedor: Ulisses Zorzan
Linkdin: www.linkedin.com/in/ulisses-zorzan
Data: 12/02/2021
*/
const fs = require ('fs');
const path = require ('path');
const { NodeSSH } = require ('node-ssh');
const dirRemote =  "/home/debian/" //Diretório remoto Inicial
var connected = false; //Estado da conexão
var ssh = new NodeSSH ();

//Realiza conexão SSH
function connectSSH(host, user, password){
    ssh = new NodeSSH ();
    ssh.connect({
        host: host,
        username: user,
        password: password
    }).then(() => {
        connected = true;
        console.log("[SSH] => CONNECTED");                
    }, (error)=>{
        connected = false;
        console.log("[SSH] => ERROR CONNECT");
        console.log(error)
    })
}

//Verifica se abriu conexão SSH
function checkConnect(){
    if(connected){        
        return true;
    }
    else{        
        return false;
    }
}

//Recebe arquivo através do SSH
function getFileSSH(file, req, res){
    var fileRemote = ""; //arquivo remoto    

    //Verifica se esta conectado
    if(!connected){
        console.log("[SSH]=> Failed to receive file (NOT CONNECTION)");
        res.send({status: 'ERROR'});
        return;
    }            
    
    //converter para o diretorio correspondente do host
    if(file.trim() == "" || file == undefined){
        console.log("[SSH]=> Failed to receive file");
        res.send({status: 'ERROR'});
        return;
    }   
    
    //Recebe o arquivo do Host
    ssh.getFile(__dirname + '/tmp/'+file+'.txt', dirRemote+fileRemote).then(function(Contents) {
        console.log("[SSH]=> File Received Successfully");
        //Le o arquivo recebido e retorna como resposta
        fs.readFile(__dirname + '/tmp/'+file+'.txt', (err, data) => {
            if (err){
                console.log('[FS]=> Failed to read file '+ file+".txt");
                res.send({status: 'ERROR'});
                return;
            }
            //converte Buffer => String utf8
            let x = Buffer.from(data);
            x = x.toString('utf8');                
            res.send({status: 'Successfully',file: x});           
            });
    }, (error) => {
    console.log("[SSH]=> Failed to receive file");
    console.log(error);
    res.send({status: 'ERROR'});
    })
    
}

//Força comando no terminal através do SSH
function command(command, req, res){
    //Verifica se esta conectado
    if(!connected){
        console.log("[SSH]=> Failed to restart SO (NOT CONNECTION)");
        res.send({status: 'ERROR'});
        return;
    }
    //Executa comando no SO
    ssh.execCommand(command, { cwd: dirRemote }).then(function(result) {
        res.send({status:'Successfully'})
        console.log('STDOUT: ' + result.stdout)
        console.log('STDERR: ' + result.stderr)
      })

}

module.exports = {connectSSH, getFileSSH, checkConnect, command}