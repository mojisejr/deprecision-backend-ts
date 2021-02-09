"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var container_1 = require("./../core/container/container");
var router = express_1.Router();
router.post("/signup", container_1.authController.signUp);
router.post("/login", container_1.authController.signIn);
router.get("/logout", container_1.authController.signOut);
router.post("/forgotpassword", container_1.authController.forgotPassword);
router.patch("/resetpassword/:token", container_1.authController.resetPassword);
router.patch("/updatepassword", container_1.authController.protect, container_1.authController.updatePassword);
router.patch("/updateme", container_1.authController.protect, container_1.userController.updateMe);
router.delete("/deleteme", container_1.authController.protect, container_1.userController.deleteMe);
router.route("/").get(container_1.userController.getAll);
router
    .route("/:id")
    .get(container_1.userController.getById)
    .patch(container_1.authController.protect, container_1.userController.update);
exports.default = router;
