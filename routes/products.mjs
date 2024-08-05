import express from "express";

import { products } from "../database/database.mjs";
// import { pool } from "../database/database-sql.mjs";
import { Product } from "../models/product.mjs";
import { ProductSql } from "../models/product-sql.mjs";

export const productsRouter = express.Router();

productsRouter.get("/sql/:code", (req, res) => {
  const { code } = req.params;
  ProductSql.findByCode(code).then(products => {
    res.status(200).json({ data: { products } });
  });
  // const products = await pool.query("SELECT * FROM product");
  // res.status(200).json({ data: { products: products[0] } });
});

productsRouter.get("/", (req, res) => {
  Product.fetchAll().then(products => {
    res.status(200).json({ data: { products } });
  });
  // const products = await pool.query("SELECT * FROM product");
  // res.status(200).json({ data: { products: products[0] } });
});

productsRouter.get("/:code", (req, res) => {
  const { code } = req.params;
  Product.findByCode(code).then(product => {
    res.status(200).json({ data: { product } });
  });
  // const products = await pool.query("SELECT * FROM product");
  // res.status(200).json({ data: { products: products[0] } });
});

productsRouter.post("/", async (req, res) => {
  const { code, title, price, description, category, image, promotion, stock, rating } =
    req.body;
  const product = new Product(
    code,
    title,
    price,
    description,
    category,
    image,
    promotion,
    stock,
    rating,
  );
  // use try catch block to handle error
  const data = await product.save();
  // const response = await pool.execute(
  //   "INSERT INTO product (code, title, price, category, image, promotion, stock, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  //   [code, title, price, category, image, promotion, stock, rating]
  // );
//   res.status(201).json({ data: { data: response[0] } });
// });

// productsRouter.patch("/", (req, res) => {
//   const { code, title, price, description, category, image, promotion, stock } =
//     req.body;
//   let product = products.find((item) => item.code === code);
//   product = {
//     ...product,
//     title,
//     price,
//     description,
//     category,
//     image,
//     promotion,
//     stock,
//     rating: {},
//   };
  
  res.status(201).json({ data: { data } });
});

productsRouter.delete("/", (req, res) => {
  const { code } = req.body;
  products = products.filter((item) => item.code === code);
  res.status(201).json({ data: { data } });
});
