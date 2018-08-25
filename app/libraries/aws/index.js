const AWS_SDK = require("aws-sdk");
const ENV = JSON.parse(process.env.ENV);

class AWS {
    constructor(intance){
        AWS_SDK.config.update({
            region:             ENV.aws[intance].region,
            accessKeyId:        ENV.aws.user.key,
            secretAccessKey:    ENV.aws.user.secret
        });
        this._AWS = AWS_SDK;
    }


}

module.exports = AWS;