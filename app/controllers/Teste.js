const ProcessModel = require("../schema/process");
const SQS = require("../libraries/aws/sqs");
const ENV = JSON.parse(process.env.ENV);

class Teste{
    async teste2(req, res, next){
        try {
            let result = await SQS.sendMessage("npj", "teste", { teste: 1} , 1);
            console.log(result);
            return res.json({msg:"teste2",});
        } catch (error) {
            console.log(error,error.stack);
            return res.json({message: "error"});
        }
    }

    static handleSqs(err, data){
        console.log(err, data);
    }
}

SQS.watch(ENV.aws.sqs.queue.npj, Teste.handleSqs);

module.exports = Teste;