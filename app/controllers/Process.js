const ProcessModel = require("../schema/process");
const SQS = require("../libraries/aws/sqs");
const ENV = JSON.parse(process.env.ENV);
const fs = require("fs");
const path = require("path");

class Process{

	async processFiles(req, res = false, next){
		try {
			const pathFiles = path.resolve(__dirname+"../../../files");
			const folderDistName = new Date().getTime();
			const pathDistFiles = path.resolve(__dirname+"../../../files/processed/"+folderDistName);
			const files = fs.readdirSync(pathFiles)
			console.log(pathDistFiles);
			if (fs.existsSync(pathDistFiles) == false) {
				fs.mkdirSync(pathDistFiles);
			}
			const distFiles = fs.readdirSync(pathDistFiles)

			for(let file of files){
				if(file == "processed") continue;
				if(distFiles.indexOf(file) != -1){
					fs.unlinkSync(pathFiles+"/"+file);
					continue;
				}
				console.log(file);
				let content = await new Promise(resolve => {
					fs.readFile(pathFiles+"/"+file, (err, data) => {
						if(err) throw err;
						resolve(data.toString());
					})
				});
				content = content.split("\r\n");
				for(let cnj of content){
					if(!cnj) continue;
					let cnjUnformatted = cnj.match(/\d/g).join("");
					let process = await ProcessModel.findOne({ cnjUnformatted })
					if(process) continue;
					process = new ProcessModel();
					process.cnj = cnj;
					process.status = "pending"
					await process.save();
				}

				if (fs.existsSync(pathDistFiles+"/"+file) == false) {
					fs.copyFileSync(pathFiles+"/"+file, pathDistFiles+"/"+file);
				}
				fs.unlinkSync(pathFiles+"/"+file);
			}
			return res && res.send("all processed") || "ok";
		} catch (error) {
			console.log(error);
			return res && res.send("error") || error;
		}
	}

	async get(req, res, next){
		try {
			var sort = req.query.sort || "+";
			var skip = req.query.skip || 0;
			let result = await ProcessModel.find({ status: "pending" }).sort(sort+"_id").skip(+skip).limit(10);
            return res.json({msg:"ok", result});
        } catch (error) {
            console.log(error,error.stack);
            return res.json({message: "error"});
        }
	}

    async update(req, res, next){
		let body = req.body;
		let process;

		if(body._id){
			process = await ProcessModel.findOne({ _id: body._id });
		}

		if(!process){
			process = new ProcessModel(body);
		}

        try {
			process.cnjUnformatted = process.cnj.match(/\d/g).join("");
			process.themisUnformatted = process.themis.match(/\d/g).join("");
			process.status = "ok";
			await process.save();
            return res.json({msg:"ok",});
        } catch (error) {
			process.status = "error";
			await process.save();
            console.log(error,error.stack);
            return res.json({message: "error"});
        }
    }
}

module.exports = Process;