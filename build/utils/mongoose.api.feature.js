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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseAPIFeature = void 0;
var base_api_feature_1 = require("../core/interfaces/base.api.feature");
// interface MongooseModel {
//   find(queryString?: string): this;
//   sort(queryString?: string): this;
//   // limitFields(fields: string[]): this;
//   skip(skipNum: number): this;
//   limit(limitNum: number): this;
// }
// export class MongooseAPIFeature<T extends MongooseModel> {
var MongooseAPIFeature = /** @class */ (function (_super) {
    __extends(MongooseAPIFeature, _super);
    function MongooseAPIFeature(inputModel, inputQueryString) {
        return _super.call(this, inputModel, inputQueryString) || this;
        // this.model = inputmodel;
        // this.queryString = inputQueryString;
    }
    MongooseAPIFeature.prototype.filter = function () {
        var queryObject = __assign({}, this.queryString);
        var excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach(function (excludedField) { return delete queryObject[excludedField]; });
        var queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(gte|gt|lte|le)\b/g, function (match) { return "$" + match; });
        this.model = this.model.find(JSON.parse(queryString));
        return this;
    };
    MongooseAPIFeature.prototype.sort = function () {
        if (this.queryString.sort) {
            var sortBy = this.queryString.sort.split(",").join(" ");
            this.model = this.model.sort(sortBy);
        }
        else {
            //defaults
            this.model = this.model.sort("-createdAt");
        }
        return this;
    };
    MongooseAPIFeature.prototype.limitFields = function () {
        if (this.queryString.fields) {
            var fields = this.queryString.fields.split(",").join(" ");
            this.model = this.model.select(fields);
        }
        else {
            this.model = this.model.select("-__v");
        }
        return this;
    };
    MongooseAPIFeature.prototype.paginate = function () {
        var page = this.queryString.page * 1 || 1;
        var limit = this.queryString.limit * 1 || 50;
        var skip = (page - 1) * limit;
        this.model = this.model.skip(skip).limit(limit);
        return this;
    };
    return MongooseAPIFeature;
}(base_api_feature_1.APIFeature));
exports.MongooseAPIFeature = MongooseAPIFeature;
