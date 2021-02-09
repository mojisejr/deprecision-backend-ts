"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TYPES = {
    Repository: Symbol.for("Repository"),
    ProductController: Symbol.for("IProductController"),
    UserController: Symbol.for("IUserController"),
    AuthRepository: Symbol.for("IAuthRepository"),
    AuthController: Symbol.for("IAuthController"),
    EmailSender: Symbol.for("IEmailSender"),
};
exports.default = TYPES;
