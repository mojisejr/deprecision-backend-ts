import { Router } from "express";
import * as views from "./../views/view.controller";
import { authController } from "./../core/container/container";

const router = Router();

//VIEW ROUTEs
router.get("/", views.getLoginPage);
router.get("/home", authController.protect, views.getHomePage);
router.get("/info", authController.protect, views.getInfoPage);
router.get("/newProduct", authController.protect, views.getNewProductPage);
router.get("/products/:id", authController.protect, views.getProductPage);

export default router;
