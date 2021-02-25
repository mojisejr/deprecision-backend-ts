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
var crypto_1 = __importDefault(require("crypto"));
var catchAsyncError_1 = require("../../core/catchAsyncError");
var types_1 = __importDefault(require("../../core/container/types"));
var app_error_1 = require("../../error/app.error");
var AuthController = /** @class */ (function () {
    function AuthController(userRepository, emailSender) {
        var _this = this;
        this.signUp = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userDataFromReq, createdUser;
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
                        this.createAndSendToken(createdUser, 201, res);
                        return [2 /*return*/];
                }
            });
        }); });
        this.signIn = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, signedInUser, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!email || !password) {
                            return [2 /*return*/, next(app_error_1.APPError.create("please provide valid email and password", 400))];
                        }
                        return [4 /*yield*/, this.userRepository.getPasswordByEmail(email)];
                    case 1:
                        signedInUser = _c.sent();
                        _b = !signedInUser;
                        if (_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepository.isCorrectPassword(password, signedInUser.password)];
                    case 2:
                        _b = !(_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_b) {
                            return [2 /*return*/, next(app_error_1.APPError.create("Incorrect email or password", 401))];
                        }
                        this.createAndSendToken(signedInUser, 200, res);
                        return [2 /*return*/];
                }
            });
        }); });
        this.signOut = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // res.cookie("jwt", "logged out", {
                //   expires: new Date(Date.now() + 10 * 1000),
                //   httpOnly: true,
                //   sameSite: "none",
                // });
                res.status(200).json({
                    status: "success",
                });
                return [2 /*return*/];
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
                        // else if (req.cookies.jwt) {
                        //   inputJwtToken = req.cookies.jwt;
                        // }
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
                        res.locals.user = user;
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
        // not yet needed
        this.forgotPassword = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user, resetToken, resetURL, message, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findUser({
                            email: req.body.email,
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next(app_error_1.APPError.create("There is no user with email address", 404))];
                        }
                        return [4 /*yield*/, this.userRepository.createPasswordResetToken(user._id)];
                    case 2:
                        resetToken = _a.sent();
                        resetURL = req.protocol + "://" + req.get("host") + "/api/v1/users/resetPassword/" + resetToken;
                        message = "Forget your password? submit a PATCH request with your new password\n      and passwordConfirm to: " + resetURL + ". \n\n      If you didn't forget your password please ignore this email!";
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.emailSender.sendEmail({
                                email: user.email,
                                subject: "your password reset token available only 10 min",
                                message: message,
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        user.password;
                        user.passwordResetToken = undefined;
                        user.passwordResetExpires = undefined;
                        this.userRepository.save(user, false);
                        return [2 /*return*/, next(app_error_1.APPError.create("there was an error sending an email, try again", 500))];
                    case 6:
                        res.status(200).json({
                            status: "success",
                            message: "token sent to email!",
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this.resetPassword = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var passwordResetToken, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        passwordResetToken = crypto_1.default
                            .createHash("sha256")
                            .update(req.params.token)
                            .digest("hex");
                        return [4 /*yield*/, this.userRepository.findUser({
                                passwordResetToken: passwordResetToken,
                                passwordResetExpires: { $gt: Date.now() },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next(app_error_1.APPError.create("token are invalid or expired", 400))];
                        }
                        user.password = req.body.password;
                        user.passwordConfirm = req.body.passwordConfirm;
                        user.passwordResetToken = undefined;
                        user.passwordResetExpires = undefined;
                        this.userRepository.save(user, false);
                        this.createAndSendToken(user, 200, res);
                        return [2 /*return*/];
                }
            });
        }); });
        this.updatePassword = catchAsyncError_1.catchAsyncError(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var oldPassword, newPassword, passwordConfirm, currentUser, isPasswordCorrect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldPassword = req.body.oldPassword;
                        newPassword = req.body.newPassword;
                        passwordConfirm = req.body.passwordConfirm;
                        return [4 /*yield*/, this.userRepository.getPasswordByEmail(req.user.email)];
                    case 1:
                        currentUser = _a.sent();
                        if (!currentUser) {
                            return [2 /*return*/, next(app_error_1.APPError.create("you are not logged in, try again", 401))];
                        }
                        return [4 /*yield*/, this.userRepository.isCorrectPassword(oldPassword, currentUser.password)];
                    case 2:
                        isPasswordCorrect = _a.sent();
                        if (!isPasswordCorrect) {
                            return [2 /*return*/, next(app_error_1.APPError.create("incorrect password for this user", 401))];
                        }
                        //3 then update the password
                        currentUser.password = newPassword;
                        currentUser.passwordConfirm = passwordConfirm;
                        return [4 /*yield*/, this.userRepository.save(currentUser)];
                    case 3:
                        _a.sent();
                        //4 log the user in (send back the token)
                        this.createAndSendToken(currentUser, 201, res);
                        return [2 /*return*/];
                }
            });
        }); });
        this.userRepository = userRepository;
        this.emailSender = emailSender;
    }
    AuthController.prototype.signToken = function (id) {
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
    AuthController.prototype.createAndSendToken = function (user, statusCode, res) {
        var token = this.signToken(user._id);
        //set the jwt to the cookie
        //do not expose password to user via response
        // res.cookie("jwt", token, {
        //   expires: new Date(
        //     Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        //   ),
        //   //หมายถึงต้องใช้กับ https เท่านั้น
        //   secure: process.env.NODE_ENV === "production" ? true : false,
        //   //ป้องกัน cross site scipting คือจะแก้ cookie กันนี้ไม่ได้เป็น readonly
        //   httpOnly: false,
        //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        // });
        user.password = undefined;
        res.status(statusCode).json({
            status: "success",
            token: token,
            data: {
                user: user,
            },
        });
    };
    AuthController = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.AuthRepository)),
        __param(1, inversify_1.inject(types_1.default.EmailSender)),
        __metadata("design:paramtypes", [Object, Object])
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
