import { HOME_PAGE_LIMIT } from "./config";
import { login, logout } from "./login";
import * as model from "./model";
import * as mapper from "./mapper";

// const logo = document.querySelector(".logo");
const loginForm = document.querySelector(".login-form");
const signOut = document.querySelector(".signOut");
const productCards = document.querySelectorAll(".product-card");
const nextPage = document.querySelector(".next-page");
const prevPage = document.querySelector(".prev-page");
const newProductForm = document.querySelector(".new-product-form");
const btnDelete = document.querySelector(".btn-delete");
const btnMarkAsRecommend = document.querySelector(".btn-mark");
const btnSearch = document.querySelector(".btn-search");

if (nextPage) {
  nextPage.addEventListener("click", (e) => {
    e.preventDefault();
    let param = new URL(window.location).searchParams;
    model.state.currentPage = param.get("page");
    if (model.state.currentPage >= 1) {
      model.state.currentPage++;
      window.location.assign(
        `/home?page=${model.state.currentPage}&limit=${HOME_PAGE_LIMIT}`
      );
    }
  });
}

if (prevPage) {
  prevPage.addEventListener("click", (e) => {
    e.preventDefault();
    let param = new URL(window.location).searchParams;
    model.state.currentPage = param.get("page");
    if (model.state.currentPage > 1) {
      model.state.currentPage--;
      window.location.assign(
        `/home?page=${model.state.currentPage}&limit=${HOME_PAGE_LIMIT}`
      );
    }
  });
}

if (btnDelete) {
  btnDelete.addEventListener("click", async (e) => {
    e.preventDefault();
    const isDeleted = await model.deleteProduct(model.state.productId);
    if (isDeleted) {
      window.location.assign(
        `/home?page=${model.state.currentPage}&limit=${HOME_PAGE_LIMIT}`
      );
    }
  });
}

if (btnMarkAsRecommend) {
  btnMarkAsRecommend.addEventListener("click", async (e) => {
    e.preventDefault();
    const recomendation = document.getElementById("recommend").textContent;
    const isUpdated = await model.markAsRecommended(
      model.state.productId,
      recomendation
    );
    if (isUpdated) {
      location.reload();
    }
  });
}

if (btnSearch) {
  btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput").value;
    const splittedInput = searchInput.split("=");
    const fieldName = splittedInput[0];
    const queryString = splittedInput[1];
    window.location.assign(
      `/home?page=${model.state.currentPage}&limit=${HOME_PAGE_LIMIT}&${fieldName}=${queryString}`
    );
  });
}

// logo.addEventListener("click", (e) => {
//   e.preventDefault();
//   window.location.href = "/";
// });

if (productCards) {
  productCards.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      // console.log(e.target.parentElement.id);
      // const id = e.target.parentElement.id;
      model.state.productId = e.target.parentElement.id;
      if (!model.state.productId) {
        return;
      }
      window.location.assign(`products/${model.state.productId}`);
    })
  );
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // console.log(`email: ${email}, password: ${password}`);
    login(email, password);
  });
}

if (newProductForm) {
  newProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formValues = {
      brand: document.getElementById("brand").value,
      type: document.getElementById("type").value,
      category: document.getElementById("category").value,
      size: document.getElementById("size").value,
      configurations: document.getElementById("configurations").value,
      details: document.getElementById("details").value,
      modelNo: document.getElementById("modelNo").value,
      imageUrl: document.getElementById("imageUrl").value,
    };
    const productData = mapper.toProductData(formValues);
    model.saveProduct(productData);
  });
}
if (signOut) {
  signOut.addEventListener("click", async (e) => {
    logout();
    window.location.assign("/");
  });
}
