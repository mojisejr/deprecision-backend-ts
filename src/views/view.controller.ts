import { Request, Response, NextFunction } from "express";
import { ProductRepository } from "./../domain/products/repository/product.repository";
import { catchAsyncError } from "./../core/catchAsyncError";
const productRepo = new ProductRepository();
const getLoginPage = catchAsyncError(async (req: Request, res: Response) => {
  res.status(200).render("base", {
    tour: "the forest hiker",
    user: "nonthasak",
  });
});

const getHomePage = catchAsyncError(async (req: Request, res: Response) => {
  const products = await productRepo.getAll("");
  res.status(200).render("home", {
    products,
  });
});

const getProductPage = (req: Request, res: Response) => {
  res.status(200).render("home", {
    user: "nonthasak",
    product: {
      name: "Product test",
      type: "Tolley",
    },
  });
};

const getInfoPage = catchAsyncError(async (req: Request, res: Response) => {
  res.status(200).render("info");
});

export { getLoginPage, getHomePage, getProductPage, getInfoPage };
