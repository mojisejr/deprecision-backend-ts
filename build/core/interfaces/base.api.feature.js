"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFeature = void 0;
var APIFeature = /** @class */ (function () {
    function APIFeature(inputmodel, inputQueryString) {
        this.model = inputmodel;
        this.queryString = inputQueryString;
    }
    Object.defineProperty(APIFeature.prototype, "query", {
        get: function () {
            return this.model;
        },
        enumerable: false,
        configurable: true
    });
    return APIFeature;
}());
exports.APIFeature = APIFeature;
