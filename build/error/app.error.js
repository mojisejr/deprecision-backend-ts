"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.APPError = void 0;
var APPError = /** @class */ (function (_super) {
    __extends(APPError, _super);
    function APPError(message, statusCode) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.statusCode = statusCode;
        _this.status = ("" + statusCode).startsWith("4") ? "fail" : "error";
        _this.isOperational = true;
        return _this;
    }
    APPError.create = function (message, statusCode) {
        if (!message || !statusCode) {
            throw new Error("please define all value for App error class");
        }
        return new APPError(message, statusCode);
    };
    return APPError;
}(Error));
exports.APPError = APPError;
