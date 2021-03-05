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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var views = __importStar(require("./../views/view.controller"));
var container_1 = require("./../core/container/container");
var router = express_1.Router();
//VIEW ROUTEs
router.get("/", views.getLoginPage);
router.get("/home", container_1.authController.protect, views.getHomePage);
router.get("/info", container_1.authController.protect, views.getInfoPage);
router.get("/newProduct", container_1.authController.protect, views.getNewProductPage);
router.get("/products/:id", container_1.authController.protect, views.getProductPage);
exports.default = router;
