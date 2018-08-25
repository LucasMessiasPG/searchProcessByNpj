const ProcessModel = require("../schema/process");

class Teste{
    async teste2(req, res, next){
        let result = await ProcessModel.find();
        console.log(result);
        return res.json({msg:"teste2",result});
    }
}

module.exports = Teste;