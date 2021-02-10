"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncError = void 0;
exports.catchAsyncError = function (asyncFunctionInput) {
    return function (req, res, next) {
        asyncFunctionInput(req, res, next).catch(function (error) {
            console.log("error", error);
            return next(error);
        });
    };
};
