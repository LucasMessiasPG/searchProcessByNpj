process.env.ENV = JSON.stringify({
    port: process.env.PORT || 8081,
    mode: process.env.MODE || "development",
    path_mongodb: process.env.PATH_MONGODB || "mongodb://localhost:27017/dev",
    aws: {
        user: {
            key: "aws-key",
            secret: "aws-secret"
        },
        sqs: {
            region: "region",
            queue: {
                npj: "url"
            }
        }
    }
});