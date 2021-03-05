import axios from "axios";
import { API_URL, API_URL_PRODUCTION } from "./config";
import { getLastPathFromUrl, ok } from "./helper";
import { isNullOrUndefined } from "./pattern-validator";

const state = {
  currentPage: 1,
  productId: getLastPathFromUrl(window.location.pathname),
};

const loadProduct = async function (productId) {
  const product = await axios.get(`${API_URL_PRODUCTION}${productId}`);
  // console.log("product", product);
  state.product = product;
};

const saveProduct = async function (productData) {
  if (isNullOrUndefined(productData)) {
    throw new Error("product data cannot be null or undefined");
  }
  const response = await axios.post(`${API_URL_PRODUCTION}`, productData);
  return ok(response.status) ? true : false;
  // console.log("response", response);
};

const deleteProduct = async function (productId) {
  if (isNullOrUndefined(productId)) {
    throw new Error("product Id cannot be null or undefined");
  }
  const response = await axios.delete(`${API_URL_PRODUCTION}${productId}`);
  return ok(response.status) ? true : false;
};

const markAsRecommended = async function (productId, recommendData) {
  if (isNullOrUndefined(productId)) {
    throw new Error("productId  cannot be null or undefined");
  }
  const toggledData = recommendData === "false" ? true : false;
  const response = await axios.patch(`${API_URL_PRODUCTION}${productId}`, {
    recommend: toggledData,
  });
  return ok(response.status) ? true : false;
};
export { state, loadProduct, saveProduct, markAsRecommended, deleteProduct };
