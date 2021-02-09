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
exports.AuthRepository = void 0;
var user_repository_1 = require("../../domain/users/repository/user.repository");
var user_model_1 = require("./../../domain/users/model/user.model");
var crypto_1 = __importDefault(require("crypto"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var AuthRepository = /** @class */ (function (_super) {
    __extends(AuthRepository, _super);
    function AuthRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createPasswordResetToken = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var resetToken, passwordResetToken, passwordResetExpires;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resetToken = crypto_1.default.randomBytes(32).toString("hex");
                        passwordResetToken = crypto_1.default
                            .createHash("sha256")
                            .update(resetToken)
                            .digest("hex");
                        passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
                        return [4 /*yield*/, this.update(id, {
                                passwordResetToken: passwordResetToken,
                                passwordResetExpires: passwordResetExpires,
                            })];
                    case 1:
                        _a.sent();
                        // console.log({ resetToken }, passwordResetToken);
                        //3. return un encrypted password
                        return [2 /*return*/, resetToken];
                }
            });
        }); };
        return _this;
    }
    AuthRepository.prototype.getPasswordByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.userModel.findOne({ email: email }).select("+password")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthRepository.prototype.findUser = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.userModel.findOne(option)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthRepository.prototype.isCorrectPassword = function (inputPassword, dbPassword) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!inputPassword || !dbPassword || dbPassword === "") {
                            throw new Error("isCorrectPassword, input password or db password is undefined");
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(inputPassword, dbPassword)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthRepository.prototype.isPasswordChangedAfterIssued = function (passwordChangedAt, jwtTime) {
        if (passwordChangedAt) {
            var pwdChangedTimeStamp = passwordChangedAt.getTime() / 1000;
            //if pwd changed after jwt issued the jwt timestamp will less than pwd timestamp
            return +jwtTime < pwdChangedTimeStamp;
        }
        return false;
    };
    return AuthRepository;
}(user_repository_1.UserRepository));
exports.AuthRepository = AuthRepository;
