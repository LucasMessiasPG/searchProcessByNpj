const path = require("path");
const fs = require("fs");
const controller = {};

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
    controller.Process.processFiles();
    app.get("/api/process-files", controller.Process.processFiles);
    app.get("/api/process", controller.Process.get);
    app.post("/api/update", controller.Process.update);
    return app;
}

module.exports = routes;