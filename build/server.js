"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "src/config.env",
});
require("reflect-metadata");
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = __importDefault(require("./app"));
var Database = process.env.PRODUCTION_DATABASE;
if (process.env.NODE_ENV === "development") {
    Database = process.env.DATABASE_LOCAL;
}
mongoose_1.default.connect(Database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}, function () {
    console.log("mongoose connected on " + process.env.NODE_ENV + " database");
});
var port = process.env.PORT || 3000;
app_1.default.listen(port, function () {
    console.log("server connecting on port " + port);
});
