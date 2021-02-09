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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
var base_controller_class_1 = require("../../../core/interfaces/base.controller.class");
var inversify_1 = require("inversify");
var types_1 = __importDefault(require("../../../core/container/types"));
var tags_1 = __importDefault(require("../../../core/container/tags"));
var ProductController = /** @class */ (function (_super) {
    __extends(ProductController, _super);
    function ProductController(productRepository) {
        return _super.call(this, productRepository) || this;
    }
    ProductController = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.Repository)),
        __param(0, inversify_1.named(tags_1.default.ProductRepository)),
        __metadata("design:paramtypes", [Object])
    ], ProductController);
    return ProductController;
}(base_controller_class_1.BaseController));
exports.ProductController = ProductController;
