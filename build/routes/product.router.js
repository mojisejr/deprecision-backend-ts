"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var container_1 = require("./../core/container/container");
var router = express_1.Router();
router
    .route("/")
    .get(container_1.productController.getAll)
    .post(container_1.authController.protect, container_1.productController.create);
router
    .route("/:id")
    .get(container_1.productController.getById)
    .patch(container_1.authController.protect, container_1.productController.update)
    .delete(container_1.authController.protect, container_1.productController.delete);
exports.default = router;
