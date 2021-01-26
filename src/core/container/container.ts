import { Container } from "inversify";
import TYPES from "./types";
import TAGS from "./tags";
import { Repository } from "./../interfaces/base.repository";
import { IProduct } from "./../../domain/products/model/product.interface";
import { ProductController } from "./../../domain/products/controller/product.controller";
import { ProductRepository } from "./../../domain/products/repository/product.repository";
import { ProductDTO } from "../../domain/products/dto/product.dto";
import { UserRepository } from "../../domain/users/repository/user.repository";
import { IUser } from "../../domain/users/model/user.interface";
import { UserDTO } from "../../domain/users/dto/user.dto";
import { IProductController } from "../../domain/products/controller/product.controller.interface";
import { IUserController } from "../../domain/users/controller/user.controller.interface";
import { UserController } from "../../domain/users/controller/user.controller";
import { AuthRepository } from "../../authentication/repository/auth.repository.interface";
import { IAuthController } from "../../authentication/controller/auth.controller.interface";
import { AuthController } from "../../authentication/controller/auth.controller";

const container = new Container();

container
  .bind<Repository<IProduct, ProductDTO>>(TYPES.Repository)
  .to(ProductRepository)
  .whenTargetNamed(TAGS.ProductRepository);
container
  .bind<Repository<IUser, UserDTO>>(TYPES.Repository)
  .to(UserRepository)
  .whenTargetNamed(TAGS.UserRepository);
container.bind<AuthRepository>(TYPES.AuthRepository).to(UserRepository);
container
  .bind<IProductController>(TYPES.ProductController)
  .to(ProductController);
container.bind<IUserController>(TYPES.UserController).to(UserController);
container.bind<IAuthController>(TYPES.AuthController).to(AuthController);

//controller interface binding
const productController = container.get<IProductController>(
  TYPES.ProductController
);
const userController = container.get<IUserController>(TYPES.UserController);
const authController = container.get<IAuthController>(TYPES.AuthController);
export { productController, userController, authController };
