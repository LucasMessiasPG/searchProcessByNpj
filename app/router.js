const path = require("path");
const fs = require("fs");
const controller = {};
const GET = "get";
const POST = "post";
const PUT = "put";
const PATCH = "patch";
const DELETE = "delete";

// ger controllers
const files = fs.readdirSync(path.resolve(__dirname+"/controllers"));
for(let file of files){
    const name = file.split(".")[0];
    let Controller = require(path.resolve(__dirname+"/controllers/"+file));
    // dynamic instance controller
    controller[name] = new Controller();
}

// list routes
function routes(app){
    app.get("/", controller.Teste.teste2);
    return app;
}

module.exports = routes;