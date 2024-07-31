import express from "express";

import {links, LABELS, REDIRECTION, products, cart} from "../database/database.mjs";

export const pageRouter = express.Router();

const getDataForPage = (page, route, title, req) => {
  const navigation = links.filter((link) => link.role.includes("user"));
  const pageObject = {
    redirection: route,
    title,
    navigation,
  };
  switch (page) {
    case REDIRECTION.PRODUCTS:
      return { ...pageObject, data: products };
    case REDIRECTION.SEARCH:
      const searchField = req.query.key;
      const productData = products.filter((product) => {
        const {description, title} = product;
        return (
          description.toLowerCase().includes(searchField.toLowerCase()) ||
          title.toLowerCase().includes(searchField.toLowerCase())
        );
      });
      return  {...pageObject, data: productData};
    case REDIRECTION.CART:
      const cartData = products.filter(product => {
        if (cart.find(cartItem => product.code.toString() === cartItem.code)) {
          return product;
        }
      });
      return { ...pageObject, data: cartData };
    case REDIRECTION.PDP:
      const productCode = req.params.id;
      const product = productCode && products.filter(item => item.code === Number(productCode));
      return {...pageObject, data: product}
    default:
      return pageObject;
  }
};

for (const page in REDIRECTION) {
  if (Object.hasOwnProperty.call(REDIRECTION, page)) {
    const route = REDIRECTION[page];
    pageRouter.get(route, (req, res) => {
      const { key, value: title } = LABELS[page];
      const pageObject = {
        ...getDataForPage(route, route, title, req),
      };
      res.status(200).render(key, pageObject);
    });
  }
}
