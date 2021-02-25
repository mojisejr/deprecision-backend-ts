import { Router } from "express";
import * as views from "./../views/view.controller";
import { authController } from "./../core/container/container";

const router = Router();

//VIEW ROUTEs
router.get("/", views.getLoginPage);
router.get("/home", authController.protect, views.getHomePage);
router.get("/info", views.getInfoPage);
router.get("/product", views.getProductPage);

export default router;
