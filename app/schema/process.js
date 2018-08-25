// base requires
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// name collection
const NAME = "process";

// schema collection
const SCHEMA = {
    npj: String
};

// exports
const _schema = new Schema(SCHEMA); // create schema of mongoose
const _model = mongoose.model(NAME, _schema); // create model of mongoose
module.exports.schema = _schema;
module.exports.model = _model;
module.exports = _model;