import { Request, Response, NextFunction } from "express";
import { ProductRepository } from "./../domain/products/repository/product.repository";
import { catchAsyncError } from "./../core/catchAsyncError";

const productRepo = new ProductRepository();
const getLoginPage = catchAsyncError(async (req: Request, res: Response) => {
  res.status(200).render("base");
});

const getHomePage = catchAsyncError(async (req: Request, res: Response) => {
  const query = req.query;
  const products = await productRepo.getAll(query);
  res.status(200).render("home", {
    page: "home",
    products,
    currentPage: query.page,
  });
});

const getProductPage = catchAsyncError(async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await productRepo.getById(id);
  console.log("userid", id);
  res.status(200).render("product", {
    page: "product",
    product,
  });
});

const getNewProductPage = catchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).render("newProduct", {
      page: "newProduct",
    });
  }
);

const getInfoPage = catchAsyncError(async (req: Request, res: Response) => {
  res.status(200).render("info", {
    page: "info",
  });
});

export {
  getLoginPage,
  getHomePage,
  getProductPage,
  getNewProductPage,
  getInfoPage,
};
