import express from "express";

import { products } from "../database/database.mjs";

export const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
  res.status(200).json({ data: { products } });
});

productsRouter.post("/", (req, res) => {
  const { code, title, price, description, category, image, promotion, stock } =
    req.body;
  const data = {
    code,
    title,
    price,
    description,
    category,
    image,
    promotion,
    stock,
    rating: {},
  };
  products.push(data);
  res.status(201).json({ data: { data } });
});

productsRouter.patch("/", (req, res) => {
  const { code, title, price, description, category, image, promotion, stock } =
    req.body;
  let product = products.find((item) => item.code === code);
  product = {
    ...product,
    title,
    price,
    description,
    category,
    image,
    promotion,
    stock,
    rating: {},
  };
  products.push(data);
  res.status(201).json({ data: { data } });
});

productsRouter.delete("/", (req, res) => {
  const { code } = req.body;
  products = products.filter((item) => item.code === code);
  res.status(201).json({ data: { data } });
});
