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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var inversify_1 = require("inversify");
var tags_1 = __importDefault(require("../../../core/container/tags"));
var types_1 = __importDefault(require("../../../core/container/types"));
var app_error_1 = require("../../../error/app.error");
var catchAsyncError_1 = require("./../../../core/catchAsyncError");
var base_controller_class_1 = require("../../../core/interfaces/base.controller.class");
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController(repository) {
        var _this = _super.call(this, repository) || this;
        _this.create = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                next(app_error_1.APPError.create("no implementation", 500));
                return [2 /*return*/];
            });
        }); });
        _this.getAll = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.getAll()];
                    case 1:
                        users = _a.sent();
                        res.status(200).json({
                            status: "success",
                            data: {
                                users: users,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        _this.getById = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, this.userRepository.getById(id)];
                    case 1:
                        user = _a.sent();
                        res.status(200).json({
                            status: "success",
                            data: {
                                user: user,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        _this.update = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, this.userRepository.update(id, req.body)];
                    case 1:
                        updatedProduct = _a.sent();
                        if (!updatedProduct) {
                            return [2 /*return*/, next(app_error_1.APPError.create("no user found for update with id " + id, 404))];
                        }
                        res.status(204).json({
                            status: "success",
                            message: "product with " + id + " updated successfully",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        _this.updateMe = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var updateData, updatedUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateData = {
                            name: req.body.name,
                        };
                        return [4 /*yield*/, this.userRepository.update(req.user._id, updateData)];
                    case 1:
                        updatedUser = _a.sent();
                        if (!updatedUser) {
                            next(app_error_1.APPError.create("cannot update the user data", 400));
                        }
                        res.status(204).json({
                            status: "success",
                            message: "data has been updated",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        _this.deleteMe = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // console.log(req.user);
                    return [4 /*yield*/, this.userRepository.delete(req.user._id)];
                    case 1:
                        // console.log(req.user);
                        _a.sent();
                        res.status(204).json({
                            status: "success",
                            data: "null",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        _this.userRepository = repository;
        return _this;
    }
    UserController = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.Repository)),
        __param(0, inversify_1.named(tags_1.default.UserRepository)),
        __metadata("design:paramtypes", [Object])
    ], UserController);
    return UserController;
}(base_controller_class_1.BaseController));
exports.UserController = UserController;
