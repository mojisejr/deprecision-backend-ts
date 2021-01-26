import { Repository } from "../../../core/interfaces/base.repository";
import { ProductDTO } from "../dto/product.dto";
import { IProduct } from "../model/product.interface";
import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../../../core/catchAsyncError";
import { inject, injectable, named } from "inversify";
import TYPES from "../../../core/container/types";
import { APPError } from "../../../error/app.error";
import TAGS from "../../../core/container/tags";
import { IProductController } from "./product.controller.interface";

@injectable()
export class ProductController implements IProductController {
  private productRepository: Repository<IProduct, ProductDTO>;
  constructor(
    @inject(TYPES.Repository)
    @named(TAGS.ProductRepository)
    repository: Repository<IProduct, ProductDTO>
  ) {
    this.productRepository = repository;
  }

  create = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const preparedProduct: ProductDTO = {
        model_no: req.body.model_no,
        name: req.body.name,
        brand: req.body.brand,
        type: req.body.type,
        category: req.body.category,
        configurations: req.body.configurations,
        size: req.body.size,
        details: req.body.detials,
      };
      const product = await this.productRepository.create(preparedProduct);
      if (!product) {
        next(APPError.create("cannot create product, try again.", 404));
      }
      res.status(201).json({
        status: "success",
        data: {
          product,
        },
      });
    }
  );

  getAll = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const productCollection = await this.productRepository.getAll(req.query);
      res.status(200).json({
        status: "success",
        results: productCollection.length,
        data: {
          products: productCollection,
        },
      });
    }
  );
  getById = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const product = await this.productRepository.getById(id);
      if (!product) {
        return next(APPError.create(`no product found with id ${id}`, 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          product,
        },
      });
    }
  );
  update = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const updatedProduct = await this.productRepository.update(id, req.body);
      if (!updatedProduct) {
        return next(
          APPError.create(`no product found for update with id ${id}`, 404)
        );
      }
      res.status(204).json({
        status: "success",
        message: `product with ${id} updated successfully`,
      });
    }
  );
  delete = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      const deleted = await this.productRepository.delete(id);
      if (!deleted) {
        return next(
          APPError.create(`no product found for update with id ${id}`, 404)
        );
      }

      res.status(204).json({
        status: "success",
        message: `product with id ${id} has been deleted`,
      });
    }
  );
}
