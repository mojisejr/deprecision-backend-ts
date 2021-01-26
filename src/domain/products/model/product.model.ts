import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product.interface";

export interface Product extends Document, IProduct {}

const productSchema: Schema = new Schema({
  name: {
    type: String,
  },
  brand: {
    type: String,
    default: "No Brand",
  },
  type: {
    type: String,
    required: [true, "product must have their type."],
  },
  category: {
    type: String,
    required: [true, "need to specify product category."],
  },
  model_no: {
    type: String,
    required: [true, "product must have their model number / serial number."],
    unique: true,
  },
  size: [Number],
  details: String,
  configurations: [String],
  price: Number,
  image_url: String,
  recommend: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const productModel = mongoose.model<Product>("Products", productSchema);
