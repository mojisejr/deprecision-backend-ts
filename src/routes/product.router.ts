import { Router } from "express";
import {
  productController,
  authController,
} from "./../core/container/container";

const router = Router();

router
  .route("/")
  .get(productController.getAll)
  .post(authController.protect, productController.create);

router
  .route("/:id")
  .get(productController.getById)
  .patch(authController.protect, productController.update)
  .delete(authController.protect, productController.delete);

export default router;
