/*Desenvolvedor: Ulisses Zorzan
Linkdin: www.linkedin.com/in/ulisses-zorzan
Data: 12/02/2021
*/
const ssh = require('../controller/SSH/index');

module.exports = {
    //Conexão SSH
    async connect(req,res){
        try {            
            const {host, user, password} = req.body;
            console.log("[CONNECT]=> HOST:"+host+" USER:"+user+" PASSWORD:"+password);
            ssh.connectSSH(host, user, password)
            res.send({status: "Successful"})
        } catch (error) {
            res.send({status: "ERROR"});
            console.log("[CONNECT]=> ERROR");
            console.log(error);
        }   
    },

    async checkConnect(req, res){
        try {
            if(ssh.checkConnect()){
                res.send({status: "connected"});
            }
            else{
                res.send({status: "desconnected"});
            }
            
        } catch (error) {
            res.send({status: "ERROR"});
            console.log("[CHECK CONNECT]=> ERROR");
            console.log(error);
        }
    },

    async receiveFile(req, res){
        try {
            const {file} = req.body;            
            ssh.getFileSSH(file, req, res);
            //res.send({status: "Successful"});
        } catch (error) {
            res.send({status: "ERROR"});
            console.log("[RECEIVE FILE]=> ERROR");
            console.log(error);
        }
    },

    async commandSO(req, res){
        try {
            const {command} = req.body;
            ssh.command(command, req, res)
        } catch (error) {
            res.send({status: "ERROR"});
            console.log("[COMMAND SO]=> ERROR");
            console.log(error);
        }
    }



}