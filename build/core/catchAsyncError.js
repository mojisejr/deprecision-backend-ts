"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncError = void 0;
var catchAsyncError = function (asyncFunctionInput) {
    return function (req, res, next) {
        asyncFunctionInput(req, res, next).catch(function (error) {
            console.log("error", error);
            return next(error);
        });
    };
};
exports.catchAsyncError = catchAsyncError;
