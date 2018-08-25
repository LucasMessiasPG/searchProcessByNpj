process.env.ENV = JSON.stringify({
    port: process.env.PORT || 8081,
    mode: process.env.MODE || "development",
    path_mongodb: process.env.PATH_MONGODB || "mongodb://localhost:27017/dev"
});