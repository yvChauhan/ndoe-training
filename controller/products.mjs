import { products } from "../database/database.mjs";

export const getProducts = (req, res) => {
  res.status(200).json({ data: { products } });
};

export const addProduct = (req, res) => {
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
};

export const modifyProduct = (req, res) => {
  const { code, title, price, description, category, image, promotion, stock } =
    req.body;
  const productIndex = products.findIndex((item) => item.code === code);
  const product = products[productIndex];
  if (!product) {
    res.status(304).json({ data: { product, message: "No product has been found."} });
    return;
  }
  const modifiedProduct = {
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
  products.splice(productIndex, 1, modifiedProduct);
  res.status(201).json({ data: { product, message: "Product has been updated with modified data." } });
};

export const removeProduct = (req, res) => {
  const { code } = req.body;
  products = products.filter((item) => item.code === code);
  res.status(200).json({ data: { products, message: "Product is removed" } });
};

export const getProductDetails = (req, res) => {
    const productCode = req.params.code;
    const product = products.filter((item) => item.code.toString() === productCode);
    if(product.length) {
      res.status(302).json({data: product})
    } else {
      res.status(404).json({data: {}, message: `No product is available with the provided Id : ${productCode}`});
    }
    
}
