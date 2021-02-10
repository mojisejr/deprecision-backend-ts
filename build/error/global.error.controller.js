"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorController = void 0;
var devErrorSender = function (err, res) {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
var prodErrorSender = function (err, res) {
    if (err.isOperational) {
        //Operation error (App Error)
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        //Operation error (App Error)
        console.log("Error \uD83D\uDCA3 ", err);
        res.status(500).json({
            status: "error",
            message: "Somthing went very wrong.",
        });
    }
};
exports.globalErrorController = function (error, req, res, next) {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    if (process.env.NODE_ENV === "development") {
        devErrorSender(error, res);
    }
    else if (process.env.NODE_ENV === "production") {
        prodErrorSender(error, res);
    }
};
