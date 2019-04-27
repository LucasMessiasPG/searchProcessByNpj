// base requires
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// name collection
const NAME = "process";

// schema collection
const SCHEMA = {
    status: String,
    npj: String,
    npjUnformatted: String,
    themis: String,
    themisUnformatted: String,
    legalScrect: Boolean,
    location: {
        city: String,
        state: String,
        place: String
    },
    proposedDate: String,
    situationDescription: String,
    situation: String,
    volume: String,
    amointSheets: String,
    parties: {
        author: {
            name: String,
            adv: {
                name: String,
                oab: String
            }
        },
        defendant: {
            name: String,
            adv: {
                name: String,
                oab: String
            }
        }
    },
    history: [{
        date: String,
        description: String
    }],
    raw: Schema.Types.Mixed 
};

// exports
const _schema = new Schema(SCHEMA); // create schema of mongoose
const _model = mongoose.model(NAME, _schema); // create model of mongoose
module.exports.schema = _schema;
module.exports.model = _model;
module.exports = _model;