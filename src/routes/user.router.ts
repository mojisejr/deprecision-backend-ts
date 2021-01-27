import { Router } from "express";
import { userController, authController } from "./../core/container/container";

const router = Router();
router.post("/signup", authController.signUp);
router.post("/login", authController.signIn);

router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);

router.route("/").get(userController.getAll);

router
  .route("/:id")
  .get(userController.getById)
  .patch(authController.protect, userController.update);

export default router;
