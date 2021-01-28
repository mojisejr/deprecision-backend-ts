import { IProduct } from "./../model/product.interface";
import { ProductDTO } from "./../dto/product.dto";
import { BaseController } from "../../../core/base.controller.class";
import { inject, injectable, named } from "inversify";
import TYPES from "../../../core/container/types";
import { Repository } from "../../../core/interfaces/base.repository";
import TAGS from "../../../core/container/tags";
import { IProductController } from "./product.controller.interface";

@injectable()
export class ProductController
  extends BaseController<IProduct, ProductDTO>
  implements IProductController {
  constructor(
    @inject(TYPES.Repository)
    @named(TAGS.ProductRepository)
    productRepository: Repository<IProduct, ProductDTO>
  ) {
    super(productRepository);
  }
}
