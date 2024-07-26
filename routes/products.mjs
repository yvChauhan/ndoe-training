import express from "express";

import { products } from "../database/database.mjs";

export const productsRouter = express.Router();

app.get("/", (req, res) => {
  res.json(200).json({ data: { products } });
});

app.post("/", (req, res) => {
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
  res.json(201).json({ data: { data } });
});

app.patch("/", (req, res) => {
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
  res.json(201).json({ data: { data } });
});

app.delete("/", (req, res) => {
  const { code } = req.body;
  products = products.filter((item) => item.code === code);
  res.json(201).json({ data: { data } });
});
