import express from "express";


import { addProduct, getProductDetails, getProducts, modifyProduct, removeProduct } from "../controller/products.mjs";

export const productsRouter = express.Router();

productsRouter.get("/", getProducts);

productsRouter.get('/:code', getProductDetails);

productsRouter.post("/", addProduct);

productsRouter.patch("/", modifyProduct);

productsRouter.delete("/", removeProduct);
