"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.AuthController = void 0;
var inversify_1 = require("inversify");
var jwt = __importStar(require("jsonwebtoken"));
var catchAsyncError_1 = require("../core/catchAsyncError");
var types_1 = __importDefault(require("../core/container/types"));
var app_error_1 = require("../error/app.error");
var AuthController = /** @class */ (function () {
    function AuthController(userRepository) {
        var _this = this;
        this.signUp = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDataFromReq, createdUser, jwtToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userDataFromReq = {
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            passwordConfirm: req.body.passwordConfirm,
                            role: req.body.role,
                        };
                        return [4 /*yield*/, this.userRepository.create(userDataFromReq)];
                    case 1:
                        createdUser = _a.sent();
                        if (!createdUser._id)
                            return [2 /*return*/, next(app_error_1.APPError.create("somthing wrong with your data fetching", 500))];
                        jwtToken = this.signToken(createdUser._id);
                        res.status(200).json({
                            status: "success",
                            token: jwtToken,
                            data: {
                                user: createdUser,
                            },
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this.signIn = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, signedInUser, jwtToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!email || !password) {
                            return [2 /*return*/, next(app_error_1.APPError.create("please provide valid email and password", 400))];
                        }
                        return [4 /*yield*/, this.userRepository.getPasswordByEmail(email)];
                    case 1:
                        signedInUser = _b.sent();
                        if (!signedInUser ||
                            !this.userRepository.isCorrectPassword(password, signedInUser.password)) {
                            return [2 /*return*/, next(app_error_1.APPError.create("Incorrect email or password", 401))];
                        }
                        jwtToken = this.signToken(signedInUser._id);
                        res.status(200).json({
                            status: "success",
                            token: jwtToken,
                            message: "authenticated",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this.protect = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var inputJwtToken, decodedData, user, passwordChanged;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.headers.authorization &&
                            req.headers.authorization.startsWith("Bearer")) {
                            inputJwtToken = req.headers.authorization.split(" ")[1];
                        }
                        if (!inputJwtToken) {
                            return [2 /*return*/, next(app_error_1.APPError.create("You are not logged in", 401))];
                        }
                        return [4 /*yield*/, this.jwtTokenVerification(inputJwtToken, process.env.JWT_SECRET)];
                    case 1:
                        decodedData = _a.sent();
                        return [4 /*yield*/, this.userRepository.getById(decodedData.id)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next(app_error_1.APPError.create("the user is no longer exist.", 401))];
                        }
                        passwordChanged = this.userRepository.isPasswordChangedAfterIssued(user.passwordChangedAt, decodedData.iat);
                        if (passwordChanged) {
                            return [2 /*return*/, next(app_error_1.APPError.create("password was changed please re-login again.", 401))];
                        }
                        req.user = user;
                        next();
                        return [2 /*return*/];
                }
            });
        }); });
        this.restrictTo = function (roles) {
            return function (req, res, next) {
                //roles is an array
                if (!roles.includes(req.user.role)) {
                    return next(app_error_1.APPError.create("permission denined, your cannot perform this action. ", 403));
                }
                next();
            };
        };
        this.forgotPassword = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user, resetToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.getByEmail(req.body.email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next(app_error_1.APPError.create("There is no user with email address", 404))];
                        }
                        resetToken = this.userRepository.createPasswordResetToken(user._id);
                        return [2 /*return*/];
                }
            });
        }); });
        this.userRepository = userRepository;
    }
    AuthController.prototype.signToken = function (id) {
        //TODO: เดี๋ยวต้องใช้ dotenv มากำหนด
        return jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    };
    AuthController.prototype.jwtTokenVerification = function (inputToken, secret) {
        return new Promise(function (resolve, rejects) {
            if (!inputToken || !secret) {
                rejects(new Error("input token or secret is undefined"));
            }
            var decoded = jwt.verify(inputToken, secret);
            resolve(decoded);
        });
    };
    AuthController = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.AuthRepository)),
        __metadata("design:paramtypes", [Object])
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
