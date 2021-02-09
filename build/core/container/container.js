"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.userController = exports.productController = void 0;
var inversify_1 = require("inversify");
var types_1 = __importDefault(require("./types"));
var tags_1 = __importDefault(require("./tags"));
var product_controller_1 = require("./../../domain/products/controller/product.controller");
var product_repository_1 = require("./../../domain/products/repository/product.repository");
var user_repository_1 = require("../../domain/users/repository/user.repository");
var user_controller_1 = require("../../domain/users/controller/user.controller");
var auth_repository_1 = require("../../authentication/repository/auth.repository");
var auth_controller_1 = require("../../authentication/controller/auth.controller");
var emailsender_1 = require("../../services/emailsender");
var container = new inversify_1.Container();
//emailSender binding
container
    .bind(types_1.default.EmailSender)
    .to(emailsender_1.EmailSender)
    .inSingletonScope();
//repository binding
container
    .bind(types_1.default.Repository)
    .to(product_repository_1.ProductRepository)
    .whenTargetNamed(tags_1.default.ProductRepository);
container
    .bind(types_1.default.Repository)
    .to(user_repository_1.UserRepository)
    .whenTargetNamed(tags_1.default.UserRepository);
container.bind(types_1.default.AuthRepository).to(auth_repository_1.AuthRepository);
//controller binding
container
    .bind(types_1.default.ProductController)
    .to(product_controller_1.ProductController);
container.bind(types_1.default.UserController).to(user_controller_1.UserController);
container.bind(types_1.default.AuthController).to(auth_controller_1.AuthController);
//controller interface binding
var productController = container.get(types_1.default.ProductController);
exports.productController = productController;
var userController = container.get(types_1.default.UserController);
exports.userController = userController;
var authController = container.get(types_1.default.AuthController);
exports.authController = authController;
