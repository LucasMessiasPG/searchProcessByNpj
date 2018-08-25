const AWS = require("./index");
const ENV = JSON.parse(process.env.ENV);
class SQS extends AWS {
    constructor() {
        super("sqs");
        this.SQS = new this._AWS.SQS();
    }

    static sendMessage(queue, id, body){
        let context = new SQS();
        return context.sendMessage(queue, id, body);
    }

    static watch(url, cb, done){
        let context = new SQS();
        process.env[url] = "watching";
        context.SQS.receiveMessage({
            QueueUrl: url,
            WaitTimeSeconds: 20
        }, cb); 
    }

    sendMessage(queue, id, body){
        if(!body) throw new Error("invalid body for sqs");
        if(typeof body != "string"){
            body = JSON.stringify(body);
        }

        return new Promise((resolve, reject) => {
            this.SQS.sendMessage({
                QueueUrl: ENV.aws.sqs.queue[queue],
                MessageBody: body,
                MessageDeduplicationId: id,
                MessageGroupId: "npj"
            }, (err, data) => {
                if(err) return reject(err);
                return resolve(data);
            }); 
        });
    }
}

module.exports = SQS;