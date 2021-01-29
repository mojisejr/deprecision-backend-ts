import { injectable } from "inversify";
import { APIFeature } from "../../../core/interfaces/base.api.feature";
import { Repository } from "../../../core/interfaces/base.repository";
import { MongooseAPIFeature } from "../../../utils/mongoose.api.feature";
import { ProductDTO } from "../dto/product.dto";
import { IProduct } from "../model/product.interface";
import { productModel } from "../model/product.model";

@injectable()
export class ProductRepository implements Repository<IProduct, ProductDTO> {
  async create(dto: ProductDTO): Promise<IProduct> {
    const newProduct = await productModel.create(dto);
    return newProduct;
  }

  save() {
    throw new Error("no implementation");
  }

  async getAll(queryString?: any): Promise<IProduct[]> {
    const api: APIFeature = new MongooseAPIFeature(productModel, queryString)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products: IProduct[] = await api.query;
    return products;
  }

  async getById(id: string): Promise<IProduct> {
    return await productModel.findById(id);
  }

  async update(
    id: string,
    data: Partial<IProduct> | IProduct
  ): Promise<IProduct> {
    return await productModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<void> {
    return await productModel.findByIdAndDelete(id);
  }
}
